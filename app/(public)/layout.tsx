// app/(public)/layout.tsx
import "../globals.css"; // Garante que o CSS global carregue
import { Navbar } from "../components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Papo de Turista - Crônicas e Viagens",
  description: "Um blog sobre viagens, turismo sustentável e reflexões.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        {/* Futuro Rodapé virá aqui */}
      </body>
    </html>
  );
}