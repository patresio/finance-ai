"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const handleMonthChange = (month: string) => {
    push(`/?month=${month}&year=2024`);
    // TODO: Implementar o filtro de ano
    // /?year=${year}&month=${month}
    /*
     Selecionar o ano primeiro com o select do mes estando em estado desativado
     depois selecionar o mes
    */
  };

  return (
    <div className="flex gap-2 w-[400px]">
      <Select
        onValueChange={(value) => handleMonthChange(value)}
        defaultValue={month || ""}
      >
        <SelectTrigger className="w-[180px] rounded-full">
          <SelectValue placeholder="Selecione um mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue={year || ""}>
        <SelectTrigger className="w-[180px] rounded-full">
          <SelectValue placeholder="Selecione um ano" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2024">2024</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelect;
