"use client"; // <--- Importante para o navegador saber onde estamos

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook para saber a rota atual
import { Menu } from "lucide-react"; // Ícone de menu (opcional)

export default function Navbar() {
  const pathname = usePathname();
  
  // Verifica se estamos na página inicial
  const isHome = pathname === "/";

  return (
    <nav 
      className={`w-full z-50 transition-colors duration-300 ${
        isHome 
          ? "absolute top-0 left-0 bg-transparent text-white" // Na Home: Transparente e Absoluto
          : "relative bg-blue-900 text-white shadow-md"       // Nas outras: Azul e Relativo
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80">
          Papo de Turista ✈️
        </Link>

        {/* LINKS (Desktop) */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-blue-200 transition-colors">
            Início
          </Link>
          <Link href="/sobre" className="hover:text-blue-200 transition-colors">
            Sobre
          </Link>
          <Link href="/contato" className="hover:text-blue-200 transition-colors">
            Contato
          </Link>
          {/* Botão de Login/Admin discreto */}
          <Link 
            href="/dashboard" 
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
               isHome 
                 ? "bg-white text-blue-900 hover:bg-blue-50" 
                 : "bg-blue-700 text-white hover:bg-blue-600 border border-blue-500"
            }`}
          >
            Acesso Restrito
          </Link>
        </div>

        {/* MENU MOBILE (Ícone simples para celular) */}
        <div className="md:hidden">
          <button className="p-2">
            <Menu size={28} />
          </button>
        </div>

      </div>
    </nav>
  );
}