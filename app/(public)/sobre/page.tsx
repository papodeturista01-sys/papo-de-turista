import { prisma } from "@/lib/prisma";
import Image from "next/image";

// Atualiza o cache a cada 60 segundos (ou use 'force-dynamic' para ser instantâneo)
export const revalidate = 60;

export default async function SobrePage() {
  // Busca o conteúdo no banco pelo slug 'sobre'
  const page = await prisma.staticPage.findUnique({
    where: { slug: "sobre" },
  });

  if (!page) {
    return <div className="p-20 text-center">Página "Sobre" ainda não criada no painel.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-slate-100">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">
          {page.title}
        </h1>
        
        {/* Aqui renderizamos o texto. 
            A propriedade whitespace-pre-wrap mantém os parágrafos que você der Enter no painel. */}
        <div className="prose prose-lg text-slate-600 max-w-none whitespace-pre-wrap">
          {page.content}
        </div>
      </div>
    </main>
  );
}