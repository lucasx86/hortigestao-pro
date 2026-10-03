import { X } from "lucide-react";
import Sidebar from "./Sidebar";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
      />

      <div className="relative h-full w-72">
        <div className="absolute right-3 top-5 z-10">
          <button
            onClick={onClose}
            className="rounded-xl bg-white p-2 shadow-lg"
          >
            <X size={18} />
          </button>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}
