import { useMemo, useState } from "react";
import MetricCards from "../components/dashboard/MetricCards";
import StockHealth from "../components/dashboard/StockHealth";
import UrgentAlerts from "../components/dashboard/UrgentAlerts";
import FifoInventoryTable from "../components/dashboard/FifoInventoryTable";
import LossManagementSection from "../components/dashboard/LossManagementSection";
import CashFlowSummary from "../components/dashboard/CashFlowSummary";
import NewBatchModal from "../components/inventory/NewBatchModal";
import { batches as mockBatches } from "../data/mockData";
import type { InventoryBatch } from "../types/inventory";

function Dashboard() {
  const [batches, setBatches] = useState<InventoryBatch[]>(mockBatches);
  const [isNewBatchOpen, setIsNewBatchOpen] = useState(false);

  const alertBatches = useMemo(
    () =>
      batches.filter(
        (batch) =>
          batch.status === "critical" || batch.status === "attention"
      ),
    [batches]
  );

  function handleAddBatch(batch: InventoryBatch) {
    setBatches((current) => [...current, batch]);
    setIsNewBatchOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
              Painel operacional
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              HortiGestão PRO
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
              Estoque, validade, perdas e caixa em uma única operação.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsNewBatchOpen(true)}
            className="active:scale-[0.98] rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            + Novo lote
          </button>
        </div>

        <MetricCards batches={batches} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
          <div className="space-y-6">
            <UrgentAlerts batches={alertBatches} />
            <FifoInventoryTable batches={batches} />
          </div>

          <div className="space-y-6">
            <StockHealth batches={batches} />
            <CashFlowSummary />
          </div>
        </div>

        <div className="mt-6">
          <LossManagementSection />
        </div>
      </main>

      <NewBatchModal
        open={isNewBatchOpen}
        onClose={() => setIsNewBatchOpen(false)}
        onSubmit={handleAddBatch}
      />
    </div>
  );
}

export default Dashboard;




