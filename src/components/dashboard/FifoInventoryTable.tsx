import { ArrowUpDown, PackageSearch } from "lucide-react";
import { useMemo, useState } from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import type { InventoryBatch } from "../../types/inventory";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/dates";

interface Props {
  batches: InventoryBatch[];
}

function FifoInventoryTable({ batches }: Props) {
  const [search, setSearch] = useState("");

  const sorted = useMemo(() => {
    return [...batches]
      .filter((batch) =>
        `${batch.product} ${batch.batchCode} ${batch.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(a.expirationDate).getTime() -
          new Date(b.expirationDate).getTime()
      );
  }, [batches, search]);

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-slate-100 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="text-emerald-600" size={18} />
              <h2 className="font-black text-slate-900">
                Estoque FIFO
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Primeiro a vencer, primeiro a sair
            </p>
          </div>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar produto ou lote..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 sm:w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-3">Produto</th>
              <th className="px-5 py-3">Lote</th>
              <th className="px-5 py-3">Quantidade</th>
              <th className="px-5 py-3">Entrada</th>
              <th className="px-5 py-3">Validade</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Custo</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {sorted.map((batch) => (
              <tr key={batch.id} className="transition hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <div className="font-black text-slate-800">
                    {batch.product}
                  </div>
                  <div className="text-xs text-slate-400">
                    {batch.category}
                  </div>
                </td>

                <td className="px-5 py-4 text-sm font-bold text-slate-600">
                  {batch.batchCode}
                </td>

                <td className="px-5 py-4 text-sm font-black text-slate-800">
                  {batch.quantity} {batch.unit}
                </td>

                <td className="px-5 py-4 text-xs font-medium text-slate-500">
                  {formatDate(batch.entryDate)}
                </td>

                <td className="px-5 py-4 text-xs font-black text-slate-700">
                  {formatDate(batch.expirationDate)}
                </td>

                <td className="px-5 py-4">
                  {batch.status === "critical" && (
                    <Badge variant="rose">Crítico</Badge>
                  )}

                  {batch.status === "attention" && (
                    <Badge variant="amber">Atenção</Badge>
                  )}

                  {batch.status === "ok" && (
                    <Badge variant="green">Saudável</Badge>
                  )}
                </td>

                <td className="px-5 py-4 text-sm font-black text-slate-800">
                  {formatCurrency(batch.unitCost)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
            <PackageSearch className="text-slate-300" size={32} />
            <p className="mt-3 text-sm font-bold text-slate-500">
              Nenhum lote encontrado.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default FifoInventoryTable;
