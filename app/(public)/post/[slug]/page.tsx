// app/(public)/post/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";

// Correção para Next.js 15: params agora é uma Promise
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. OBRIGATÓRIO: Esperar carregar os parâmetros da URL
  const { slug } = await params;

  // 2. Busca no banco usando o slug recuperado
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      category: true,
      author: true,
    },
  });

  // Se não achar o post, manda para a página 404
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* === HERO DE CABEÇALHO === */}
      <div className="relative h-[60vh] w-full">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
            Sem imagem de capa
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white container mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-6 transition-colors backdrop-blur-md bg-white/10 px-3 py-1 rounded-full"
          >
            <ArrowLeft size={16} /> Voltar para Home
          </Link>

          {post.category && (
            <span className="block text-blue-400 font-bold tracking-wider text-sm uppercase mb-3">
              {post.category.name}
            </span>
          )}

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-slate-300 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit', month: 'long', year: 'numeric'
              })}
            </div>
            {post.author && (
              <span>por {post.author.name}</span>
            )}
          </div>
        </div>
      </div>

      {/* === CONTEÚDO DO TEXTO === */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-slate text-slate-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            <div className="flex gap-2">
              <Tag size={18} className="text-slate-400" />
              <span className="text-slate-500 text-sm">Tags: Viagem, {post.category?.name}</span>
            </div>
            
            <button className="text-blue-600 font-medium hover:underline">
              Compartilhar história
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}