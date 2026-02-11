import { prisma } from "@/lib/prisma";
import { Mail, Calendar, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          <Mail size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Leitores VIP</h1>
          <p className="text-slate-500">
            Você tem <strong>{subscribers.length}</strong> pessoas esperando suas novidades.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p>Nenhum inscrito ainda. Divulgue seu blog! 🚀</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">E-mail</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Data de Inscrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-slate-700 font-medium flex items-center gap-2">
                    <User size={16} className="text-slate-400" />
                    {sub.email}
                  </td>
                  <td className="p-4 text-right text-slate-500 text-sm font-mono">
                    <span className="flex items-center justify-end gap-2">
                      {new Date(sub.createdAt).toLocaleDateString('pt-BR')}
                      <Calendar size={14} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}