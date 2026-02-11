import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Busca o post pelo slug (o texto amigável na URL)
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });

  // Se não achar o post, mostra uma mensagem bonita
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Poxa, não encontramos essa história! 🗺️</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Voltar para o Início
        </Link>
      </div>
    );
  }

  // Formata a data (Ex: 10 de Fevereiro de 2026)
  const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Calcula tempo de leitura estimado (aprox. 200 palavras por minuto)
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <article className="min-h-screen bg-white pb-20">
      
      {/* --- CABEÇALHO DO POST --- */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        
        {/* Botão Voltar */}
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition mb-8 font-medium">
          <ArrowLeft size={20} className="mr-2" /> Voltar para o Blog
        </Link>

        {/* Categoria e Data */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
          {post.category && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
              <Tag size={14} /> {post.category.name}
            </span>
          )}
          <span className="flex items-center gap-1 text-slate-500">
            <Calendar size={16} /> {formattedDate}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clock size={16} /> {readTime} min de leitura
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          {post.title}
        </h1>

        {/* Resumo (Subtítulo) */}
        {post.excerpt && (
          <p className="text-xl text-slate-500 leading-relaxed font-light">
            {post.excerpt}
          </p>
        )}
      </header>


      {/* --- IMAGEM DE DESTAQUE (CAPA) --- */}
      {post.coverImage && (
        <div className="w-full h-[400px] md:h-[500px] relative mb-12 bg-slate-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority // Carrega rápido por ser a principal
          />
        </div>
      )}


      {/* --- CONTEÚDO DO TEXTO --- */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="prose prose-lg prose-slate prose-blue mx-auto">
          {/* white-space-pre-wrap: Garante que os parágrafos e quebras de linha 
             que você deu no editor sejam respeitados aqui.
          */}
          <div className="whitespace-pre-wrap text-slate-700 leading-loose text-lg">
            {post.content}
          </div>
        </div>

        {/* Rodapé do Post */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
          <p className="text-slate-400 italic">
            Escrito com ❤️ por Papo de Turista
          </p>
          <div className="flex gap-2">
             {/* Aqui você poderia colocar botões de compartilhar no futuro */}
          </div>
        </div>
      </div>

    </article>
  );
}