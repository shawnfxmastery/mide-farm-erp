"use client";

import { useMemo } from "react";
import { useDashboard } from "../context/DashboardContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ProductionChart() {
  const { production, loading } = useDashboard();

  const data = useMemo(() => {
    return production.slice(-7).map((row) => ({
      date: new Date(row.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      crates: Number(row.crates ?? 0),
    }));
  }, [production]);

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
      📈 Egg Production
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Monitor egg production trend
    </p>
  </div>

  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
    Last 7 Days
  </span>
</div>

      <div className="h-60 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="crates"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}