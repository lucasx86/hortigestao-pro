import Card from "../../components/ui/Card";
import PageHeader from "../../components/shared/PageHeader";
import { transactions } from "../../data/mockData";
import { currency } from "../../utils/format";

export default function FinanceReport() {
  const income = transactions
    .filter((item) => item.type === "entrada")
    .reduce((sum, item) => sum + item.value, 0);

  const expenses = transactions
    .filter((item) => item.type === "saida")
    .reduce((sum, item) => sum + item.value, 0);

  return (
    <>
      <PageHeader
        title="Relatório financeiro"
        description="Resumo das movimentações financeiras do período."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
            Entradas
          </div>
          <div className="mt-3 text-2xl font-black text-emerald-600">
            {currency(income)}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
            Saídas
          </div>
          <div className="mt-3 text-2xl font-black text-rose-600">
            {currency(expenses)}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
            Resultado
          </div>
          <div className="mt-3 text-2xl font-black">
            {currency(income - expenses)}
          </div>
        </Card>
      </div>
    </>
  );
}
