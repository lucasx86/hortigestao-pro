import { AlertTriangle, Boxes, CircleDollarSign, HeartPulse } from "lucide-react";
import Card from "../ui/Card";
import type { InventoryBatch } from "../../types/inventory";
import { formatCurrency } from "../../utils/currency";

interface Props {
  batches: InventoryBatch[];
}

function MetricCards({ batches }: Props) {
  const totalQuantity = batches.reduce((sum, batch) => sum + batch.quantity, 0);
  const investment = batches.reduce(
    (sum, batch) => sum + batch.quantity * batch.unitCost,
    0
  );

  const critical = batches.filter((batch) => batch.status === "critical").length;

  const health = Math.max(
    0,
    Math.round(
      ((batches.length - critical) / Math.max(batches.length, 1)) * 100
    )
  );

  const metrics = [
    {
      label: "Volume em estoque",
      value: `${totalQuantity.toLocaleString("pt-BR")} un/kg`,
      icon: Boxes,
      detail: `${batches.length} lotes ativos`,
    },
    {
      label: "Investimento",
      value: formatCurrency(investment),
      icon: CircleDollarSign,
      detail: "Custo atual estimado",
    },
    {
      label: "Lotes críticos",
      value: String(critical).padStart(2, "0"),
      icon: AlertTriangle,
      detail: "Ação necessária",
    },
    {
      label: "Saúde do estoque",
      value: `${health}%`,
      icon: HeartPulse,
      detail: "Dentro do prazo",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <Card key={metric.label} className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {metric.label}
                </p>

                <p className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                  {metric.value}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {metric.detail}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon size={19} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default MetricCards;
