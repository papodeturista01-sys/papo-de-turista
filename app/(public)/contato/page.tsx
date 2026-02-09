import { prisma } from "@/lib/prisma";

// Atualiza a cada 60 segundos
export const revalidate = 60;

export default async function ContatoPage() {
  try {
    // Tenta buscar no banco
    const page = await prisma.staticPage.findUnique({
      where: { slug: "contato" },
    });

    // Se não achar a página no banco, usa valores padrão
    const title = page?.title || "Fale Conosco";
    const content = page?.content || "<p>Entre em contato conosco...</p>";

    return (
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-slate-100">
          
          <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">
            {title}
          </h1>

          {/* Renderiza o HTML (Seguro) */}
          <div 
            className="prose prose-lg text-slate-600 max-w-none font-sans"
            dangerouslySetInnerHTML={{ __html: content }} 
          />

        </div>
      </main>
    );

  } catch (error) {
    // SE DER ERRO (Banco fora do ar, etc), cai aqui e não quebra o site
    console.error("Erro ao carregar contato:", error);
    
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Ops! Tivemos um problema técnico.</h1>
        <p className="text-slate-600">
          Não conseguimos carregar as informações de contato no momento.<br/>
          Tente recarregar a página em alguns segundos.
        </p>
      </main>
    );
  }
}