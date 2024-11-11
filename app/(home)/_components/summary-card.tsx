import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {} from "@radix-ui/react-select";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size: "sm" | "lg";
  color: "default" | "secondary";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size,
  color,
}: SummaryCardProps) => {
  return (
    <Card
      className={`h-full ${color === "secondary" ? "bg-zinc-900" : "bg-default"}`}
    >
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
        {size === "lg" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
