import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/login"], // Monitora Dashboard e Login
};

export function middleware(req: NextRequest) {
  // Tenta ler o cookie de sessão
  const session = req.cookies.get("admin_session");
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isLoginPage = req.nextUrl.pathname === "/login";

  // 1. Se estiver tentando acessar o Dashboard SEM cookie -> Manda pro Login
  if (isDashboard && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Se estiver tentando acessar o Login COM cookie -> Manda pro Dashboard (já está logado)
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}