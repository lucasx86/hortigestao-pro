import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import Card from "../ui/Card";
import { transactions } from "../../data/mockData";
import { formatCurrency } from "../../utils/currency";

function CashFlowSummary() {
  const income = transactions
    .filter((transaction) => transaction.type === "entrada")
    .reduce((sum, transaction) => sum + transaction.value, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "saida")
    .reduce((sum, transaction) => sum + transaction.value, 0);

  const balance = income - expense;

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Wallet size={20} />
        </div>

        <div>
          <h2 className="font-black text-slate-900">Fluxo de caixa</h2>
          <p className="text-xs text-slate-400">Resumo operacional</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Saldo
        </p>

        <p className="mt-1 text-3xl font-black text-slate-950">
          {formatCurrency(balance)}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-emerald-50 p-3">
          <div className="flex items-center gap-1 text-emerald-600">
            <ArrowUpRight size={15} />
            <span className="text-[10px] font-black uppercase">Entradas</span>
          </div>
          <p className="mt-2 text-sm font-black text-emerald-800">
            {formatCurrency(income)}
          </p>
        </div>

        <div className="rounded-xl bg-rose-50 p-3">
          <div className="flex items-center gap-1 text-rose-600">
            <ArrowDownRight size={15} />
            <span className="text-[10px] font-black uppercase">Saídas</span>
          </div>
          <p className="mt-2 text-sm font-black text-rose-800">
            {formatCurrency(expense)}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default CashFlowSummary;


