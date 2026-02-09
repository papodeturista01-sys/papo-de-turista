import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Trash2, Plus, Tag } from "lucide-react";
import { redirect } from "next/navigation";

// 1. OBRIGA A ATUALIZAÇÃO (Mata o cache)
export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  
  // Ação para CRIAR Categoria
  async function createCategory(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    
    if (!name) return;

    // Gera o slug simples (ex: "Viagens Incríveis" -> "viagens-incriveis")
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    await prisma.category.create({
      data: { name, slug },
    });

    revalidatePath("/dashboard/categorias"); // Atualiza a tela
    revalidatePath("/dashboard/novo");       // Atualiza o select do post
  }

  // Ação para DELETAR Categoria
  async function deleteCategory(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    
    if (id) {
      // Deleta a categoria pelo ID
      await prisma.category.delete({
        where: { id },
      });
      revalidatePath("/dashboard/categorias");
    }
  }

  // 2. BUSCA AS CATEGORIAS COM CONTAGEM DE POSTS
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { posts: true } // Conta quantos posts tem ligada a ela
      }
    }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Gerenciar Categorias</h1>
        <p className="text-slate-500">Organize os assuntos do seu blog.</p>
      </div>

      {/* Formulário de Nova Categoria */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
        <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <Plus size={16} className="text-blue-600" /> Nova Categoria
        </h2>
        
        <form action={createCategory} className="flex gap-4">
          <input 
            name="name"
            type="text" 
            required
            placeholder="Ex: Europa, Gastronomia, Dicas..."
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Salvar
          </button>
        </form>
      </div>

      {/* Tabela de Categorias */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Nome</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Slug (Link)</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Posts</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-700 flex items-center gap-2">
                  <Tag size={14} className="text-slate-400" />
                  {cat.name}
                </td>
                <td className="p-4 text-slate-500 text-sm font-mono">/{cat.slug}</td>
                
                {/* 3. EXIBE A CONTAGEM AQUI */}
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${cat._count.posts > 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
                    {cat._count.posts}
                  </span>
                </td>
                
                <td className="p-4 text-right">
                  <form action={deleteCategory}>
                    <input type="hidden" name="id" value={cat.id} />
                    <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Excluir">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-400">
                  Nenhuma categoria cadastrada ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}