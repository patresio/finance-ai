import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transaction-pie-chart";
import { getDashboard } from "../_data/get-dashboard";

interface HomeParams {
  searchParams: {
    month: string;
    year: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeParams) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  //  CONSOLE LOG PARA TESTES DE ANO
  console.log({ month, year });
  // Current month
  const monthCurrent = new Date().getMonth() + 1;
  const yearCurrent = new Date().getFullYear();

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${monthCurrent}&year=${yearCurrent}`);
  }

  const dashboard = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards month={month} {...dashboard} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionPieChart {...dashboard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
