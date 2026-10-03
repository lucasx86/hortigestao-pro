import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
          HortiGestão PRO
        </div>

        <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
          {title}
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}
