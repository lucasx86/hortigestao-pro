import { ArrowDownRight, ArrowUpRight, WalletCards } from "lucide-react";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/shared/PageHeader";
import { transactions } from "../../data/mockData";
import { currency } from "../../utils/format";

export default function CashFlow() {
  const income = transactions
    .filter((item) => item.type === "entrada")
    .reduce((sum, item) => sum + item.value, 0);

  const expenses = transactions
    .filter((item) => item.type === "saida")
    .reduce((sum, item) => sum + item.value, 0);

  return (
    <>
      <PageHeader
        title="Fluxo de caixa"
        description="Visualize a movimentação financeira e o resultado operacional."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <ArrowUpRight className="text-emerald-600" />
          <div className="mt-5 text-xs font-black uppercase tracking-wider text-slate-400">
            Total recebido
          </div>
          <div className="mt-2 text-2xl font-black">
            {currency(income)}
          </div>
        </Card>

        <Card className="p-5">
          <ArrowDownRight className="text-rose-600" />
          <div className="mt-5 text-xs font-black uppercase tracking-wider text-slate-400">
            Total gasto
          </div>
          <div className="mt-2 text-2xl font-black">
            {currency(expenses)}
          </div>
        </Card>

        <Card className="p-5">
          <WalletCards className="text-blue-600" />
          <div className="mt-5 text-xs font-black uppercase tracking-wider text-slate-400">
            Saldo
          </div>
          <div className="mt-2 text-2xl font-black">
            {currency(income - expenses)}
          </div>
        </Card>
      </div>
    </>
  );
}
