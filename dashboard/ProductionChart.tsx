"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Props = {
  data: number[];
};

export default function ProductionChart({ data }: Props) {
  const chartData = data.map((value, index) => ({
    day: `Day ${index + 1}`,
    production: value,
  }));

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            📈 Egg Production
          </h2>

          <p className="text-slate-400">
            Live production trend
          </p>

        </div>

        <div className="rounded-xl bg-green-500/20 px-4 py-2 text-green-400">
          Live
        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="production"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.25}
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}