import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Agora ele pega o "slug" corretamente da URL
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug: slug },
    include: {
      posts: {
        where: { published: true },
        orderBy: { createdAt: 'desc' },
      }
    }
  });

  if (!category) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Categoria não encontrada 😕</h1>
        <Link href="/" className="text-blue-600 underline">Voltar para Home</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Explorar</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 capitalize">
            {category.name}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.posts.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 w-full overflow-hidden">
                {post.coverImage ? (
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">Sem Imagem</div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">{post.title}</h2>
                <div className="mt-4 text-xs font-bold text-blue-500 uppercase tracking-wide">Ler Artigo →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}