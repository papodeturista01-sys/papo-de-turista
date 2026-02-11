"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions";

export function Newsletter() {
  const [done, setDone] = useState(false);

  async function handleSubmit(formData: FormData) {
    await subscribeToNewsletter(formData);
    setDone(true);
  }

  return (
    <section className="bg-blue-600 py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail size={48} className="mx-auto mb-4 text-blue-200" />
          
          <h2 className="text-3xl font-bold mb-4">Viaje sem sair de casa ✈️</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Receba nossas melhores dicas, roteiros secretos e histórias inspiradoras direto no seu e-mail.
          </p>

          {done ? (
            <div className="bg-white/10 p-6 rounded-xl border border-white/20 animate-fade-in flex flex-col items-center">
              <CheckCircle size={48} className="text-green-300 mb-2" />
              <h3 className="text-xl font-bold">Inscrição confirmada!</h3>
              <p className="text-blue-100">Obrigado por fazer parte da nossa comunidade.</p>
            </div>
          ) : (
            <form action={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                name="email"
                type="email"
                required
                placeholder="Digite seu melhor e-mail..."
                className="flex-1 px-6 py-4 rounded-full text-slate-800 outline-none focus:ring-4 focus:ring-blue-400 transition"
              />
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold transition flex items-center justify-center gap-2 shadow-lg">
                Quero participar <ArrowRight size={20} />
              </button>
            </form>
          )}
          
          <p className="text-xs text-blue-200 mt-6 opacity-60">
            * Prometemos não enviar spam. Apenas conteúdos de viagem incríveis.
          </p>
        </div>
      </div>
    </section>
  );
}