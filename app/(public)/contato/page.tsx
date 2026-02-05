import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Fale Comigo</h1>
          <p className="text-slate-500">
            Tem alguma dúvida, sugestão de pauta ou quer apenas dar um oi?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm">
          
          {/* Informações de Contato */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Canais diretos</h3>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">E-mail</h4>
                <p className="text-slate-500">contato@papodeturista.com.br</p>
                <p className="text-sm text-slate-400 mt-1">Respondo em até 2 dias úteis.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Base</h4>
                <p className="text-slate-500">São Paulo, Brasil</p>
                <p className="text-sm text-slate-400 mt-1">Mas sempre viajando!</p>
              </div>
            </div>
          </div>

          {/* Formulário Simples */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Seu nome" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Escreva sua mensagem..."></textarea>
            </div>
            <button type="button" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
              Enviar Mensagem
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}