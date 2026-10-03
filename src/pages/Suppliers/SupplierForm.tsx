import { ArrowLeft, Save, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/shared/PageHeader";

export default function SupplierForm() {
  return (
    <>
      <PageHeader
        title="Novo fornecedor"
        description="Cadastre os dados do fornecedor para relacioná-lo aos lotes e compras."
        action={
          <Link
            to="/fornecedores"
            className="inline-flex items-center gap-2 text-sm font-black text-slate-500"
          >
            <ArrowLeft size={17} />
            Voltar
          </Link>
        }
      />

      <Card className="max-w-4xl p-5 md:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Truck size={20} />
          </div>

          <div>
            <h2 className="font-black text-slate-900">
              Dados cadastrais
            </h2>
            <p className="text-xs text-slate-400">
              Informações principais
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nome / Razão social" placeholder="Fornecedor Ltda." />
          <Field label="CNPJ" placeholder="00.000.000/0001-00" />
          <Field label="Telefone" placeholder="(86) 99999-9999" />
          <Field label="E-mail" placeholder="contato@fornecedor.com" />
          <Field label="Cidade" placeholder="Teresina" />
          <Field label="Estado" placeholder="PI" />
        </div>

        <div className="mt-6 flex justify-end">
          <Button>
            <Save size={17} />
            Salvar fornecedor
          </Button>
        </div>
      </Card>
    </>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400"
      />
    </div>
  );
}
