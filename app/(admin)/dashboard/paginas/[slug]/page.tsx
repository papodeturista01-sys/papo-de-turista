import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Save } from "lucide-react";
import { ImageUpload } from "@/app/components/ImageUpload"; // <--- Importamos o novo componente

// Server Action para salvar as alterações
async function updatePage(formData: FormData) {
  "use server";
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string; // Recebe a URL da imagem (nova ou antiga)

  await prisma.page.update({
    where: { slug: slug },
    data: { title, content, image },
  });

  redirect("/dashboard/paginas");
}

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Busca os dados atuais da página
  const page = await prisma.page.findUnique({
    where: { slug: slug },
  });

  if (!page) return <div>Página não encontrada</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 capitalize">Editar Página: {page.slug}</h1>

      <form action={updatePage} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
        {/* Campo Oculto para enviar o SLUG sem mostrar na tela */}
        <input type="hidden" name="slug" value={page.slug} />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Título Principal</label>
          <input 
            name="title" 
            defaultValue={page.title}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Upload de Imagem (Novo Componente) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Foto de Destaque</label>
          {/* Aqui passamos a imagem atual (defaultValue) para mostrar o preview se já tiver foto */}
          <ImageUpload name="image" defaultValue={page.image || ""} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Conteúdo do Texto</label>
          <textarea 
            name="content" 
            rows={15}
            defaultValue={page.content}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        <div className="flex justify-end pt-4">
          <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg flex items-center gap-2">
            <Save size={20} /> Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}