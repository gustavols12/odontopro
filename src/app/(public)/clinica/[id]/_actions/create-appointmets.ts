"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "o nome é obrigatório"),
  email: z.string().min(1, "o email é obrigatório"),
  phone: z.string().min(1, "o telefone é obrigatório"),
  date: z.date(),
  time: z.string().min(1, "o horário é obrigatório"),
  clinicId: z.string().min(1, "o horário é obrigatório"),
  serviceId: z.string().min(1, "o serviço é obrigatório"),
});

type FormSchema = z.infer<typeof formSchema>;

export async function createNewAppointment(formData: FormSchema) {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    const selectedDate = new Date(formData.date);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const appointmentDate = new Date(year, month, day, 0, 0, 0, 0);

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentDate: appointmentDate,
        serviceId: formData.serviceId,
        userId: formData.clinicId,
      },
    });

    return {
      data: newAppointment,
    };
  } catch (err) {
    return {
      error: "Erro ao realizar agendamento",
    };
  }
}
