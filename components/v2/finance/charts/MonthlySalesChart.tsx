"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { supabase } from "@/lib/supabase";

type Data = {
  month: string;
  sales: number;
};

export default function MonthlySalesChart() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    loadChart();
  }, []);

  async function loadChart() {
    const { data: sales } = await supabase
      .from("egg_sales")
      .select("date,total_amount");

    const map = new Map<string, number>();

    sales?.forEach((sale) => {
      const month = new Date(sale.date).toLocaleString(
        "en-US",
        {
          month: "short",
        }
      );

      map.set(
        month,
        (map.get(month) ?? 0) +
          Number(sale.total_amount)
      );
    });

    setData(
      Array.from(map.entries()).map(
        ([month, sales]) => ({
          month,
          sales,
        })
      )
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Monthly Sales
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="sales"
              fill="#16a34a"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}