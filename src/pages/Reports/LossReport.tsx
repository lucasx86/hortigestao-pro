import Card from "../../components/ui/Card";
import PageHeader from "../../components/shared/PageHeader";
import { losses } from "../../data/mockData";
import { currency } from "../../utils/format";

export default function LossReport() {
  const total = losses.reduce((sum, item) => sum + item.value, 0);

  return (
    <>
      <PageHeader
        title="Relatório de perdas"
        description="Análise dos desperdícios registrados no período."
      />

      <Card className="p-6">
        <div className="text-xs font-black uppercase tracking-wider text-slate-400">
          Impacto financeiro
        </div>

        <div className="mt-3 text-3xl font-black text-rose-600">
          {currency(total)}
        </div>

        <div className="mt-6 space-y-3">
          {losses.map((loss) => (
            <div
              key={loss.id}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
            >
              <div className="font-bold text-slate-700">{loss.product}</div>
              <div className="font-black text-rose-600">
                {currency(loss.value)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
