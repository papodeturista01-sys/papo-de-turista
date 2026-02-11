"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) return { error: "E-mail obrigatório" };

  try {
    await prisma.subscriber.create({
      data: { email },
    });
    
    // Atualiza a lista no painel admin
    revalidatePath("/dashboard/leitores");
    return { success: true };
    
  } catch (error) {
    // Se o e-mail já existe (erro P2002), não faz nada, só finge que deu certo
    return { success: true }; 
  }
}