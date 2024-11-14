import { auth, clerkClient } from "@clerk/nextjs/server";
import { CheckIcon, XIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import AcquirePlanButton from "./_components/acquire-plan-button";
import BadgeActive from "./_components/badge-active";
import { getCountCurrentMonthTransactions } from "../_data/get-current-month-transactions";

const SubscriptionsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  const countCurrentMonthTransactions =
    await getCountCurrentMonthTransactions();

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <h1 className="font-bold text-2xl">Assinatura</h1>
        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {!hasPremiumPlan && <BadgeActive />}
              <h2 className="text-2xl font-semibold text-center">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="py-8 space-y-6">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês (
                  {countCurrentMonthTransactions < 10 ? (
                    <span className="text-primary">
                      {countCurrentMonthTransactions}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {countCurrentMonthTransactions}
                    </span>
                  )}
                  /10)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && <BadgeActive />}
              <h2 className="text-2xl font-semibold text-center">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold items-start flex">
                  19<span className="text-sm">,99</span>
                </span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="py-8 space-y-6">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionsPage;
