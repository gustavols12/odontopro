import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointments-List";
import { format } from "date-fns";
import { formatCurrency } from "@/utilis/formatCurrency";

interface DialogAppointmentProps {
  appointment: AppointmentWithService | null;
}

export function DialogAppointment({ appointment }: DialogAppointmentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <Dialog>Detalhes do agendamento</Dialog>
        <DialogDescription>
          veja todos os detalhes do agendamento
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        {appointment && (
          <article>
            <p>
              <span className="font-semibold">Horário agendado:</span>
              {appointment.time}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Data:</span>
              {format(appointment.appointmentDate, "dd/MM/yyyy")}
            </p>
            <p>
              <span className="font-semibold mb-1">Nome: </span>
              {appointment.name}
            </p>
            <p>
              <span className="font-semibold mb-1">Telefone: </span>
              {appointment.phone}
            </p>
            <p>
              <span className="font-semibold mb-1">Email: </span>
              {appointment.email}
            </p>

            <section className="bg-gray-50 mt-4 p-2 rounded-md">
              <p>
                <span className="font-semibold">Serviço: </span>
                {appointment.service.name}
              </p>
              <p>
                <span className="font-semibold">Valor: </span>
                {formatCurrency(appointment.service.price / 100)}
              </p>
            </section>
          </article>
        )}
      </div>
    </DialogContent>
  );
}
