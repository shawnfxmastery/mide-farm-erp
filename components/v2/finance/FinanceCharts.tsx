"use client";

import RevenueExpenseChart from "./charts/RevenueExpenseChart";
import MonthlySalesChart from "./charts/MonthlySalesChart";

export default function FinanceCharts() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <RevenueExpenseChart />
      <MonthlySalesChart />
    </div>
  );
}