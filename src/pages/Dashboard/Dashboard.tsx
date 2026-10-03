import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  CircleDollarSign,
  PackageSearch,
  TriangleAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/shared/PageHeader";
import { batches, losses, products, transactions } from "../../data/mockData";
import { currency, expirationLabel, expirationStatus } from "../../utils/format";

export default function Dashboard() {
  const stockValue = products.reduce(
    (sum, product) => sum + product.currentStock * product.averageCost,
    0
  );

  const criticalBatches = batches.filter(
    (batch) =>
      expirationStatus(batch.expirationDate) === "critical" ||
      expirationStatus(batch.expirationDate) === "expired"
  );

  const lowStock = products.filter(
    (product) => product.currentStock <= product.minimumStock
  );

  const entries = transactions
    .filter((transaction) => transaction.type === "entrada")
    .reduce((sum, transaction) => sum + transaction.value, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "saida")
    .reduce((sum, transaction) => sum + transaction.value, 0);

  const totalLoss = losses.reduce((sum, loss) => sum + loss.value, 0);

  return (
    <>
      <PageHeader
        title="Visão geral"
        description="Acompanhe estoque, validade, perdas e resultado financeiro em um único lugar."
        action={
          <Link
            to="/estoque/lotes"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            <PackageSearch size={17} />
            Ver FIFO
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          title="Valor em estoque"
          value={currency(stockValue)}
          icon={Boxes}
          detail="+8,4% este mês"
          positive
        />

        <Metric
          title="Entradas"
          value={currency(entries)}
          icon={ArrowUpRight}
          detail="Período atual"
          positive
        />

        <Metric
          title="Saídas"
          value={currency(expenses)}
          icon={ArrowDownRight}
          detail="Custos registrados"
        />

        <Metric
          title="Perdas"
          value={currency(totalLoss)}
          icon={TriangleAlert}
          detail={`${losses.length} ocorrências`}
          danger
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-black text-slate-900">
                Alertas de validade
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Produtos que precisam de ação
              </p>
            </div>

            <Badge variant="rose" pulse>
              {criticalBatches.length} críticos
            </Badge>
          </div>

          <div className="divide-y divide-slate-100">
            {criticalBatches.map((batch) => {
              const status = expirationStatus(batch.expirationDate);

              return (
                <div
                  key={batch.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-black text-slate-800">
                      {batch.product}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      Lote {batch.batchCode} · {batch.quantity}
                      {batch.unit}
                    </div>
                  </div>

                  <Badge variant={status === "expired" ? "rose" : "amber"}>
                    {expirationLabel(batch.expirationDate)}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <CircleDollarSign size={21} />
            </div>

            <div>
              <h2 className="font-black text-slate-900">
                Resultado operacional
              </h2>
              <p className="text-xs text-slate-400">
                Entradas menos saídas
              </p>
            </div>
          </div>

          <div className="mt-6 text-3xl font-black tracking-tight text-slate-900">
            {currency(entries - expenses)}
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, (entries / Math.max(entries + expenses, 1)) * 100)
                )}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs font-bold text-slate-400">
            <span>Entradas</span>
            <span>Saídas</span>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-slate-900">
                Estoque abaixo do mínimo
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Produtos que podem exigir reposição
              </p>
            </div>

            <Link
              to="/produtos"
              className="text-xs font-black text-emerald-600 hover:text-emerald-700"
            >
              Ver produtos
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {lowStock.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
              >
                <div>
                  <div className="text-sm font-black text-slate-800">
                    {product.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    Mínimo: {product.minimumStock}
                    {product.unit}
                  </div>
                </div>

                <Badge variant="rose">
                  {product.currentStock}
                  {product.unit}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Boxes size={21} />
            </div>

            <div>
              <h2 className="font-black text-slate-900">
                Saúde do estoque
              </h2>
              <p className="text-xs text-slate-400">
                Indicadores automáticos
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Health
              label="Normal"
              value={batches.filter(
                (batch) => expirationStatus(batch.expirationDate) === "normal"
              ).length}
              variant="green"
            />

            <Health
              label="Atenção"
              value={batches.filter(
                (batch) =>
                  expirationStatus(batch.expirationDate) === "attention"
              ).length}
              variant="amber"
            />

            <Health
              label="Crítico"
              value={criticalBatches.length}
              variant="rose"
            />
          </div>
        </Card>
      </div>
    </>
  );
}

function Metric({
  title,
  value,
  icon: Icon,
  detail,
  positive = false,
  danger = false,
}: {
  title: string;
  value: string;
  icon: typeof Boxes;
  detail: string;
  positive?: boolean;
  danger?: boolean;
}) {
  return (
    <Card className="p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
            {title}
          </div>
          <div
            className={`mt-3 text-2xl font-black tracking-tight ${
              danger ? "text-rose-600" : "text-slate-900"
            }`}
          >
            {value}
          </div>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={19} />
        </div>
      </div>

      <div
        className={`mt-4 text-xs font-bold ${
          positive ? "text-emerald-600" : danger ? "text-rose-500" : "text-slate-400"
        }`}
      >
        {detail}
      </div>
    </Card>
  );
}

function Health({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: "green" | "amber" | "rose";
}) {
  const styles = {
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
  };

  return (
    <div className={`rounded-xl p-4 ${styles[variant]}`}>
      <div className="text-xs font-black uppercase tracking-wider">
        {label}
      </div>
      <div className="mt-2 text-2xl font-black">{value}</div>
    </div>
  );
}
