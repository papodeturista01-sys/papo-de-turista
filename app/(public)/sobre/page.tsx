import { prisma } from "@/lib/prisma";

// Atualiza o cache a cada 60 segundos (para não pesar o banco)
export const revalidate = 60;

export default async function SobrePage() {
  // 1. Busca o conteúdo no banco pelo slug 'sobre'
  const page = await prisma.staticPage.findUnique({
    where: { slug: "sobre" },
  });

  // 2. Se não achar nada no banco, mostra aviso
  if (!page) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Página em construção</h1>
        <p className="text-slate-500">O conteúdo "Sobre" ainda não foi criado no painel.</p>
      </main>
    );
  }

  // 3. Mostra o conteúdo oficial
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-slate-100">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">
          {page.title}
        </h1>
        
        {/* whitespace-pre-wrap: Mantém os parágrafos e quebras de linha que você der no painel */}
        <div className="prose prose-lg text-slate-600 max-w-none whitespace-pre-wrap font-sans">
          {page.content}
        </div>
      </div>
    </main>
  );
}