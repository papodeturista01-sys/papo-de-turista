import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Lock, Mail, AlertCircle } from "lucide-react";
import Image from "next/image";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams; // Next.js 15: params são async

  // === AÇÃO DE LOGIN (SERVER SIDE) ===
  async function login(formData: FormData) {
    "use server";
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Pega as credenciais do .env
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASSWORD;

    // Validação simples (Email = User do .env)
    if (email === adminUser && password === adminPass) {
      // 1. Cria o cookie de sessão (Válido por 7 dias)
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: "/",
      });

      // 2. Redireciona para o Dashboard
      redirect("/dashboard");
    } else {
      // 3. Se errar, recarrega a página com erro
      redirect("/login?error=true");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-white text-2xl font-bold tracking-tight">Papo de Turista</h1>
          <p className="text-blue-100 text-sm mt-2">Área Administrativa</p>
        </div>

        {/* Formulário */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Bem-vindo de volta!</h2>
            <p className="text-slate-500 text-sm">Entre com suas credenciais para continuar.</p>
          </div>

          <form action={login} className="space-y-5">
            
            {/* Campo E-mail / Usuário */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Usuário / E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={20} />
                </div>
                <input 
                  name="email" 
                  type="text" 
                  required
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>
                <input 
                  name="password" 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Mensagem de Erro (se houver) */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle size={16} />
                <span>Credenciais incorretas. Tente novamente.</span>
              </div>
            )}

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform active:scale-95">
              Entrar no Sistema
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            &copy; 2026 Papo de Turista. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}