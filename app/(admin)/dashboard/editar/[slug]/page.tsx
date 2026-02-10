import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Save, X, Trash2 } from "lucide-react";
// Garante que a importação volte 4 pastas para achar o componente
import { ImageUpload } from "../../../../components/ImageUpload";

export const dynamic = 'force-dynamic';

// ATENÇÃO: Recebemos "slug" porque é o nome da pasta, mas tratamos como ID
export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params; 
  const postId = slug; 

  // Busca o post pelo ID
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  // Busca categorias
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-slate-500">
        <h1 className="text-xl font-bold">Post não encontrado 😕</h1>
        <p className="mb-4">O sistema buscou pelo ID: <span className="font-mono bg-slate-100 p-1">{postId}</span></p>
        <a href="/dashboard" className="text-blue-600 hover:underline border px-4 py-2 rounded">Voltar ao Painel</a>
      </div>
    );
  }

  // --- AÇÃO DE SALVAR ---
  async function updatePost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const coverImage = formData.get("coverImage") as string;
    const excerpt = formData.get("excerpt") as string;

    // Gera slug novo se mudar o título
    const newSlug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        slug: newSlug,
        content,
        coverImage,
        excerpt,
        categoryId,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/");
    redirect("/dashboard");
  }

  // --- AÇÃO DE EXCLUIR ---
  async function deletePost() {
    "use server";
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Editar História ✏️</h1>
        <form action={deletePost}>
           <button className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition">
             <Trash2 size={18} /> Excluir
           </button>
        </form>
      </div>

      <form action={updatePost} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Título</label>
          <input name="title" defaultValue={post.title} type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
            <select name="categoryId" defaultValue={post.categoryId || ""} className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white" required>
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Capa</label>
            <ImageUpload name="coverImage" defaultValue={post.coverImage || ""} />
          </div>
        </div>

        {/* Resumo */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Resumo</label>
          <textarea name="excerpt" defaultValue={post.excerpt || ""} rows={2} className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500"></textarea>
        </div>

        {/* Conteúdo */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Conteúdo</label>
          <textarea name="content" defaultValue={post.content} required rows={12} className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500 resize-y"></textarea>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
          <a href="/dashboard" className="px-6 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2"><X size={20} /> Cancelar</a>
          <button type="submit" className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg transition flex items-center gap-2"><Save size={20} /> Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
}