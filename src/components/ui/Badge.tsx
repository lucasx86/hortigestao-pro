import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "green" | "amber" | "rose" | "slate" | "blue";
  pulse?: boolean;
}

export default function Badge({
  children,
  variant = "slate",
  pulse = false,
}: BadgeProps) {
  const styles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-wider ${styles[variant]} ${pulse ? "animate-pulse" : ""}`}
    >
      {children}
    </span>
  );
}
