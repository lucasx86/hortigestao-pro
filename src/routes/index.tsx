import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

import Dashboard from "../pages/Dashboard/Dashboard";

import Inventory from "../pages/Inventory/Inventory";
import Batches from "../pages/Inventory/Batches";
import Movements from "../pages/Inventory/Movements";

import Products from "../pages/Products/Products";
import ProductForm from "../pages/Products/ProductForm";

import Suppliers from "../pages/Suppliers/Suppliers";
import SupplierForm from "../pages/Suppliers/SupplierForm";

import Losses from "../pages/Losses/Losses";

import Finance from "../pages/Finance/Finance";
import Transactions from "../pages/Finance/Transactions";
import CashFlow from "../pages/Finance/CashFlow";

import Reports from "../pages/Reports/Reports";
import InventoryReport from "../pages/Reports/InventoryReport";
import LossReport from "../pages/Reports/LossReport";
import FinanceReport from "../pages/Reports/FinanceReport";

import Settings from "../pages/Settings/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/estoque" element={<Inventory />} />
        <Route path="/estoque/lotes" element={<Batches />} />
        <Route path="/estoque/movimentacoes" element={<Movements />} />

        <Route path="/produtos" element={<Products />} />
        <Route path="/produtos/novo" element={<ProductForm />} />

        <Route path="/fornecedores" element={<Suppliers />} />
        <Route path="/fornecedores/novo" element={<SupplierForm />} />

        <Route path="/perdas" element={<Losses />} />

        <Route path="/financeiro" element={<Finance />} />
        <Route path="/financeiro/transacoes" element={<Transactions />} />
        <Route path="/financeiro/fluxo-de-caixa" element={<CashFlow />} />

        <Route path="/relatorios" element={<Reports />} />
        <Route path="/relatorios/estoque" element={<InventoryReport />} />
        <Route path="/relatorios/perdas" element={<LossReport />} />
        <Route path="/relatorios/financeiro" element={<FinanceReport />} />

        <Route path="/configuracoes" element={<Settings />} />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Route>
    </Routes>
  );
}
