import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/app/components/ImageUpload";

interface EditPostProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: EditPostProps) {
  const { slug } = await params;

  // 1. Busca o Post e as Categorias para preencher o formulário
  const post = await prisma.post.findUnique({ where: { slug } });
  const categories = await prisma.category.findMany();

  if (!post) {
    return <div>Post não encontrado!</div>;
  }

  // === AÇÃO DE ATUALIZAR (UPDATE) ===
  async function updatePost(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const coverImage = formData.get("coverImage") as string;
    const postId = formData.get("postId") as string;

    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        categoryId,
        coverImage,
      },
    });

    redirect("/dashboard");
  }

  // === AÇÃO DE EXCLUIR (DELETE) ===
  async function deletePost(formData: FormData) {
    "use server";
    const postId = formData.get("postId") as string;

    await prisma.post.delete({
      where: { id: postId },
    });

    redirect("/dashboard");
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard" className="p-2 rounded-full hover:bg-slate-200 transition">
          <ArrowLeft size={20} className="text-slate-600"/>
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">Editar Post</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-8">
        
        {/* Formulário de Edição */}
        <form action={updatePost} className="space-y-6">
          <input type="hidden" name="postId" value={post.id} />

          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Título</label>
            <input 
              name="title" 
              defaultValue={post.title}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
              <select 
                name="categoryId" 
                defaultValue={post.categoryId || ""}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Imagem (Com Preview da atual) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Capa</label>
              <ImageUpload name="coverImage" defaultValue={post.coverImage || ""} />
            </div>
          </div>

          {/* Conteúdo */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Conteúdo</label>
            <textarea 
              name="content" 
              rows={12}
              defaultValue={post.content}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg flex items-center gap-2">
              <Save size={20} /> Salvar Alterações
            </button>
          </div>
        </form>

        {/* Zona de Perigo (Excluir) */}
        <div className="mt-12 pt-8 border-t border-slate-100 bg-red-50 p-6 rounded-xl">
          <h3 className="text-red-800 font-bold mb-2">Zona de Perigo</h3>
          <p className="text-red-600 text-sm mb-4">
            Deseja apagar esta história? Essa ação não pode ser desfeita.
          </p>
          <form action={deletePost}>
            <input type="hidden" name="postId" value={post.id} />
            <button className="px-6 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-600 hover:text-white transition flex items-center gap-2">
              <Trash2 size={18} /> Excluir Post Definitivamente
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}