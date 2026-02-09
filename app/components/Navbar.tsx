"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Estilo dos links (para não repetir código)
  const linkStyle = "hover:text-blue-200 transition-colors text-sm uppercase tracking-wide font-medium";

  return (
    <nav 
      className={`w-full z-50 transition-all duration-300 ${
        isHome 
          ? "absolute top-0 left-0 bg-transparent text-white pt-6" // Home: Transparente
          : "relative bg-blue-900 text-white shadow-md py-4"       // Outras: Azul
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80">
          Papo de Turista ✈️
        </Link>

        {/* LINKS DE MENUS (Restaurados) */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/" className={linkStyle}>Home</Link>
          
          {/* Categorias (Verifique se os links batem com o slug do seu banco) */}
          <Link href="/category/cronicas" className={linkStyle}>Crônicas</Link>
          <Link href="/category/destinos" className={linkStyle}>Destinos</Link>
          <Link href="/category/turismo-e-reflexoes" className={linkStyle}>Turismo & Reflexões</Link>
          <Link href="/category/diario-de-bordo" className={linkStyle}>Diário de Bordo</Link>

          <Link href="/sobre" className={linkStyle}>Sobre</Link>
          <Link href="/contato" className={linkStyle}>Contato</Link>
        </div>

        {/* BOTÕES LATERAIS */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
               isHome 
                 ? "bg-white text-blue-900 hover:bg-blue-50 border-white" 
                 : "bg-blue-700 text-white hover:bg-blue-600 border-blue-500"
            }`}
          >
            Assinar News
          </Link>
        </div>

        {/* MENU MOBILE (Celular) */}
        <div className="lg:hidden">
          <button className="p-2">
            <Menu size={28} />
          </button>
        </div>

      </div>
    </nav>
  );
}