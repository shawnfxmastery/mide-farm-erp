"use client";

import { useMemo } from "react";
import { useDashboard } from "../context/DashboardContext";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function FeedUsageChart() {
  const { feedUsage, loading } = useDashboard();

  const data = useMemo(() => {
    return feedUsage
      .slice(-7)
      .map((item) => ({
        date: new Date(item.usage_date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }),
        bags: Number(item.bags_used ?? 0),
      }));
  }, [feedUsage]);

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
      🌾 Feed Usage
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Daily feed consumption
    </p>
  </div>

  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
    Last 7 Days
  </span>
</div>

      <div className="h-60 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString()} Bags`,
                "",
              ]}
            />

            <Area
              type="monotone"
              dataKey="bags"
              stroke="#f59e0b"
              fill="#fde68a"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}