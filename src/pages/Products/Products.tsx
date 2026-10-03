import { useMemo, useState } from "react";
import { PackagePlus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/shared/PageHeader";
import { products } from "../../data/mockData";
import { currency } from "../../utils/format";

export default function Products() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      products.filter((product) =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <>
      <PageHeader
        title="Produtos"
        description="Cadastre produtos, defina estoque mínimo, custos, preços e unidades."
        action={
          <Link to="/produtos/novo">
            <Button>
              <PackagePlus size={17} />
              Novo produto
            </Button>
          </Link>
        }
      />

      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 p-4">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar produto..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-4">Produto</th>
                <th className="px-5 py-4">Categoria</th>
                <th className="px-5 py-4">Estoque</th>
                <th className="px-5 py-4">Custo médio</th>
                <th className="px-5 py-4">Preço venda</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => {
                const low = product.currentStock <= product.minimumStock;

                return (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="font-black text-slate-800">
                        {product.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        Código {product.id.toUpperCase()}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {product.category}
                    </td>

                    <td className="px-5 py-4 font-black text-slate-800">
                      {product.currentStock} {product.unit}
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-700">
                      {currency(product.averageCost)}
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-700">
                      {currency(product.salePrice)}
                    </td>

                    <td className="px-5 py-4">
                      <Badge variant={low ? "rose" : "green"}>
                        {low ? "Estoque baixo" : "Normal"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
