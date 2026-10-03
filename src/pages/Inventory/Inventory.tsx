import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  PackageSearch,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/shared/PageHeader";
import { batches, products } from "../../data/mockData";
import { currency, expirationLabel, expirationStatus } from "../../utils/format";

export default function Inventory() {
  const totalItems = products.reduce((sum, product) => sum + product.currentStock, 0);
  const totalValue = products.reduce(
    (sum, product) => sum + product.currentStock * product.averageCost,
    0
  );

  return (
    <>
      <PageHeader
        title="Estoque"
        description="Controle de quantidade, valor, entradas, sa�das e disponibilidade dos produtos."
        action={
          <Link to="/estoque/lotes">
            <Button>
              <PackageSearch size={17} />
              Gerenciar FIFO
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Boxes} label="Itens em estoque" value={String(totalItems)} />
        <Stat icon={Boxes} label="Valor do estoque" value={currency(totalValue)} />
        <Stat icon={ArrowUpFromLine} label="Entradas" value="195" />
        <Stat icon={ArrowDownToLine} label="Sa�das" value="74" />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-black text-slate-900">Produtos em estoque</h2>
          <p className="mt-1 text-xs text-slate-400">
            Acompanhe disponibilidade e estoque m�nimo.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-4">Produto</th>
                <th className="px-5 py-4">Categoria</th>
                <th className="px-5 py-4">Estoque</th>
                <th className="px-5 py-4">M�nimo</th>
                <th className="px-5 py-4">Custo m�dio</th>
                <th className="px-5 py-4">Valor</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.map((product) => {
                const low = product.currentStock <= product.minimumStock;

                return (
                  <tr key={product.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-800">{product.name}</div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {product.category}
                    </td>

                    <td className="px-5 py-4 font-black text-slate-800">
                      {product.currentStock} {product.unit}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {product.minimumStock} {product.unit}
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-slate-700">
                      {currency(product.averageCost)}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-slate-800">
                      {currency(product.currentStock * product.averageCost)}
                      {low && (
                        <div className="mt-1 text-[10px] font-black uppercase text-rose-500">
                          Reposi��o necess�ria
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <h2 className="font-black text-slate-900">Pr�ximos vencimentos</h2>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {batches
            .slice()
            .sort(
              (a, b) =>
                new Date(a.expirationDate).getTime() -
                new Date(b.expirationDate).getTime()
            )
            .slice(0, 6)
            .map((batch) => {
              const status = expirationStatus(batch.expirationDate);

              return (
                <div
                  key={batch.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-black text-slate-800">
                        {batch.product}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {batch.quantity} {batch.unit}
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
                        status === "critical"
                          ? "bg-rose-50 text-rose-600"
                          : status === "attention"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {expirationLabel(batch.expirationDate)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>

      <div className="mt-6">
        <Link
          to="/estoque/movimentacoes"
          className="text-sm font-black text-emerald-600"
        >
          Ver todas as movimenta��es ?
        </Link>
      </div>
    </>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Boxes;
  label: string;
  value: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon size={19} />
        </div>

        <div>
          <div className="text-xs font-bold text-slate-400">{label}</div>
          <div className="mt-1 text-xl font-black text-slate-900">{value}</div>
        </div>
      </div>
    </Card>
  );
}

