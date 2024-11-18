import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { TRANSACTION_CATEGORY_LABELS } from "../../_constants/transaction";
import type { TotalExpensePerCategory } from "@/app/_data/get-dashboard/type";

interface ExpensePerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensePerCategory = ({
  expensesPerCategory,
}: ExpensePerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 rounded-md border pb-6 h-full">
      <CardHeader>
        <CardTitle className="font-bold border-b border-solid pb-6">
          Gastos por categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2 mb-6">
            <div className="flex justify-between w-full">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        )) || <p>Carregando...</p>}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensePerCategory;
