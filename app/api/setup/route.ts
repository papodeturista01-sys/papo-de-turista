import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Garante as categorias
    const categories = ["Crônicas", "Destinos", "Turismo & Reflexões", "Diário de Bordo"];
    for (const name of categories) {
      await prisma.category.upsert({
        where: { slug: name.toLowerCase().replace(/ /g, "-").replace(/&/g, "e").normalize("NFD").replace(/[\u0300-\u036f]/g, "") },
        update: {},
        create: {
          name: name,
          slug: name.toLowerCase().replace(/ /g, "-").replace(/&/g, "e").normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        },
      });
    }

    // 2. Cria a Página "Sobre" (AQUI ESTÁ A NOVIDADE)
    await prisma.page.upsert({
      where: { slug: "sobre" },
      update: {},
      create: {
        slug: "sobre",
        title: "Olá, eu sou a Fernanda.",
        content: "Bem-vindo ao Papo de Turista! Sou apaixonada por desbravar o mundo e acredito que cada carimbo no passaporte traz uma nova história para contar.\n\nEste blog nasceu da vontade de registrar não apenas os roteiros turísticos, mas os sentimentos, os cheiros e as cores de cada lugar que visitei.\n\nSeja tomando um café em Paris ou subindo montanhas no Peru, meu objetivo é inspirar você a fazer as malas e trocar a roupa da alma.",
        image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1887&auto=format&fit=crop"
      }
    });

    return NextResponse.json({ message: "Banco de dados atualizado com Páginas e Categorias!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro no setup", details: error }, { status: 500 });
  }
}