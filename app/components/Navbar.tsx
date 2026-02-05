// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Plane, MapPin, BookOpen, PenTool, Mail } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efeito para detectar rolagem e mudar a cor do menu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Crônicas", href: "/cronicas", icon: BookOpen },
    { name: "Destinos", href: "/destinos", icon: MapPin },
    { name: "Turismo & Reflexões", href: "/turismo-reflexoes", icon: Plane }, // [cite: 10]
    { name: "Diário de Bordo", href: "/diario-bordo", icon: PenTool }, // [cite: 11]
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato", icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3 text-slate-800"
          : "bg-transparent py-5 text-white" // Transparente no topo (para ficar em cima da foto Hero)
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition">
          Papo de Turista
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-blue-500 transition-colors flex items-center gap-1"
            >
              {link.name}
            </Link>
          ))}
          {/* Botão de Newsletter no Menu [cite: 14] */}
          <button className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            isScrolled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-blue-900 hover:bg-gray-100"
          }`}>
            Assinar News
          </button>
        </nav>

        {/* MENU MOBILE (HAMBURGUER) */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* GAVETA DO MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-4 text-slate-800 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium py-2 border-b border-gray-100 flex items-center gap-3"
            >
              {link.icon && <link.icon size={18} className="text-blue-500" />}
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}