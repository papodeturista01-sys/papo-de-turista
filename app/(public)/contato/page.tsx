import { prisma } from "@/lib/prisma";
import { MapPin, Phone, Mail, Clock } from "lucide-react"; // Importamos ícones para usar no decorativo se precisar

export const dynamic = 'force-dynamic';

export default async function ContatoPage() {
  try {
    const page = await prisma.staticPage.findUnique({
      where: { slug: "contato" },
    });

    const title = page?.title || "Fale Conosco";
    const content = page?.content || "<p>Entre em contato conosco...</p>";

    return (
      <main className="min-h-screen bg-slate-50 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          
          {/* CARTÃO PRINCIPAL COM SOMBRA */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            
            {/* CABEÇALHO COLORIDO (Fica automático) */}
            <div className="bg-blue-600 p-10 text-center relative overflow-hidden">
              {/* Círculos decorativos de fundo */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full translate-x-10 translate-y-10"></div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white relative z-10">
                {title}
              </h1>
              <p className="text-blue-100 mt-2 relative z-10 font-medium">
                Estamos prontos para te atender
              </p>
            </div>

            {/* ÁREA DE CONTEÚDO */}
            <div className="p-8 md:p-12">
              {/* 
                  PROSE: Essa classe faz a mágica.
                  Ela formata os H2, H3, Links e Listas automaticamente para ficarem bonitos.
              */}
              <div 
                className="prose prose-lg prose-slate max-w-none 
                  prose-headings:text-blue-700 prose-headings:font-bold 
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-800 prose-li:marker:text-blue-500"
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            </div>

            {/* RODAPÉ DO CARTÃO (Decorativo) */}
            <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
              <p className="text-sm text-slate-400">
                Respondemos geralmente em até 24 horas úteis.
              </p>
            </div>
          </div>

        </div>
      </main>
    );

  } catch (error) {
    return (
       <div className="p-10 text-center text-red-500">Erro ao carregar contato. Tente novamente.</div>
    )
  }
}