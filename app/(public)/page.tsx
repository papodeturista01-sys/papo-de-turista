import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
// Importando fontes do Google para o estilo revista
import { Dancing_Script, Playfair_Display, Lato } from 'next/font/google';
import { Newsletter } from "@/components/Newsletter";

// Configuração das fontes
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

export const dynamic = "force-dynamic";

export default async function Home() {
  
  // 1. O CHEFÃO: Busca o Post Principal para o Banner (Hero)
  const heroPost = await prisma.post.findFirst({
    where: { published: true, featured: true },
    include: { category: true },
    orderBy: { updatedAt: 'desc' }
  });

  // 2. OS FAVORITOS: Busca 5 posts destaque (excluindo o que já está no Hero)
  const favoritePosts = await prisma.post.findMany({
    where: { 
      published: true, 
      featured: true,
      id: { not: heroPost?.id } // Não repete o do banner
    },
    include: { category: true },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  });

  // 3. NOVIDADES: Busca posts recentes (excluindo Hero e Favoritos)
  const excludeIds = [heroPost?.id, ...favoritePosts.map(p => p.id)].filter(Boolean) as string[];
  
  const recentPosts = await prisma.post.findMany({
    where: { 
      published: true,
      id: { notIn: excludeIds }
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });


  // --- COMPONENTES VISUAIS ---
  
  // Card pequeno para "Posts Favoritos"
  const FavoriteCard = ({ post }: { post: any }) => (
    <Link href={`/post/${post.slug}`} className="group flex flex-col text-center w-full max-w-[200px]">
      <div className="relative h-32 w-full mb-3 overflow-hidden rounded-md shadow-sm">
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">Sem Foto</div>
        )}
      </div>
      <h3 className={`${playfair.className} text-sm font-bold text-slate-800 group-hover:text-blue-600 transition leading-tight px-1`}>
        {post.title}
      </h3>
    </Link>
  );

  // Card para "Novidades" (Revista)
  const NewsCard = ({ post, isTall = false }: { post: any, isTall?: boolean }) => (
    <Link href={`/post/${post.slug}`} className={`group flex flex-col bg-white ${isTall ? 'h-full' : ''}`}>
      <div className={`relative w-full mb-4 overflow-hidden rounded-lg shadow-sm ${isTall ? 'h-[400px] md:h-full min-h-[300px]' : 'h-56'}`}>
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">Sem Foto</div>
        )}
        
        {post.category && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide text-slate-800 shadow-sm">
             {post.category.name}
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center text-center px-2">
        <h3 className={`${playfair.className} text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition`}>
          {post.title}
        </h3>
        {post.excerpt && (
          <p className={`${lato.className} text-slate-500 text-sm leading-relaxed line-clamp-3 font-light`}>
            {post.excerpt}...
          </p>
        )}
      </div>
    </Link>
  );


  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      
      {/* =========================================
          1. BANNER PRINCIPAL (HERO) - RESTAURADO!
         ========================================= */}
      {heroPost ? (
        <section className="relative h-[500px] md:h-[600px] w-full group overflow-hidden mb-12">
          {heroPost.coverImage && (
            <Image
              src={heroPost.coverImage}
              alt={heroPost.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
            <div className="container mx-auto">
              {heroPost.category && (
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                  {heroPost.category.name}
                </span>
              )}
              <h1 className={`${playfair.className} text-4xl md:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl drop-shadow-lg`}>
                <Link href={`/post/${heroPost.slug}`} className="hover:text-blue-200 transition">
                  {heroPost.title}
                </Link>
              </h1>
              {heroPost.excerpt && (
                <p className={`${lato.className} text-slate-200 text-lg md:text-xl max-w-2xl mb-8 line-clamp-2 hidden md:block`}>
                  {heroPost.excerpt}
                </p>
              )}
              <Link 
                href={`/post/${heroPost.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-900 bg-white rounded-full hover:bg-blue-50 transition shadow-lg"
              >
                Ler Matéria <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        // Espaço reservado se não tiver post ainda (evita menu quebrado)
        <div className="h-24 bg-slate-900 w-full" />
      )}


      {/* =========================================
          2. SEÇÃO: POSTS FAVORITOS
         ========================================= */}
      {favoritePosts.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-center justify-center mb-8 relative">
             <h2 className={`${dancingScript.className} text-5xl text-slate-400 px-6 bg-slate-50 relative z-10`}>
                posts favoritos
             </h2>
             <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 z-0" />
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {favoritePosts.map((post) => (
              <FavoriteCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}


      {/* =========================================
          3. SEÇÃO: NOVIDADES (LAYOUT REVISTA)
         ========================================= */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-10 relative">
             <h2 className={`${dancingScript.className} text-5xl text-slate-400 px-6 bg-slate-50 relative z-10`}>
                novidades
             </h2>
             <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 z-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Esquerda */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {recentPosts[0] && <NewsCard post={recentPosts[0]} />}
            {recentPosts[1] && <NewsCard post={recentPosts[1]} />}
          </div>

          {/* Centro (Destaque Vertical) */}
          <div className="lg:col-span-4">
            {recentPosts[2] && <NewsCard post={recentPosts[2]} isTall={true} />}
          </div>

          {/* Direita */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {recentPosts[3] && <NewsCard post={recentPosts[3]} />}
            {recentPosts[4] && <NewsCard post={recentPosts[4]} />}
          </div>

        </div>

        {/* Aviso se não tiver nada */}
        {!heroPost && recentPosts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">O blog está vazio. Comece a escrever!</p>
          </div>
        )}
      </section>
{/* --- NEWSLETTER --- */}
<Newsletter />
    </main>
  );
}