"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  appointmentId: z.string().min(1, "o id do lembrete é obrigatório"),
});

type FormSchema = z.infer<typeof formSchema>;

export async function cancelAppointment(formData: FormSchema) {
  const session = await auth();
  const schema = formSchema.safeParse(formData);

  if (!session?.user.id) {
    return {
      error: "Usuário não encontrado",
    };
  }

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    await prisma.appointment.delete({
      where: {
        id: formData.appointmentId,
        userId: session.user?.id,
      },
    });
    revalidatePath("/dashboard");

    return {
      data: "agendamento cancelado com sucesso!",
    };
  } catch (err) {
    return {
      error: "falha ao cancelar agendamento",
    };
  }
}
