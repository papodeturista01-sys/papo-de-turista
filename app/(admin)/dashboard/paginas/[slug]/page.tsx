import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Save } from "lucide-react";

// Server Action para salvar as alterações
async function updatePage(formData: FormData) {
  "use server";
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // CORREÇÃO: Usando staticPage e removendo image que não existe no banco
  await prisma.staticPage.update({
    where: { slug: slug },
    data: { title, content },
  });

  redirect("/dashboard/paginas");
}

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // CORREÇÃO: Buscando na tabela certa
  const page = await prisma.staticPage.findUnique({
    where: { slug: slug },
  });

  if (!page) return <div className="p-8 text-red-500">Página não encontrada no banco de dados.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 capitalize">Editar: {page.title}</h1>

      <form action={updatePage} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
        {/* Campo Oculto para enviar o SLUG */}
        <input type="hidden" name="slug" value={page.slug} />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Título da Página</label>
          <input 
            name="title" 
            defaultValue={page.title}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Conteúdo do Texto</label>
          <textarea 
            name="content" 
            rows={15}
            defaultValue={page.content}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-sans"
          ></textarea>
          <p className="text-xs text-slate-400 mt-2">Dica: Você pode usar HTML simples aqui se quiser.</p>
        </div>

        <div className="flex justify-end pt-4">
          <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg flex items-center gap-2 transition-colors">
            <Save size={20} /> Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}