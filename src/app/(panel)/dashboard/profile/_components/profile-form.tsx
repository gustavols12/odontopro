import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

const profileSchema = z.object({
  name: z.string().min(1, { message: 'o nome é obrigatório' }),
  address: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  status: z.string(),
  timeZone: z.string().min(1, { message: 'o time zone é obrigatório' }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm() {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      status: 'Ativo',
      timeZone: '',
    },
  });
}
