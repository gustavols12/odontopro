import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid-plans";
import getSession from "@/lib/getSession";
import { getSubscription } from "@/utilis/get-subscription";
import { SubscriptionDetail } from "./_components/subscription-detail";

export default async function Plans() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const subscription = await getSubscription({ userId: session.user.id });
  return (
    <div>
      {subscription?.status !== "active" && <GridPlans />}

      {subscription?.status === "active" && (
        <SubscriptionDetail subscription={subscription!} />
      )}
    </div>
  );
}
