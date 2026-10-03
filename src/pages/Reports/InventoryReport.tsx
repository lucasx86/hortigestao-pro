import Card from "../../components/ui/Card";
import PageHeader from "../../components/shared/PageHeader";
import { batches, products } from "../../data/mockData";
import { currency, expirationLabel, expirationStatus } from "../../utils/format";

export default function InventoryReport() {
  const total = products.reduce(
    (sum, product) => sum + product.currentStock * product.averageCost,
    0
  );

  return (
    <>
      <PageHeader
        title="Relatório de estoque"
        description="Visão consolidada do estoque atual e dos lotes."
      />

      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              Produtos
            </div>
            <div className="mt-2 text-2xl font-black">{products.length}</div>
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              Lotes
            </div>
            <div className="mt-2 text-2xl font-black">{batches.length}</div>
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              Valor
            </div>
            <div className="mt-2 text-2xl font-black">{currency(total)}</div>
          </div>
        </div>
      </Card>

      <Card className="mt-6 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <div className="font-black">{batch.product}</div>
                <div className="text-xs text-slate-400">
                  {batch.batchCode}
                </div>
              </div>

              <div className="text-right">
                <div className="font-black">
                  {batch.quantity} {batch.unit}
                </div>
                <div
                  className={`text-xs font-bold ${
                    expirationStatus(batch.expirationDate) === "critical"
                      ? "text-rose-600"
                      : "text-slate-400"
                  }`}
                >
                  {expirationLabel(batch.expirationDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
