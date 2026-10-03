import { Trash2 } from "lucide-react";
import Card from "../ui/Card";
import { losses } from "../../data/mockData";
import { formatCurrency } from "../../utils/currency";

function LossManagementSection() {
  const total = losses.reduce((sum, loss) => sum + loss.value, 0);

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
            <Trash2 size={20} />
          </div>

          <div>
            <h2 className="font-black text-slate-900">Gestão de perdas</h2>
            <p className="text-xs text-slate-400">
              Produtos descartados e prejuízo
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Perda registrada
          </p>
          <p className="text-xl font-black text-rose-600">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[500px] text-left">
          <thead className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            <tr>
              <th className="py-3">Produto</th>
              <th className="py-3">Quantidade</th>
              <th className="py-3">Motivo</th>
              <th className="py-3">Valor</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {losses.map((loss) => (
              <tr key={loss.id}>
                <td className="py-3 text-sm font-black text-slate-700">
                  {loss.product}
                </td>

                <td className="py-3 text-sm text-slate-500">
                  {loss.quantity} {loss.unit}
                </td>

                <td className="py-3 text-sm text-slate-500">
                  {loss.reason}
                </td>

                <td className="py-3 text-sm font-black text-rose-600">
                  {formatCurrency(loss.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default LossManagementSection;


