import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit } from "lucide-react";

// Força a atualização dos dados sempre que entrar na página
export const dynamic = 'force-dynamic';

export default async function PagesList() {
  // CORREÇÃO: Usando staticPage (o nome certo da tabela)
  const pages = await prisma.staticPage.findMany({
    orderBy: { title: 'asc' },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Gerenciar Páginas Fixas</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Página</th>
              <th className="px-6 py-4">Link (Slug)</th>
              <th className="px-6 py-4">Última Atualização</th>
              <th className="px-6 py-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {page.title}
                </td>
                <td className="px-6 py-4 text-blue-500">
                  /{page.slug}
                </td>
                <td className="px-6 py-4">
                  {new Date(page.updatedAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/dashboard/paginas/${page.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
                  >
                    <Edit size={16} /> Editar
                  </Link>
                </td>
              </tr>
            ))}
             {pages.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  Nenhuma página encontrada. Rode o <b>npx prisma studio</b> para criar "sobre" e "contato".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}