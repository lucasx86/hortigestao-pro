import { ShieldCheck } from "lucide-react";
import Card from "../ui/Card";
import type { InventoryBatch } from "../../types/inventory";

interface Props {
  batches: InventoryBatch[];
}

function StockHealth({ batches }: Props) {
  const total = batches.length;
  const ok = batches.filter((batch) => batch.status === "ok").length;
  const percentage = total ? Math.round((ok / total) * 100) : 0;

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <ShieldCheck size={20} />
        </div>

        <div>
          <h2 className="font-black text-slate-900">Saúde do estoque</h2>
          <p className="text-xs text-slate-400">Validade dos lotes</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-end justify-between">
          <span className="text-3xl font-black text-slate-950">
            {percentage}%
          </span>
          <span className="text-xs font-bold text-slate-400">
            {ok} de {total} lotes
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
}

export default StockHealth;
