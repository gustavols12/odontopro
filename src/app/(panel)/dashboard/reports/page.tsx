import { getPermissionUserToReports } from "./_data-access/get-permission-reports";
import { auth } from "@/lib/auth";

export default async function Reports() {
  const session = await auth();
  const user = await getPermissionUserToReports({ userId: session?.user.id! });

  if (!user) {
    return (
      <div>
        {" "}
        Você não tem permissão para acessar essa página, assine o plano
        PROFESSIONAL
      </div>
    );
  }

  return <div>página de relatórios</div>;
}
