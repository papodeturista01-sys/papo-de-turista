import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Save, X } from "lucide-react";
import { ImageUpload } from "../../../components/ImageUpload"; 

// 1. ADICIONE ESTA LINHA AQUI!!! 👇
export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  // Agora ele busca a lista fresquinha toda vez que a página carrega
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }, // Dica extra: Ordena alfabeticamente para ficar organizado
  });

  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const coverImage = formData.get("coverImage") as string;
    
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        coverImage,
        categoryId,
        published: true,
      },
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Escrever nova história</h1>

      <form action={createPost} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
        
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Título da Publicação</label>
          <input 
            name="title" 
            type="text" 
            required
            placeholder="Ex: O dia em que me perdi em Tóquio"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
            <select name="categoryId" className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white" required>
              <option value="">Selecione uma opção...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {categories.length === 0 && (
                <p className="text-xs text-red-500 mt-1">Nenhuma categoria encontrada. Crie uma antes.</p>
            )}
          </div>

          {/* Upload de Imagem */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Capa do Post</label>
            <ImageUpload name="coverImage" />
          </div>
        </div>

        {/* Conteúdo */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Conteúdo</label>
          <textarea 
            name="content" 
            required
            rows={12}
            placeholder="Comece a escrever aqui..."
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
          ></textarea>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
          <a href="/dashboard" className="px-6 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2">
            <X size={20} /> Cancelar
          </a>
          <button type="submit" className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition flex items-center gap-2">
            <Save size={20} /> Publicar Agora
          </button>
        </div>

      </form>
    </div>
  );
}