import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {} from "@/app/_data/can-user-add-transaction";
import {} from "@radix-ui/react-select";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size: "sm" | "lg";
  color: "default" | "secondary";
  userCanAddTransaction?: boolean;
}

const SummaryCard = async ({
  icon,
  title,
  amount,
  size,
  color,
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <Card className={`${color === "secondary" ? "bg-white bg-opacity-5" : ""}`}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === "sm" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`${size === "sm" ? "text-2xl font-bold" : "text-4xl font-bold"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
        {size === "lg" && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
