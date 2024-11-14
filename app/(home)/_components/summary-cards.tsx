import {} from "@/app/_components/ui/card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import {} from "@/app/_lib/prisma";

interface SummaryCards {
  month: string;
  balance: number;
  depositsTotal: number;
  expensesTotal: number;
  investimentsTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  expensesTotal,
  investimentsTotal,
  userCanAddTransaction,
}: SummaryCards) => {
  return (
    <div className="space-y-6">
      {/* First card */}
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="lg"
        color="secondary"
        userCanAddTransaction={userCanAddTransaction}
      />

      {/* Other cards */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={
            <PiggyBankIcon
              size={16}
              className="w-9 h-9 p-2 bg-white bg-opacity-5 rounded-sm"
            />
          }
          title="Investidos"
          amount={investimentsTotal}
          size="sm"
          color="secondary"
        />
        <SummaryCard
          icon={
            <TrendingUpIcon
              size={16}
              className="text-[#55B02e] w-9 h-9 p-2 bg-white bg-opacity-5 rounded-sm"
            />
          }
          title="Receitas"
          amount={depositsTotal}
          size="sm"
          color="default"
        />
        <SummaryCard
          icon={
            <TrendingDownIcon
              size={16}
              className="text-[#E93030] w-9 h-9 p-2 bg-white bg-opacity-5 rounded-sm"
            />
          }
          title="Despesas"
          amount={expensesTotal}
          size="sm"
          color="default"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
