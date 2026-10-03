import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";
import type { InventoryBatch, InventoryUnit } from "../../types/inventory";
import { getFifoStatus } from "../../utils/dates";

interface NewBatchModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (batch: InventoryBatch) => void;
}

export default function NewBatchModal({
  open,
  onClose,
  onSubmit,
}: NewBatchModalProps) {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<InventoryUnit>("kg");
  const [entryDate, setEntryDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [supplier, setSupplier] = useState("");

  if (!open) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !product ||
      !category ||
      !batchCode ||
      !quantity ||
      !entryDate ||
      !expirationDate ||
      !unitCost ||
      !supplier
    ) {
      return;
    }

    const batch: InventoryBatch = {
      id: crypto.randomUUID(),
      productId: product.toLowerCase().replace(/\s+/g, "-"),
      product,
      category,
      batchCode,
      quantity: Number(quantity),
      unit,
      entryDate,
      expirationDate,
      unitCost: Number(unitCost),
      supplier,
      status: getFifoStatus(expirationDate),
    };

    onSubmit(batch);

    setProduct("");
    setCategory("");
    setBatchCode("");
    setQuantity("");
    setUnit("kg");
    setEntryDate("");
    setExpirationDate("");
    setUnitCost("");
    setSupplier("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Novo lote
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Cadastre a entrada de um novo lote no estoque.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Produto
              </label>
              <input
                value={product}
                onChange={(event) => setProduct(event.target.value)}
                placeholder="Ex.: Tomate Italiano"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Categoria
              </label>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Ex.: Frutas"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Código do lote
              </label>
              <input
                value={batchCode}
                onChange={(event) => setBatchCode(event.target.value)}
                placeholder="Ex.: TOM-261003"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Fornecedor
              </label>
              <input
                value={supplier}
                onChange={(event) => setSupplier(event.target.value)}
                placeholder="Nome do fornecedor"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Quantidade
              </label>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Unidade
              </label>
              <select
                value={unit}
                onChange={(event) =>
                  setUnit(event.target.value as InventoryUnit)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              >
                <option value="kg">Quilograma (kg)</option>
                <option value="un">Unidade (un)</option>
                <option value="cx">Caixa (cx)</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Data de entrada
              </label>
              <input
                type="date"
                value={entryDate}
                onChange={(event) => setEntryDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Data de validade
              </label>
              <input
                type="date"
                value={expirationDate}
                onChange={(event) => setExpirationDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Custo unitário
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={unitCost}
                onChange={(event) => setUnitCost(event.target.value)}
                placeholder="0,00"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Cadastrar lote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
