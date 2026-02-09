import { prisma } from "@/lib/prisma";
import { Mail, MapPin, Phone } from "lucide-react";

export const revalidate = 60;

export default async function ContatoPage() {
  const page = await prisma.staticPage.findUnique({
    where: { slug: "contato" },
  });

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Lado Esquerdo: Texto vindo do Banco (Editável) */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            {page?.title || "Fale Conosco"}
          </h1>
          <div className="prose text-slate-600 whitespace-pre-wrap mb-8 font-sans">
            {page?.content || "Entre em contato conosco..."}
          </div>
        </div>

        {/* Lado Direito: Informações Fixas (Bonito visualmente) */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 h-fit">
          <h3 className="text-xl font-bold mb-6 text-slate-800">Canais de Atendimento</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-600">
              <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-full text-blue-600">
                <Mail size={20} />
              </div>
              <span>contato@papodeturista.com.br</span>
            </div>
            
            <div className="flex items-center gap-4 text-slate-600">
              <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-full text-green-600">
                <Phone size={20} />
              </div>
              <span>(11) 99999-9999</span>
            </div>

            <div className="flex items-center gap-4 text-slate-600">
              <div className="w-10 h-10 bg-purple-100 flex items-center justify-center rounded-full text-purple-600">
                <MapPin size={20} />
              </div>
              <span>São Paulo, Brasil</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}