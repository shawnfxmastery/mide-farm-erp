"use client";

import { formatEggQuantity } from "@/lib/utils/eggFormatter";
import { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Wallet,
  Receipt,
  Egg,
  Wheat,
  Skull,
  Calendar,
} from "lucide-react";

import { getReportStats } from "@/lib/services/reports";

type ReportStats = {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  totalCrates: number;
  totalPieces: number;
  totalFeed: number;
  totalMortality: number;
};

export default function ReportsPage() {
  const [stats, setStats] = useState<ReportStats>({
    totalRevenue: 0,
    totalExpenses: 0,
    totalProfit: 0,
    totalCrates: 0,
    totalPieces: 0,
    totalFeed: 0,
    totalMortality: 0,
  });

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    const data = await getReportStats();
    setStats(data);
  }

  // Convert every 30 pieces into 1 crate
  const eggs = formatEggQuantity(
  stats.totalCrates,
  stats.totalPieces
);

  const kpis = [
    {
      title: "Revenue",
      value: `₦${stats.totalRevenue.toLocaleString()}`,
      icon: Wallet,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Expenses",
      value: `₦${stats.totalExpenses.toLocaleString()}`,
      icon: Receipt,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Profit",
      value: `₦${stats.totalProfit.toLocaleString()}`,
      icon: TrendingUp,
      color:
        stats.totalProfit >= 0
          ? "bg-blue-100 text-blue-700"
          : "bg-orange-100 text-orange-700",
    },
    {
  title: "Egg Production",
  value: eggs.display,
  icon: Egg,
  color: "bg-yellow-100 text-yellow-700",
},
    {
      title: "Feed Used",
      value: `${stats.totalFeed.toLocaleString()} Bags`,
      icon: Wheat,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Mortality",
      value: `${stats.totalMortality.toLocaleString()} Birds`,
      icon: Skull,
      color: "bg-slate-100 text-slate-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <BarChart3 size={34} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Reports & Analytics
            </h1>

            <p className="mt-1 text-green-100">
              Monitor your farm performance with real-time business insights.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 overflow-x-auto">
          <Calendar className="text-slate-500" size={20} />

          <button className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white">
            Today
          </button>

          <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-100">
            Week
          </button>

          <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-100">
            Month
          </button>

          <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-100">
            Year
          </button>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-2 gap-4">
        {kpis.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon size={20} />
              </div>

              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-lg font-bold leading-tight text-slate-900">
  {card.value}
</h2>
            </div>
          );
        })}
      </section>

      {/* Charts */}
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-green-600" />

          <h2 className="text-xl font-bold text-slate-900">
            Performance Charts
          </h2>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20">
          <BarChart3
            size={70}
            className="text-slate-300"
          />

          <h3 className="mt-6 text-2xl font-bold text-slate-800">
            Charts Coming Soon
          </h3>

          <p className="mt-3 max-w-md text-center text-slate-500">
            Revenue, expenses, egg production, feed usage and mortality
            analytics will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}