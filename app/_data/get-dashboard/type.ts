import { TransactionType, type TransactionCategory } from "@prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensesPerCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
