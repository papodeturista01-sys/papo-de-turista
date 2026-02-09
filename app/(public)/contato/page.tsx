import { prisma } from "@/lib/prisma";

// Atualiza a cada 60 segundos
export const revalidate = 60;

export default async function ContatoPage() {
  // Busca o conteúdo no banco
  const page = await prisma.staticPage.findUnique({
    where: { slug: "contato" },
  });

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-slate-100">
        
        {/* Título vindo do Banco */}
        <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">
          {page?.title || "Fale Conosco"}
        </h1>

        {/* 
           Conteúdo vindo do Banco.
           A classe 'whitespace-pre-wrap' é mágica: ela respeita os "Enters" 
           que você der lá no painel. Se pular linha lá, pula aqui.
        */}
        <div className="prose prose-lg text-slate-600 max-w-none whitespace-pre-wrap font-sans text-lg leading-relaxed">
          {page?.content || "Entre em contato conosco..."}
        </div>

      </div>
    </main>
  );
}