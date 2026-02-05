import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit } from "lucide-react";

export default async function PagesList() {
  const pages = await prisma.page.findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Gerenciar Páginas Fixas</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Página</th>
              <th className="px-6 py-4">Última Atualização</th>
              <th className="px-6 py-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-900 capitalize">
                  {page.slug}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}