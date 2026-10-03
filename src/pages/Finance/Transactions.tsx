import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/shared/PageHeader";
import { transactions } from "../../data/mockData";
import { currency, formatDate } from "../../utils/format";

export default function Transactions() {
  return (
    <>
      <PageHeader
        title="Entradas e saídas"
        description="Controle todas as movimentações financeiras do negócio."
      />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-4">Descrição</th>
                <th className="px-5 py-4">Categoria</th>
                <th className="px-5 py-4">Data</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Valor</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          transaction.type === "entrada"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {transaction.type === "entrada" ? (
                          <ArrowUpRight size={17} />
                        ) : (
                          <ArrowDownRight size={17} />
                        )}
                      </div>

                      <span className="font-black text-slate-800">
                        {transaction.description}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {transaction.category}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {formatDate(transaction.date)}
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      variant={
                        transaction.status === "pago" ? "green" : "amber"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </td>

                  <td
                    className={`px-5 py-4 font-black ${
                      transaction.type === "entrada"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {currency(transaction.value)}
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
