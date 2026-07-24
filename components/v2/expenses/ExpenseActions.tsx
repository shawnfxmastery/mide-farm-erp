"use client";

import { FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "sonner";

export default function ExpenseActions() {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <button
        onClick={() =>
          toast.info("Excel export will be connected next.")
        }
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-600 transition hover:bg-green-50"
      >
        <FileSpreadsheet size={18} />
        Export Excel
      </button>

      <button
        onClick={() =>
          toast.info("PDF export will be connected next.")
        }
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-50"
      >
        <FileText size={18} />
        Export PDF
      </button>
    </div>
  );
}