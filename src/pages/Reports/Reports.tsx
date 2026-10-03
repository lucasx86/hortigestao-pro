import { BarChart3, PackageSearch, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/shared/PageHeader";

const reports = [
  {
    title: "Relat�rio de estoque",
    description: "Quantidade, valor, produtos e situa��o dos lotes.",
    to: "/relatorios/estoque",
    icon: PackageSearch,
  },
  {
    title: "Relat�rio de perdas",
    description: "Causas, quantidade e impacto financeiro.",
    to: "/relatorios/perdas",
    icon: TriangleAlert,
  },
  {
    title: "Relat�rio financeiro",
    description: "Entradas, sa�das, saldo e evolu��o.",
    to: "/relatorios/financeiro",
    icon: BarChart3,
  },
];

export default function Reports() {
  return (
    <>
      <PageHeader
        title="Relat�rios"
        description="Transforme os dados operacionais em informa��es para tomada de decis�o."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <Link key={report.to} to={report.to}>
              <Card className="h-full p-5 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon size={20} />
                </div>

                <h2 className="mt-5 font-black text-slate-900">
                  {report.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {report.description}
                </p>

                <div className="mt-5 text-xs font-black text-emerald-600">
                  Abrir relat�rio ?
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

