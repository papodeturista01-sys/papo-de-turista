import { prisma } from "@/lib/prisma";
import NavbarClient from "./NavbarClient";

// Este componente roda no SERVIDOR (busca dados no banco)
export default async function Navbar() {
  // Busca todas as categorias em ordem alfabética
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  // Manda os dados para o componente visual (Client)
  return <NavbarClient categories={categories} />;
}