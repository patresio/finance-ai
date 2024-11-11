import {} from "@/app/_components/ui/card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCards {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCards) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );
  const investimentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );
  const balance = depositsTotal - investimentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      {/* First card */}
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="lg"
        color="secondary"
      />

      {/* Other cards */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investidos"
          amount={investimentsTotal}
          size="sm"
          color="secondary"
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-primary" />}
          title="Despesas"
          amount={expensesTotal}
          size="sm"
          color="default"
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-red-500" />}
          title="Receitas"
          amount={depositsTotal}
          size="sm"
          color="default"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
