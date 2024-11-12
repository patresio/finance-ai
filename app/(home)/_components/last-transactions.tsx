import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import { formatCurrency } from "@/app/_utils/currency";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transaction";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-[#55B02e]";
    }
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-[#E93030]";
    }
    return "text-white";
  };

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader>
        <div className="flex items-center justify-between font-bold border-b border-solid pb-6">
          <CardTitle className="font-bold">Ultimas transações</CardTitle>
          <div>
            <Button
              variant="outline"
              className="rounded-full font-bold"
              asChild
            >
              <Link href="/transactions">Ver mais</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {lastTransactions.map((transaction) => (
          <div
            className="flex justify-between items-center my-4"
            key={transaction.id}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white bg-opacity-[3%] rounded-lg">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  width={20}
                  height={20}
                  alt="PIX"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
