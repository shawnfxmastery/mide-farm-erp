"use client";

import { useState } from "react";
import { FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "@/lib/supabase";

export default function ExpenseActions() {
  const [exportingPdf, setExportingPdf] = useState(false);

  async function exportPdf() {
    setExportingPdf(true);
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("date, category, description, vendor, amount")
        .order("date", { ascending: false });
      if (error) throw error;

      const expenses = data ?? [];
      const total = expenses.reduce((sum, expense) => sum + Number(expense.amount ?? 0), 0);
      const document = new jsPDF({ unit: "mm", format: "a4" });
      document.setFillColor(22, 101, 52);
      document.rect(0, 0, 210, 35, "F");
      document.setTextColor(255, 255, 255);
      document.setFontSize(20);
      document.text("Mide Farm ERP", 15, 15);
      document.setFontSize(11);
      document.text("Expense Report", 15, 24);
      document.setTextColor(30, 41, 59);
      document.setFontSize(12);
      document.text(`Total expenses: NGN ${total.toLocaleString()}`, 15, 46);
      autoTable(document, {
        startY: 52,
        head: [["Date", "Category", "Description", "Vendor", "Amount (NGN)"]],
        body: expenses.map((expense) => [expense.date, expense.category, expense.description || "-", expense.vendor || "-", Number(expense.amount ?? 0).toLocaleString()]),
        theme: "grid",
        headStyles: { fillColor: [22, 101, 52], textColor: [255, 255, 255] },
        styles: { fontSize: 9, cellPadding: 3 },
      });
      document.save("mide-farm-expenses.pdf");
      toast.success("Expense PDF downloaded.");
    } catch (error: any) {
      toast.error(error.message || "Unable to export expense PDF.");
    } finally { setExportingPdf(false); }
  }

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
        onClick={exportPdf}
        disabled={exportingPdf}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-60"
      >
        <FileText size={18} />
        {exportingPdf ? "Preparing PDF..." : "Export PDF"}
      </button>
    </div>
  );
}
