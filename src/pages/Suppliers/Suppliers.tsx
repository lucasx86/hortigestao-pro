import { Truck, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/shared/PageHeader";
import { suppliers } from "../../data/mockData";

export default function Suppliers() {
  return (
    <>
      <PageHeader
        title="Fornecedores"
        description="Centralize fornecedores e acompanhe quem abastece cada produto."
        action={
          <Link to="/fornecedores/novo">
            <Button>
              <UserPlus size={17} />
              Novo fornecedor
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((supplier) => (
          <Card
            key={supplier.id}
            className="p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Truck size={20} />
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-700">
                Ativo
              </span>
            </div>

            <h2 className="mt-5 font-black text-slate-900">
              {supplier.name}
            </h2>

            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <div>{supplier.document}</div>
              <div>{supplier.phone}</div>
              <div>{supplier.email}</div>
              <div>{supplier.city}</div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <button className="text-xs font-black text-emerald-600">
                Ver histórico →
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
