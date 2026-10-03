import { useState } from "react";
import type { FormEvent } from "react";


import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/shared/PageHeader";

export default function ProductForm() {
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);

    setTimeout(() => {
      navigate("/produtos");
    }, 700);
  }

  return (
    <>
      <PageHeader
        title="Novo produto"
        description="Cadastre as informa��es utilizadas pelo estoque e pelo financeiro."
        action={
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-sm font-black text-slate-500"
          >
            <ArrowLeft size={17} />
            Voltar
          </Link>
        }
      />

      <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <Card className="p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nome do produto" placeholder="Ex.: Tomate Italiano" />
            <Field label="C�digo interno" placeholder="TOM-001" />

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                Categoria
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400">
                <option>Frutas</option>
                <option>Verduras</option>
                <option>Legumes</option>
                <option>Tub�rculos</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                Unidade
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400">
                <option>kg</option>
                <option>un</option>
                <option>cx</option>
              </select>
            </div>

            <Field label="Estoque m�nimo" type="number" placeholder="30" />
            <Field label="Pre�o de venda" type="number" placeholder="8.99" />
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={saved}>
              <Save size={17} />
              {saved ? "Salvando..." : "Salvar produto"}
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-black uppercase tracking-wider text-emerald-600">
            Automa��o
          </div>

          <h2 className="mt-2 text-lg font-black text-slate-900">
            O sistema cuidar� dos c�lculos
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Depois que o produto for utilizado em entradas de estoque,
            o sistema poder� calcular automaticamente custo m�dio, valor
            em estoque, necessidade de reposi��o e impacto das perdas.
          </p>

          <div className="mt-5 space-y-2 text-sm font-bold text-slate-600">
            <div>? Estoque m�nimo</div>
            <div>? Custo m�dio autom�tico</div>
            <div>? Alertas de reposi��o</div>
            <div>? Integra��o com FIFO</div>
          </div>
        </Card>
      </form>
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/5"
      />
    </div>
  );
}






