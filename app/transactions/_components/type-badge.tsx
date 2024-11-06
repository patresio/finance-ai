import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted text-primary font-bold hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={8} />
        Ganho
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="font-bold text-danger bg-danger bg-opacity-10 hover:bg-danger hover:bg-opacity-10">
        <CircleIcon className="mr-2 fill-danger" size={8} />
        Gasto
      </Badge>
    );
  }
  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="font-bold text-white bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-10">
        <CircleIcon className="mr-2 fill-white" size={8} />
        Investimento
      </Badge>
    );
  }
  return "Erro";
};

export default TransactionTypeBadge;
