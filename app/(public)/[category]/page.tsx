// app/(public)/[category]/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { notFound } from "next/navigation";

// Next.js 15: params é uma Promise
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;

  // 1. Busca a Categoria e seus Posts
  const categoryData = await prisma.category.findUnique({
    where: { slug: slug },
    include: {
      posts: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
        include: { category: true },
      },
    },
  });

  // Se a categoria não existir (ex: /sobre ou /contato que faremos depois),
  // ou se digitar algo errado, dá 404
  if (!categoryData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Cabeçalho da Categoria */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">
            Explorando
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 capitalize">
            {categoryData.name}
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {categoryData.posts.length} histórias encontradas nesta seção.
          </p>
        </div>

        {/* Lista de Posts */}
        {categoryData.posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {categoryData.posts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                {/* Imagem */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <FileText size={40} className="opacity-20" />
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                     {post.content.substring(0, 100)}...
                  </div>
                  <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 mt-auto">
                    Ler tudo <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Se a categoria existir mas não tiver posts
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">Ainda não há publicações nesta categoria.</p>
            <Link href="/dashboard" className="text-blue-600 underline mt-2 block">
              Escrever a primeira
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}