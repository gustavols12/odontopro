"use client";

import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png";
import { MapPin } from "lucide-react";
import { useAppointmentForm, AppoimentFormData } from "./schedule-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Prisma } from "@/generated/prisma";
import { formatPhone } from "@/utilis/formatPhone";
import { DateTimePicker } from "./date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}
interface TimeSlot {
  time: string;
  available: boolean;
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);
  async function handleRegisterAppointment(formData: AppoimentFormData) {}

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-emerald-500" />

      <section className="contianer mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
              <Image
                src={clinic.image ? clinic.image : imgTest}
                alt="Foto da clinica"
                className="object-cover"
                fill
              />
            </div>

            <h1 className="text-2xl font-bold mb-2">{clinic.name}</h1>
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span>
                {clinic.address ? clinic.address : "Endereço não informado"}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-2xl mx-auto w-full mt-5">
        <Form {...form}>
          <form
            className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm"
            onSubmit={form.handleSubmit(handleRegisterAppointment)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">
                    Nome completo:
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Digite seu nome completo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Email:</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Digite seu email completo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Telefone:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone"
                      placeholder="EX:(xx) xxxxx-xxxx"
                      onChange={(e) => {
                        const formattedValue = formatPhone(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="my-2 flex items-center gap-2 space-y-1">
                  <FormLabel className="font-semibold">
                    data do agendamento:
                  </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      initialDate={new Date()}
                      className="w-full border p-2"
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">
                    Selecione o serviço
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>

                    <SelectContent>
                      {clinic.services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} ({Math.floor(service.duration / 60)}h{" "}
                          {service.duration % 60}min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {clinic.status ? (
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-400"
                type="submit"
                disabled={
                  !watch("name") ||
                  !watch("email") ||
                  !watch("phone") ||
                  !watch("date") ||
                  !watch("serviceId")
                }
              >
                Realizar agendamento
              </Button>
            ) : (
              <p className="bg-red-500 text-center text-white rounded px-4 py-2">
                A clinica está fechada nesse momento.
              </p>
            )}
          </form>
        </Form>
      </section>
    </div>
  );
}
