import { AlertTriangle, ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import type { InventoryBatch } from "../../types/inventory";
import { getDaysUntilExpiration } from "../../utils/dates";

interface Props {
  batches: InventoryBatch[];
}

function UrgentAlerts({ batches }: Props) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={19} />
            <h2 className="font-black text-slate-900">Atenção necessária</h2>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Lotes próximos do vencimento
          </p>
        </div>

        <span className="text-xs font-black text-slate-400">
          {batches.length} alertas
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {batches.length === 0 ? (
          <p className="rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
            Nenhum lote requer atenção.
          </p>
        ) : (
          batches.slice(0, 4).map((batch) => {
            const days = getDaysUntilExpiration(batch.expirationDate);
            const critical = days <= 3;

            return (
              <div
                key={batch.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-800">
                    {batch.product}
                  </p>
                  <p className="text-xs text-slate-400">
                    Lote {batch.batchCode} · {batch.quantity} {batch.unit}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={critical ? "rose" : "amber"}>
                    {days <= 0 ? "Vencido" : `${days} dias`}
                  </Badge>

                  <ArrowRight size={15} className="text-slate-300" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

export default UrgentAlerts;
