import { getAllServices } from "../_data-access/get-all-service";
import { ServiceList } from "./Service-list";

interface ServiceContentProps {
  userId: string;
}
export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getAllServices({ userId });
  return (
    <div>
      <ServiceList services={services.data || []} />
    </div>
  );
}
