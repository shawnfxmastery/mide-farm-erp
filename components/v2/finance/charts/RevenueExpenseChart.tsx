"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { supabase } from "@/lib/supabase";

type ChartData = {
  day: string;
  revenue: number;
  expenses: number;
};

export default function RevenueExpenseChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    loadChart();
  }, []);

  async function loadChart() {
    const { data: sales } = await supabase
      .from("egg_sales")
      .select("date,total_amount");

    const { data: expenses } = await supabase
      .from("expenses")
      .select("date,amount");

    const map = new Map<
      string,
      {
        revenue: number;
        expenses: number;
      }
    >();

    sales?.forEach((sale) => {
      const day = sale.date;

      if (!map.has(day)) {
        map.set(day, {
          revenue: 0,
          expenses: 0,
        });
      }

      map.get(day)!.revenue += Number(
        sale.total_amount
      );
    });

    expenses?.forEach((expense) => {
      const day = expense.date;

      if (!map.has(day)) {
        map.set(day, {
          revenue: 0,
          expenses: 0,
        });
      }

      map.get(day)!.expenses += Number(
        expense.amount
      );
    });

    const chart = Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, values]) => ({
        day,
        revenue: values.revenue,
        expenses: values.expenses,
      }));

    setData(chart);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Revenue vs Expenses
      </h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#dc2626"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}