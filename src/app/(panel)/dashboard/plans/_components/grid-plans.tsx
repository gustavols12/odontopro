import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/utilis/plans/index";

export function GridPlans() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {subscriptionPlans.map((plan, index) => (
        <Card key={plan.id} className="flex flex-col w-full mx-auto p-0">
          {index == 1 && (
            <div className="bg-emerald-500 py-3 text-center rounded-t-xl">
              <p className="font-semibold text-white">PROMOÇÃO EXCLUSIVA</p>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index} className="text-sm md:text-base">
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <p className="text-gray-600 line-through">{plan.odlPrice}</p>
              <p className="text-black text-2xl font-bold">{plan.price}</p>
            </div>
          </CardContent>
          <CardFooter className="mb-2">
            <Button
              className={
                index === 1
                  ? "w-full bg-emerald-500 hover:bg-emerald-400"
                  : "bg-black w-full"
              }
            >
              Ativar assinatura
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
