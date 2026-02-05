import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function FeaturedPosts() {
  // 1. BUSCAR DADOS REAIS DO BANCO
  const posts = await prisma.post.findMany({
    take: 3, // Pega apenas os 3 últimos
    where: { published: true }, // Só mostra se estiver "Publicado"
    orderBy: { createdAt: "desc" }, // Do mais novo para o mais velho
    include: { category: true }, // Traz o nome da categoria junto
  });

  // Se não tiver nenhum post, esconde a seção para não ficar feio
  if (posts.length === 0) {
    return null; 
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Destaques Recentes
            </h2>
            <p className="text-slate-500 font-light">
              As últimas histórias publicadas no blog.
            </p>
          </div>
          <Link href="/cronicas" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition">
            Ver todos <ArrowRight size={18} />
          </Link>
        </div>

        {/* Grid de Posts REAIS */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`} className="group cursor-pointer flex flex-col h-full">
              <article className="flex flex-col h-full">
                {/* Imagem */}
                <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-5 bg-slate-100">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    // Se você não colocou foto, mostra um cinza padrão
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      Sem imagem
                    </div>
                  )}
                  
                  {/* Etiqueta de Categoria */}
                  {post.category && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wide">
                      {post.category.name}
                    </div>
                  )}
                </div>

                {/* Texto */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {/* Se tiver resumo, mostra. Se não, corta o conteúdo. */}
                  <div className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                     {post.content.substring(0, 120)}...
                  </div>

                  <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Ler história <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}