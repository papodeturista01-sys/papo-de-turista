import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Star, PenSquare } from "lucide-react";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  
  // AÇÃO DO SERVIDOR: Troca o status de Destaque
  async function toggleFeatured(formData: FormData) {
    "use server";
    const postId = formData.get("postId") as string;
    const isFeatured = formData.get("isFeatured") === "true";

    // 1. Tira o destaque de todos os outros (opcional, para ter só 1 banner)
    if (!isFeatured) {
       await prisma.post.updateMany({ data: { featured: false } });
    }

    // 2. Define o novo destaque
    await prisma.post.update({
      where: { id: postId },
      data: { featured: !isFeatured }
    });

    revalidatePath("/dashboard");
    revalidatePath("/"); // Atualiza a Home também
  }

  // Busca os posts ordenados
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
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

      {/* Tabela de Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Destaque</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Título</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Categoria</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50 transition">
                
                {/* BOTÃO DE ESTRELA (DESTAQUE) */}
                <td className="p-4 text-center w-20">
                  <form action={toggleFeatured}>
                    <input type="hidden" name="postId" value={post.id} />
                    <input type="hidden" name="isFeatured" value={String(post.featured)} />
                    <button 
                      className={`p-2 rounded-full transition ${post.featured ? 'text-yellow-400 hover:text-yellow-600' : 'text-slate-300 hover:text-yellow-400'}`}
                      title={post.featured ? "Remover do Banner" : "Colocar no Banner"}
                    >
                      <Star size={20} fill={post.featured ? "currentColor" : "none"} />
                    </button>
                  </form>
                </td>

                <td className="p-4 font-medium text-slate-700">{post.title}</td>
                
                <td className="p-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-bold uppercase">
                    {post.category?.name || "Sem Categoria"}
                  </span>
                </td>

                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:underline text-sm font-medium flex items-center justify-end gap-1">
                    <PenSquare size={16} /> Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}