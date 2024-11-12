import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import type {
  TotalExpensesPerCategory,
  TransactionPercentagePerType,
} from "./type";

export const getDashboard = async (month: string) => {
  // TODO: Implementar o filtro de ano
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

  const transactionTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum?.amount || 0,
  );

  const typePercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (depositsTotal / transactionTotal) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (expensesTotal / transactionTotal) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (investimentsTotal / transactionTotal) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensesPerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 10,
  });

  return {
    balance,
    depositsTotal,
    investimentsTotal,
    expensesTotal,
    typePercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
