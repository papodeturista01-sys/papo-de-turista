import "../globals.css";
import Link from "next/link";
import { LayoutDashboard, PenTool, Users, LogOut, Tags, Map } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin - Papo de Turista",
};

// Ação de Logout (Server Action)
async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("admin_session"); // Apaga o cookie
  redirect("/login"); // Manda pra tela de login
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-100 min-h-screen flex">
        {/* === SIDEBAR === */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold tracking-tighter">Papo Admin</h1>
            <p className="text-xs text-slate-400 mt-1">Gerenciamento</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            
            <Link href="/dashboard/novo" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
              <PenTool size={20} />
              Escrever Post
            </Link>

            <Link href="/dashboard/categorias" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
              <Tags size={20} />
              Categorias
            </Link>
            
            <Link href="/dashboard/paginas" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
               <LayoutDashboard size={20} />
               Páginas Fixas
            </Link>

            <Link href="/dashboard/newsletter" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
              <Users size={20} />
              Leitores (News)
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-800">
            {/* Botão de Logout Funcional */}
            <form action={logout}>
              <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-slate-800 transition text-sm cursor-pointer">
                <LogOut size={18} />
                Sair do sistema
              </button>
            </form>
          </div>
        </aside>

        {/* === CONTEÚDO PRINCIPAL === */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </body>
    </html>
  );
}