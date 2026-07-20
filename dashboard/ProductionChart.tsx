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
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <h2 className="text-lg font-bold text-white sm:text-2xl">
            📈 Egg Production
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Live production trend
          </p>
        </div>

        <div className="self-start rounded-xl bg-green-500/20 px-3 py-2 text-sm font-semibold text-green-400 sm:px-4">
          ● Live
        </div>

      </div>

      {/* Chart */}
      <div className="h-56 w-full sm:h-72 lg:h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
              tickMargin={10}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 10 }}
              width={35}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "13px",
              }}
            />

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