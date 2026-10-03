import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/shared/PageHeader";
import { transactions } from "../../data/mockData";
import { currency, formatDate } from "../../utils/format";

export default function Finance() {
  const income = transactions
    .filter((item) => item.type === "entrada")
    .reduce((sum, item) => sum + item.value, 0);

  const expenses = transactions
    .filter((item) => item.type === "saida")
    .reduce((sum, item) => sum + item.value, 0);

  const balance = income - expenses;

  return (
    <>
      <PageHeader
        title="Financeiro"
        description="Acompanhe entradas, despesas, saldo e movimentações financeiras."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <FinancialCard
          title="Entradas"
          value={income}
          icon={ArrowUpRight}
          variant="green"
        />

        <FinancialCard
          title="Saídas"
          value={expenses}
          icon={ArrowDownRight}
          variant="rose"
        />

        <FinancialCard
          title="Resultado"
          value={balance}
          icon={CircleDollarSign}
          variant="blue"
        />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-black text-slate-900">
            Últimas movimentações
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="font-black text-slate-800">
                  {transaction.description}
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  {transaction.category} · {formatDate(transaction.date)}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    transaction.type === "entrada" ? "green" : "rose"
                  }
                >
                  {transaction.type}
                </Badge>

                <div
                  className={`font-black ${
                    transaction.type === "entrada"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {transaction.type === "entrada" ? "+" : "-"}
                  {currency(transaction.value)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function FinancialCard({
  title,
  value,
  icon: Icon,
  variant,
}: {
  title: string;
  value: number;
  icon: typeof ArrowUpRight;
  variant: "green" | "rose" | "blue";
}) {
  const styles = {
    green: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
            {title}
          </div>

          <div className="mt-3 text-2xl font-black text-slate-900">
            {currency(value)}
          </div>
        </div>

        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles[variant]}`}>
          <Icon size={20} />
        </div>
      </div>
    </Card>
  );
}
