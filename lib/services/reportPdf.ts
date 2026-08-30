import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type FarmReportPdfData = {
  periodLabel: string;
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  totalCrates: number;
  totalPieces: number;
  totalFeed: number;
  totalMortality: number;
};

function formatCurrency(amount: number) {
  return `NGN ${Math.round(amount).toLocaleString()}`;
}

function formatEggs(crates: number, pieces: number) {
  const totalPieces = crates * 30 + pieces;
  const wholeCrates = Math.floor(totalPieces / 30);
  const remainingPieces = totalPieces % 30;

  return remainingPieces === 0
    ? `${wholeCrates} crate${wholeCrates === 1 ? "" : "s"}`
    : `${wholeCrates} crate${wholeCrates === 1 ? "" : "s"} + ${remainingPieces} pieces`;
}

export function downloadFarmReportPdf(data: FarmReportPdfData) {
  const document = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = document.internal.pageSize.getWidth();
  const generatedAt = new Date().toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  document.setFillColor(22, 101, 52);
  document.rect(0, 0, pageWidth, 42, "F");
  document.setTextColor(255, 255, 255);
  document.setFont("helvetica", "bold");
  document.setFontSize(21);
  document.text("Mide Farm ERP", 16, 18);
  document.setFont("helvetica", "normal");
  document.setFontSize(11);
  document.text("Farm Performance Report", 16, 27);
  document.text(`Period: ${data.periodLabel}`, 16, 34);

  document.setTextColor(30, 41, 59);
  document.setFont("helvetica", "bold");
  document.setFontSize(15);
  document.text("Performance Summary", 16, 55);

  autoTable(document, {
    startY: 62,
    head: [["Measure", "Result"]],
    body: [
      ["Revenue", formatCurrency(data.totalRevenue)],
      ["Expenses", formatCurrency(data.totalExpenses)],
      ["Profit", formatCurrency(data.totalProfit)],
      ["Egg production", formatEggs(data.totalCrates, data.totalPieces)],
      ["Feed used", `${data.totalFeed.toLocaleString()} bag(s)`],
      ["Mortality", `${data.totalMortality.toLocaleString()} bird(s)`],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [22, 101, 52],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [240, 253, 244] },
    styles: { font: "helvetica", fontSize: 10, cellPadding: 4 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 78 } },
  });

  const finalY = (document as any).lastAutoTable.finalY + 18;
  document.setFont("helvetica", "normal");
  document.setFontSize(9);
  document.setTextColor(100, 116, 139);
  document.text(`Generated: ${generatedAt}`, 16, finalY);
  document.text("Generated from your recorded farm production, sales, expenses, and feed usage.", 16, finalY + 6);

  const safePeriod = data.periodLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  document.save(`mide-farm-report-${safePeriod}.pdf`);
}
