import Hero from "@/components/HeroBanner"; // Mudou aqui!
// import FeaturedPosts from "@/components/FeaturedPosts"; // Se você tiver essa lista embaixo
import { prisma } from "@/lib/prisma";

// Essa função diz pro Next.js não fazer cache eterno, para você ver a troca de destaque logo
export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Tenta buscar o post marcado como DESTAQUE
  let heroPost = await prisma.post.findFirst({
    where: {
      featured: true,
      published: true,
    },
    include: {
      category: true, // Traz o nome da categoria junto
    },
    orderBy: {
      updatedAt: 'desc', // Se tiver 2 destaques, pega o que foi mexido por último
    },
  });

  // 2. Se não tiver nenhum destaque, pega o ÚLTIMO post publicado (Plano B)
  if (!heroPost) {
    heroPost = await prisma.post.findFirst({
      where: { published: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 3. Busca os outros posts para a lista de baixo (opcional, mantive simples)
  const recentPosts = await prisma.post.findMany({
    where: { published: true, NOT: { id: heroPost?.id } }, // Não repete o do destaque
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  return (
    <main>
      {/* Passamos o post encontrado para o Hero */}
      <Hero post={heroPost} />
      
      {/* Aqui embaixo vai sua lista de posts normais */}
      {/* <FeaturedPosts posts={recentPosts} /> */}
    </main>
  );
}