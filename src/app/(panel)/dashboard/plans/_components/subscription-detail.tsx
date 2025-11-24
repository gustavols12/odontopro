"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Subscription } from "@/generated/prisma";
import { subscriptionPlans } from "@/utilis/plans/index";
import { createPortalCustomer } from "../_actions/create-portal-customer";
import { toast } from "sonner";

interface SubscriptionDetailProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  const subscriptionInfo = subscriptionPlans.find(
    (plan) => plan.id === subscription.plan
  );
  async function handleManegeSubscription() {
    const portal = await createPortalCustomer();

    if (portal.error) {
      toast.error("Ocorreu um erro ao criar portal de assinatura");
      return;
    }
    window.location.href = portal.sessionId;
  }
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Seu plano atual</CardTitle>
        <CardDescription>Sua assinatura está ativa</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg md:text-xl">
            {subscription.plan === "BASIC" ? "BASIC" : "PROFESSIONAL"}
          </h3>
          <Button className="bg-emerald-500 text-white hover:bg-emerald-400">
            {subscription.status === "active" ? "ATIVO" : "INATIVO"}
          </Button>
        </div>
        <ul className="list-disc list-inside space-y-2">
          {subscriptionInfo &&
            subscriptionInfo.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={handleManegeSubscription}>Gerenciar Assinatura</Button>
      </CardFooter>
    </Card>
  );
}
