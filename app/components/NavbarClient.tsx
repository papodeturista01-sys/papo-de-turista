"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

// Definimos que este componente espera receber uma lista de categorias
interface NavbarProps {
  categories: { id: string; name: string; slug: string }[];
}

export default function NavbarClient({ categories }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false); // Controle do menu mobile

  const linkStyle = "hover:text-blue-200 transition-colors text-sm uppercase tracking-wide font-medium";

  return (
    <nav 
      className={`w-full z-50 transition-all duration-300 ${
        isHome 
          ? "absolute top-0 left-0 bg-transparent text-white pt-6"
          : "relative bg-blue-900 text-white shadow-md py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80">
          Papo de Turista ✈️
        </Link>

        {/* LINKS (DESKTOP) - AGORA SÃO AUTOMÁTICOS */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/" className={linkStyle}>Home</Link>
          
          {/* AQUI ESTÁ A MÁGICA: Loop nas categorias do banco */}
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className={linkStyle}>
              {cat.name}
            </Link>
          ))}

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
            Acesso Restrito
          </Link>
        </div>

        {/* MENU MOBILE (Celular) */}
        <div className="lg:hidden">
          <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={28} />
          </button>
        </div>

      </div>

      {/* LISTA MOBILE (Abre quando clica no ícone) */}
      {isOpen && (
        <div className="lg:hidden bg-blue-900 absolute w-full left-0 top-full shadow-xl p-4 flex flex-col gap-4 border-t border-blue-800">
           {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="block py-2 text-white font-bold" onClick={() => setIsOpen(false)}>
              {cat.name}
            </Link>
          ))}
          <Link href="/sobre" className="block py-2 text-white">Sobre</Link>
          <Link href="/contato" className="block py-2 text-white">Contato</Link>
        </div>
      )}
    </nav>
  );
}