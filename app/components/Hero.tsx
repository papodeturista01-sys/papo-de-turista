// app/components/Hero.tsx
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 1. Imagem de Fundo (Hero) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="Viajante olhando montanhas"
          fill
          className="object-cover"
          priority // Carrega rápido para o SEO
        />
        {/* Máscara escura para o texto brilhar */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-50" />
      </div>

      {/* 2. Conteúdo Centralizado */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-10">
        <span className="uppercase tracking-[0.3em] text-sm md:text-base font-light mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Bem-vindo ao Papo de Turista
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          Viajar é trocar a roupa da alma.
        </h1>
        
        <p className="text-lg md:text-xl font-light text-slate-200 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          Crônicas, destinos e reflexões para quem busca mais do que apenas visitar lugares, mas vivê-los intensamente.
        </p>

        {/* Botão de Ação (CTA) */}
        <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-all transform hover:scale-105 animate-in fade-in zoom-in duration-1000 delay-500">
          Ler as Crônicas
        </button>
      </div>

      {/* Seta indicando rolagem */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <ArrowDown size={32} />
      </div>
    </section>
  );
}