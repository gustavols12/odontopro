"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReminderFormData, useReminderForm } from "./reminder-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReminder } from "../../_actions/create-reminder";
import { toast } from "sonner";

interface ReminderContentProps {
  closeDialog: () => void;
}

export function ReminderContent({ closeDialog }: ReminderContentProps) {
  const form = useReminderForm();

  async function onSubmit(formData: ReminderFormData) {
    const response = await createReminder({
      description: formData.description,
    });
    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
    closeDialog();
  }

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Nome do lembrete
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Descreva o lembrete..."
                    className="max-h-52"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.watch("description")}>
            Cadastrar lembrete
          </Button>
        </form>
      </Form>
    </div>
  );
}
