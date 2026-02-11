import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
// Importando fontes do Google para ficar igual à referência
import { Dancing_Script, Playfair_Display, Lato } from 'next/font/google';

// Configuração das fontes
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

export const dynamic = "force-dynamic";

export default async function Home() {
  
  // 1. Busca os 5 posts FAVORITOS (Destaque ⭐)
  const favoritePosts = await prisma.post.findMany({
    where: { published: true, featured: true },
    include: { category: true },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  });

  // 2. Busca os 5 posts mais RECENTES (Novidades), excluindo os que já estão nos favoritos
  const recentPosts = await prisma.post.findMany({
    where: { 
      published: true,
      id: { notIn: favoritePosts.map(p => p.id) } // Não repete os favoritos
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Componente para os cards menores do topo
  const FavoriteCard = ({ post }: { post: any }) => (
    <Link href={`/post/${post.slug}`} className="group flex flex-col text-center w-full">
      <div className="relative h-40 w-full mb-3 overflow-hidden rounded-sm">
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">Sem Foto</div>
        )}
      </div>
      <h3 className={`${playfair.className} text-sm font-bold text-slate-800 group-hover:text-blue-600 transition leading-tight px-2`}>
        {post.title}
      </h3>
    </Link>
  );

  // Componente para os cards maiores do grid de novidades
  const NewsCard = ({ post, isTall = false }: { post: any, isTall?: boolean }) => (
    <Link href={`/post/${post.slug}`} className={`group flex flex-col bg-white ${isTall ? 'h-full' : ''}`}>
      <div className={`relative w-full mb-4 overflow-hidden rounded-sm ${isTall ? 'h-[400px] md:h-full min-h-[300px]' : 'h-64'}`}>
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">Sem Foto</div>
        )}
      </div>
      <div className="flex flex-col items-center text-center px-4">
        {post.category && (
          <span className={`${lato.className} inline-block bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-3 rounded-sm`}>
            {post.category.name}
          </span>
        )}
        <h3 className={`${playfair.className} text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition`}>
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
    <main className="bg-white min-h-screen py-12">
      
      {/* --- SEÇÃO: POSTS FAVORITOS (TOPO) --- */}
      {favoritePosts.length > 0 && (
        <section className="container mx-auto px-4 mb-16 border-b border-slate-100 pb-12">
          <h2 className={`${dancingScript.className} text-center text-5xl text-slate-400 mb-10 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[30%] before:h-px before:bg-slate-200 after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[30%] after:h-px after:bg-slate-200`}>
            <span className="px-4 bg-white relative z-10">posts favoritos</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {favoritePosts.map((post) => (
              <FavoriteCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}


      {/* --- SEÇÃO: NOVIDADES (GRID REVISTA) --- */}
      <section className="container mx-auto px-4">
        <h2 className={`${dancingScript.className} text-center text-5xl text-slate-400 mb-12 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:h-px before:bg-slate-200 after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:h-px after:bg-slate-200`}>
          <span className="px-4 bg-white relative z-10">novidades</span>
        </h2>

        {/* Layout estilo Revista (Grid Assimétrico) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
          
          {/* Coluna Esquerda (2 posts verticais) */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            {recentPosts[0] && <NewsCard post={recentPosts[0]} />}
            {recentPosts[1] && <NewsCard post={recentPosts[1]} />}
          </div>

          {/* Coluna do Meio (1 post alto) */}
          <div className="lg:col-span-4">
            {recentPosts[2] && <NewsCard post={recentPosts[2]} isTall={true} />}
          </div>

          {/* Coluna Direita (2 posts verticais) */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            {recentPosts[3] && <NewsCard post={recentPosts[3]} />}
            {recentPosts[4] && <NewsCard post={recentPosts[4]} />}
          </div>

        </div>

        {recentPosts.length === 0 && favoritePosts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p>Ainda não há publicações. Acesse o painel para começar!</p>
          </div>
        )}
      </section>

    </main>
  );
}