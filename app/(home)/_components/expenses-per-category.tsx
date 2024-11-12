import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { TotalExpensesPerCategory } from "../../_data/get-dashboard/type";
import { Progress } from "@/app/_components/ui/progress";
import { TRANSACTION_CATEGORY_LABELS } from "../../_constants/transaction";

interface ExpensePerCategoryProps {
  expensesPerCategory: TotalExpensesPerCategory[];
}

const ExpensePerCategory = ({
  expensesPerCategory,
}: ExpensePerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 rounded-md border pb-6 h-full">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por categoria</CardTitle>
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
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensePerCategory;
