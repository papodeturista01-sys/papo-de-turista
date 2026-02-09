import Link from "next/link";
import Image from "next/image";

// Definimos o que o Hero espera receber
interface HeroProps {
  post: any; // Aceita o objeto do post
}

export default function Hero({ post }: HeroProps) {
  // Se não tiver post nenhum (banco vazio), mostra um padrão
  if (!post) {
    return (
      <section className="relative w-full h-[600px] flex items-center justify-center bg-slate-800 text-white">
        <h1 className="text-4xl font-bold">Em breve novas histórias...</h1>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[600px] flex items-center justify-center">
      {/* 1. Imagem de Fundo (Capa do Post) */}
      {post.coverImage ? (
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover brightness-50" // brightness-50 deixa mais escuro para ler o texto
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-slate-800" /> // Fundo cinza se não tiver foto
      )}

      {/* 2. Texto e Botão */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        {post.category && (
          <span className="uppercase tracking-widest text-sm bg-blue-600 px-3 py-1 rounded-full mb-4 inline-block">
            {post.category.name}
          </span>
        )}
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          {post.title}
        </h1>

        <Link
          href={`/post/${post.slug}`}
          className="inline-block bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
        >
          Ler História
        </Link>
      </div>
    </section>
  );
}