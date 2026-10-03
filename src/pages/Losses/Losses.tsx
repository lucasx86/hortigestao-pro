import { useState } from "react";
import { Plus, TriangleAlert } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/shared/PageHeader";
import { losses } from "../../data/mockData";
import { currency, formatDate } from "../../utils/format";

export default function Losses() {
  const [showForm, setShowForm] = useState(false);

  const total = losses.reduce((sum, loss) => sum + loss.value, 0);

  return (
    <>
      <PageHeader
        title="Perdas"
        description="Registre desperdícios e acompanhe o impacto financeiro de cada ocorrência."
        action={
          <Button onClick={() => setShowForm((value) => !value)}>
            <Plus size={17} />
            Registrar perda
          </Button>
        }
      />

      {showForm && (
        <Card className="mb-6 border-rose-200 bg-rose-50/30 p-5">
          <div className="flex items-center gap-3">
            <TriangleAlert className="text-rose-600" size={20} />
            <div>
              <h2 className="font-black text-slate-900">
                Registrar nova perda
              </h2>
              <p className="text-xs text-slate-500">
                O registro poderá gerar automaticamente uma movimentação de estoque.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <input
              placeholder="Produto"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            />

            <input
              type="number"
              placeholder="Quantidade"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            />

            <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Validade</option>
              <option>Avaria</option>
              <option>Deterioração</option>
              <option>Furto</option>
              <option>Descarte</option>
            </select>

            <Button>Confirmar</Button>
          </div>
        </Card>
      )}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
            Valor perdido
          </div>
          <div className="mt-3 text-2xl font-black text-rose-600">
            {currency(total)}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
            Ocorrências
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">
            {losses.length}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
            Principal causa
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">
            Validade
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-4">Produto</th>
                <th className="px-5 py-4">Quantidade</th>
                <th className="px-5 py-4">Motivo</th>
                <th className="px-5 py-4">Data</th>
                <th className="px-5 py-4">Impacto</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {losses.map((loss) => (
                <tr key={loss.id}>
                  <td className="px-5 py-4 font-black text-slate-800">
                    {loss.product}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {loss.quantity} {loss.unit}
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant="rose">{loss.reason}</Badge>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {formatDate(loss.date)}
                  </td>

                  <td className="px-5 py-4 font-black text-rose-600">
                    {currency(loss.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
