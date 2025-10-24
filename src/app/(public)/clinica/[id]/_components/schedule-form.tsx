"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const appoimentsSchema = z.object({
  name: z.string().min(1, "o nome é obrigatório"),
  email: z.string().min(1, "o email é obrigatório"),
  phone: z.string().min(1, "o nome é obrigatório"),
  date: z.date(),
  serviceId: z.string(),
});

export type AppoimentFormData = z.infer<typeof appoimentsSchema>;

export function useAppointmentForm() {
  return useForm<AppoimentFormData>({
    resolver: zodResolver(appoimentsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceId: "",
      date: new Date(),
    },
  });
}
