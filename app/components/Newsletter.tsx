import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="bg-blue-900 py-20 text-white relative overflow-hidden">
      {/* Círculos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-800 rounded-full mb-6 text-blue-200">
          <Mail size={24} />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Viaje sem sair do lugar.
        </h2>
        <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto font-light">
          Receba crônicas mensais, dicas de destinos secretos e reflexões que não cabem no Instagram.
        </p>

        <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="flex-1 px-6 py-3 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg">
            Inscrever-se
          </button>
        </form>
        
        <p className="text-xs text-blue-400 mt-4">
          Sem spam. Apenas histórias reais.
        </p>
      </div>
    </section>
  );
}