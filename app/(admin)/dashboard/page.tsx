import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, FileText } from "lucide-react";

export default async function Dashboard() {
  // Busca todos os posts do banco de dados (ordenados pelos mais novos)
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true }, // Traz o nome da categoria junto
  });

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Visão Geral</h1>
          <p className="text-slate-500">Bem-vindo de volta ao seu diário de bordo.</p>
        </div>
        <Link 
          href="/dashboard/novo" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Nova Publicação
        </Link>
      </header>

      {/* Cartões de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium uppercase">Total de Posts</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">{posts.length}</p>
        </div>
        {/* Aqui podemos adicionar mais métricas no futuro */}
      </div>

      {/* Lista de Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Últimas Publicações</h2>
        </div>

        {posts.length === 0 ? (
          // Estado Vazio (quando não tem post)
          <div className="p-12 text-center flex flex-col items-center text-slate-400">
            <FileText size={48} className="mb-4 opacity-20" />
            <p>Nenhuma crônica escrita ainda.</p>
            <p className="text-sm">Que tal começar a contar uma história hoje?</p>
          </div>
        ) : (
          // Tabela de Posts
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                      {post.category?.name || "Geral"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {post.published ? (
                      <span className="text-green-600 font-bold text-xs flex items-center gap-1">● Publicado</span>
                    ) : (
                      <span className="text-amber-500 font-bold text-xs flex items-center gap-1">● Rascunho</span>
                    )}
                  </td>
        
                  <td className="px-6 py-4">
                    {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/* AQUI ESTÁ A MUDANÇA: Link para a pasta 'editar' */}
                    <Link 
                      href={`/dashboard/editar/${post.slug}`} 
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}