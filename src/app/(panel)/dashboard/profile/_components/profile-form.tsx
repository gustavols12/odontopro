import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

interface UseProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean;
  timeZone: string | null;
}

const profileSchema = z.object({
  name: z.string().min(1, { message: 'o nome é obrigatório' }),
  address: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  status: z.string(),
  timeZone: z.string().min(1, { message: 'o time zone é obrigatório' }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm({
  name,
  address,
  phone,
  status,
  timeZone,
}: UseProfileFormProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || '',
      address: address || '',
      phone: phone || '',
      status: status ? 'active' : 'inactive',
      timeZone: timeZone || '',
    },
  });
}
