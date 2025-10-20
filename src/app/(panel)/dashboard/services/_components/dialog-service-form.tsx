import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

interface UseProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean;
  timeZone: string | null;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "o nome é obrigatório" }),
  price: z.string().min(1, { message: "o preço é obrigatório" }),
  hours: z.string(),
  minutes: z.string(),
});

export interface UseDialogServiceFormProps {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm() {
  return useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });
}
