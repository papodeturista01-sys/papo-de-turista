import { prisma } from "@/lib/prisma";
import { Plus, Trash2, Tag } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function CategoriesPage() {
  // Busca todas as categorias existentes
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } }
  });

  async function createCategory(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    
    if (!name) return;

    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    await prisma.category.create({
      data: { name, slug },
    });

    // ATENÇÃO: Atualizei o caminho aqui para refletir a nova pasta
    revalidatePath("/dashboard/categorias");
  }

  async function deleteCategory(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    
    try {
      await prisma.category.delete({ where: { id } });
      revalidatePath("/dashboard/categorias");
    } catch (error) {
      console.log("Erro ao excluir.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Gerenciar Categorias</h1>
      <p className="text-slate-500 mb-8">Organize os assuntos do seu blog.</p>

      {/* Formulário */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
          <Plus size={18} className="text-blue-600" /> Nova Categoria
        </h3>
        <form action={createCategory} className="flex gap-4">
          <input 
            name="name" 
            type="text" 
            placeholder="Ex: Europa, Gastronomia, Dicas..." 
            required
            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
            Salvar
          </button>
        </form>
      </div>

      {/* Lista */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4 text-center">Posts</th>
              <th className="px-6 py-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                  <Tag size={16} className="text-slate-400" />
                  {cat.name}
                </td>
                <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                  /{cat.slug}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-bold">
                    {cat._count.posts}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <form action={deleteCategory}>
                    <input type="hidden" name="id" value={cat.id} />
                    <button className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition" title="Excluir">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}