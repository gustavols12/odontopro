import { getTimesClinic } from "../../_data-access/get_times-clinic";
import { AppointmentsList } from "./appointments-List";

export async function Appointments({ userId }: { userId: string }) {
  const { times } = await getTimesClinic({ userId: userId });

  return <AppointmentsList times={times} />;
}
