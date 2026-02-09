import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

export const dynamic = "force-dynamic"; // Garante que a home esteja sempre atualizada

export default async function Home() {
  
  // 1. Busca o Post de Destaque (o que tem a estrelinha)
  const featuredPost = await prisma.post.findFirst({
    where: { published: true, featured: true },
    include: { category: true },
    orderBy: { updatedAt: 'desc' }
  });

  // 2. Busca os outros posts (excluindo o destaque para não repetir)
  const recentPosts = await prisma.post.findMany({
    where: { 
      published: true,
      id: { not: featuredPost?.id } // Não traz o post que já está no banner
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 9, // Traz os últimos 9 posts
  });

  // Se não tiver nenhum destaque marcado, usa o primeiro post mais recente como banner
  const heroPost = featuredPost || recentPosts[0]; 
  const gridPosts = featuredPost ? recentPosts : recentPosts.slice(1);

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      
      {/* --- HERO SECTION (BANNER) --- */}
      {heroPost ? (
        <section className="relative h-[500px] md:h-[600px] w-full group overflow-hidden">
          
          {/* Imagem de Fundo com Efeito */}
          {heroPost.coverImage ? (
            <Image
              src={heroPost.coverImage}
              alt={heroPost.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-slate-800" />
          )}

          {/* Gradiente Escuro para ler o texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

          {/* Conteúdo do Banner */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
            <div className="container mx-auto">
              {heroPost.category && (
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                  {heroPost.category.name}
                </span>
              )}
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl drop-shadow-lg">
                <Link href={`/post/${heroPost.slug}`} className="hover:text-blue-200 transition">
                  {heroPost.title}
                </Link>
              </h1>

              {heroPost.excerpt && (
                <p className="text-slate-200 text-lg md:text-xl max-w-2xl mb-8 line-clamp-2 hidden md:block">
                  {heroPost.excerpt}
                </p>
              )}

              <Link 
                href={`/post/${heroPost.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-900 bg-white rounded-full hover:bg-blue-50 transition shadow-lg"
              >
                Ler História Completa <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        // Banner vazio se não tiver nenhum post no blog
        <div className="h-[400px] bg-slate-800 flex items-center justify-center text-white">
          <p>Ainda não há publicações.</p>
        </div>
      )}


      {/* --- LISTA DE POSTS (GRID) --- */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-600 pl-4">
            Últimas Novidades
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/post/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
            >
              {/* Imagem do Card */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                {post.coverImage ? (
                  <Image 
                    src={post.coverImage} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">Sem Foto</div>
                )}
                
                {/* Badge da Categoria */}
                {post.category && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-900 uppercase tracking-wide shadow-sm">
                    {post.category.name}
                  </div>
                )}
              </div>

              {/* Texto do Card */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <Calendar size={14} />
                  {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow">
                  {post.excerpt || "Clique para ler o conteúdo completo desta publicação..."}
                </p>

                <div className="text-blue-600 font-bold text-sm flex items-center gap-1 mt-auto">
                  Ler mais <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}