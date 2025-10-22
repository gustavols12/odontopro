import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "o campo nome é obrigatório" }),
  price: z.number().min(1, { message: "o campo preço é obrigatório" }),
  duration: z.number(),
});

type fromSchema = z.infer<typeof formSchema>;

export async function createNewService(formData: fromSchema) {
  const session = await auth();

  if (!session?.user.id) {
    return {
      error: "falha ao cadastrar serviço",
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    const newService = await prisma.service.create({
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
        userId: session.user.id,
      },
    });
    return {
      data: newService,
    };
  } catch (err) {
    return {
      error: "erro ao cadastrar serviço",
    };
  }
}
