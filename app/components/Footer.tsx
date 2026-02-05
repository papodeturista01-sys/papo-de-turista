import Link from "next/link";
import { Instagram, Youtube, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Sobre */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tighter">
              Papo de Turista
            </h3>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              Um espaço para quem acredita que viajar é mais do que carimbar passaporte. Histórias, cultura e reflexões sobre o mundo.
            </p>
          </div>

          {/* Coluna 2: Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Explorar</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/cronicas" className="hover:text-blue-600 transition">Crônicas</Link></li>
              <li><Link href="/destinos" className="hover:text-blue-600 transition">Destinos</Link></li>
              <li><Link href="/sobre" className="hover:text-blue-600 transition">Sobre a Autora</Link></li>
              <li><Link href="/contato" className="hover:text-blue-600 transition">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Social */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Acompanhe</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white transition">
                <Youtube size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Linha final */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© 2026 Papo de Turista. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-slate-600">Política de Privacidade</Link>
            <Link href="#" className="hover:text-slate-600">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}