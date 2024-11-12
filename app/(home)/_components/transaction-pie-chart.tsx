"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import type { TransactionPercentagePerType } from "@/app/_data/get-dashboard/type";

const chartConfig = {
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
    icon: () => (
      <TrendingDownIcon
        className="text-[#E93030] w-9 h-9 p-2 bg-white bg-opacity-[3%] rounded-lg"
        size={16}
      />
    ),
  },
  [TransactionType.DEPOSIT]: {
    label: "Receitas",
    color: "#55B02e",
    icon: () => (
      <TrendingUpIcon
        className="text-[#55B02e] w-9 h-9 p-2 bg-white bg-opacity-[3%] rounded-lg"
        size={16}
      />
    ),
  },
  [TransactionType.INVESTMENT]: {
    label: "Investimentos",
    color: "#FFF",
    icon: () => (
      <PiggyBankIcon
        className="text-white w-9 h-9 p-2 bg-white bg-opacity-[3%] rounded-lg"
        size={16}
      />
    ),
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  typePercentage: TransactionPercentagePerType;
  depositsTotal: number;
  expensesTotal: number;
  investimentsTotal: number;
}

const TransactionPieChart = ({
  depositsTotal,
  expensesTotal,
  investimentsTotal,
  typePercentage,
}: TransactionPieChartProps) => {
  const chartData = [
    {
      type: chartConfig.DEPOSIT.label,
      amount: depositsTotal,
      fill: chartConfig.DEPOSIT.color,
      icon: chartConfig.DEPOSIT.icon,
      perc: typePercentage[TransactionType.DEPOSIT],
    },
    {
      type: chartConfig.EXPENSE.label,
      amount: expensesTotal,
      fill: chartConfig.EXPENSE.color,
      icon: chartConfig.EXPENSE.icon,
      perc: typePercentage[TransactionType.EXPENSE],
    },
    {
      type: chartConfig.INVESTMENT.label,
      amount: investimentsTotal,
      fill: chartConfig.INVESTMENT.color,
      icon: chartConfig.INVESTMENT.icon,
      perc: typePercentage[TransactionType.INVESTMENT],
    },
  ];

  return (
    <Card className="flex flex-col p-7">
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="space-y-3">
        {chartData.map((item) => (
          <div key={item.type} className="flex items-center justify-between">
            <div className="flex space-x-4 items-center">
              <item.icon />
              <p className="text-sm text-muted-foreground">{item.type}</p>
            </div>
            <p className="text-sm font-bold">{item.perc}%</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionPieChart;
