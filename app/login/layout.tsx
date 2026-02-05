import "../globals.css"; // Importante para o Tailwind funcionar

export const metadata = {
  title: "Login - Papo de Turista",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}