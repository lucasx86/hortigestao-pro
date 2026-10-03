import {
  Boxes,
  ChevronRight,
  CircleDollarSign,
  FileBarChart,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBasket,
  Truck,
  TriangleAlert,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Principal",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Opera��o",
    items: [
      { label: "Estoque", to: "/estoque", icon: Boxes },
      { label: "Produtos", to: "/produtos", icon: Package },
      { label: "Fornecedores", to: "/fornecedores", icon: Truck },
      { label: "Perdas", to: "/perdas", icon: TriangleAlert },
    ],
  },
  {
    label: "Gest�o",
    items: [
      { label: "Financeiro", to: "/financeiro", icon: CircleDollarSign },
      { label: "Relat�rios", to: "/relatorios", icon: FileBarChart },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <ShoppingBasket size={21} />
          </div>

          <div>
            <div className="text-sm font-black tracking-tight text-slate-900">
              HortiGest�o
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
              PRO
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        {navigation.map((group) => (
          <div key={group.label} className="mb-6">
            <div className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              {group.label}
            </div>

            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-center gap-3">
                          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                          {item.label}
                        </span>

                        <ChevronRight
                          size={15}
                          className={`transition-transform ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 p-3">
        <NavLink
          to="/configuracoes"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold ${
              isActive
                ? "bg-slate-100 text-slate-900"
                : "text-slate-500 hover:bg-slate-50"
            }`
          }
        >
          <Settings size={18} />
          Configura��es
        </NavLink>
      </div>
    </aside>
  );
}

