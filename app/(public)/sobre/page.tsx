import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  // Busca o conteúdo no banco
  const page = await prisma.page.findUnique({
    where: { slug: "sobre" },
  });

  if (!page) return notFound();

  return (
    <section className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Foto dinâmica */}
          {page.image && (
            <div className="w-full md:w-1/2 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={page.image}
                alt={page.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Texto dinâmico */}
          <div className="w-full md:w-1/2">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">
              Quem escreve
            </span>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              {page.title}
            </h1>
            
            {/* Renderiza o texto respeitando as quebras de linha */}
            <div className="prose prose-slate text-slate-600 leading-relaxed whitespace-pre-wrap">
              {page.content}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="font-handwriting text-2xl text-slate-800">
                Boas viagens!
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}