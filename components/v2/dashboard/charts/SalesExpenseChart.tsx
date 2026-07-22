"use client";

import { useMemo } from "react";
import { useDashboard } from "../context/DashboardContext";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function SalesExpenseChart() {
  const { sales, expenses, loading } = useDashboard();

  const data = useMemo(() => {
    const grouped: Record<
      string,
      { date: string; sales: number; expenses: number }
    > = {};

    sales.forEach((item) => {
      const date = item.date;

      if (!grouped[date]) {
        grouped[date] = {
          date,
          sales: 0,
          expenses: 0,
        };
      }

      grouped[date].sales += Number(item.total_amount ?? 0);
    });

    expenses.forEach((item) => {
      const date = item.date;

      if (!grouped[date]) {
        grouped[date] = {
          date,
          sales: 0,
          expenses: 0,
        };
      }

      grouped[date].expenses += Number(item.amount ?? 0);
    });

    return Object.values(grouped)
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )
      .slice(-7)
      .map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }),
      }));
  }, [sales, expenses]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <div className="mb-6 flex items-start justify-between">
  <div>
    <h2 className="text-xl font-bold text-slate-900">
      💰 Sales vs Expenses
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Compare income and spending
    </p>
  </div>

  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
    Last 7 Days
  </span>
</div>

      <div className="h-60 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip
  formatter={(value) => [
    `₦${Number(value).toLocaleString()}`,
    "",
  ]}
/>

            <Legend />

            <Bar
              dataKey="sales"
              name="Sales"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}