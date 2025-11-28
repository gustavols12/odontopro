"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAvatarImage({ avatarUrl }: { avatarUrl: string }) {
  const session = await auth();

  if (!avatarUrl) {
    return {
      error: "Falha ao alterar imagem",
    };
  }

  if (!session?.user.id) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: avatarUrl,
      },
    });

    revalidatePath("/dashboard/profile");
    return {
      data: "Imagem atualizada",
    };
  } catch (err) {
    return {
      error: "Usuário não encontrado",
    };
  }
}
