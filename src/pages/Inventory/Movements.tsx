import { ArrowDown, ArrowUp, RefreshCcw, TriangleAlert } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/shared/PageHeader";
import { movements } from "../../data/mockData";
import { formatDate } from "../../utils/format";

export default function Movements() {
  return (
    <>
      <PageHeader
        title="Movimentações"
        description="Histórico de entradas, saídas, ajustes e perdas do estoque."
      />

      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 p-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="green">Entradas</Badge>
            <Badge variant="rose">Saídas</Badge>
            <Badge variant="amber">Perdas</Badge>
            <Badge variant="slate">Ajustes</Badge>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {movements.map((movement) => {
            const icon =
              movement.type === "entrada"
                ? ArrowUp
                : movement.type === "saida"
                  ? ArrowDown
                  : movement.type === "perda"
                    ? TriangleAlert
                    : RefreshCcw;

            const Icon = icon;

            return (
              <div
                key={movement.id}
                className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Icon size={18} />
                  </div>

                  <div>
                    <div className="font-black text-slate-800">
                      {movement.product}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {movement.description} · {movement.responsible}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-black text-slate-800">
                      {movement.quantity} {movement.unit}
                    </div>

                    <div className="text-xs text-slate-400">
                      {formatDate(movement.date)}
                    </div>
                  </div>

                  <Badge
                    variant={
                      movement.type === "entrada"
                        ? "green"
                        : movement.type === "perda"
                          ? "amber"
                          : movement.type === "saida"
                            ? "rose"
                            : "slate"
                    }
                  >
                    {movement.type}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
