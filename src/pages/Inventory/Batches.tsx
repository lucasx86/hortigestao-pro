import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/shared/PageHeader";
import { batches } from "../../data/mockData";
import {
  currency,
  expirationLabel,
  expirationStatus,
  formatDate,
} from "../../utils/format";

export default function Batches() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");

  const sorted = useMemo(() => {
    return batches
      .filter((batch) =>
        `${batch.product} ${batch.batchCode}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter((batch) => {
        if (filter === "todos") return true;
        return expirationStatus(batch.expirationDate) === filter;
      })
      .sort(
        (a, b) =>
          new Date(a.expirationDate).getTime() -
          new Date(b.expirationDate).getTime()
      );
  }, [search, filter]);

  return (
    <>
      <PageHeader
        title="Lotes e FIFO"
        description="Os lotes são automaticamente ordenados pela data de vencimento para priorizar os produtos mais próximos da validade."
      />

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar produto ou lote..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white"
          />

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold outline-none"
          >
            <option value="todos">Todos os lotes</option>
            <option value="critical">Críticos</option>
            <option value="attention">Atenção</option>
            <option value="normal">Normais</option>
            <option value="expired">Vencidos</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-4">Prioridade</th>
                <th className="px-5 py-4">Produto</th>
                <th className="px-5 py-4">Lote</th>
                <th className="px-5 py-4">Quantidade</th>
                <th className="px-5 py-4">Entrada</th>
                <th className="px-5 py-4">Validade</th>
                <th className="px-5 py-4">Custo</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {sorted.map((batch, index) => {
                const status = expirationStatus(batch.expirationDate);

                return (
                  <tr
                    key={batch.id}
                    className={`transition hover:bg-slate-50 ${
                      index === 0 ? "bg-rose-50/30" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          status === "critical" || status === "expired"
                            ? "rose"
                            : status === "attention"
                              ? "amber"
                              : "green"
                        }
                        pulse={status === "critical"}
                      >
                        {index === 0 ? "FIFO 01" : `FIFO ${String(index + 1).padStart(2, "0")}`}
                      </Badge>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-black text-slate-800">
                        {batch.product}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {batch.category}
                      </div>
                    </td>

                    <td className="px-5 py-4 font-mono text-xs font-bold text-slate-600">
                      {batch.batchCode}
                    </td>

                    <td className="px-5 py-4 font-black text-slate-800">
                      {batch.quantity} {batch.unit}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {formatDate(batch.entryDate)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-700">
                        {formatDate(batch.expirationDate)}
                      </div>

                      <div
                        className={`mt-1 text-xs font-black ${
                          status === "critical" || status === "expired"
                            ? "text-rose-600"
                            : status === "attention"
                              ? "text-amber-600"
                              : "text-emerald-600"
                        }`}
                      >
                        {expirationLabel(batch.expirationDate)}
                      </div>
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-700">
                      {currency(batch.unitCost)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {sorted.length === 0 && (
          <div className="p-12 text-center">
            <div className="font-black text-slate-700">
              Nenhum lote encontrado
            </div>
            <div className="mt-1 text-sm text-slate-400">
              Tente alterar os filtros.
            </div>
          </div>
        )}
      </Card>
    </>
  );
}
