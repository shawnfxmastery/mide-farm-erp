"use client";

import { useMemo } from "react";
import {
  DollarSign,
  Wallet,
  TrendingUp,
  Egg,
} from "lucide-react";

import { useDashboard } from "../context/DashboardContext";

export default function AnalyticsStats() {
  const { production, sales, expenses } = useDashboard();

  const stats = useMemo(() => {
    const revenue = sales.reduce(
      (sum, item) => sum + Number(item.total_amount ?? 0),
      0
    );

    const expense = expenses.reduce(
      (sum, item) => sum + Number(item.amount ?? 0),
      0
    );

    const latestProduction =
      production.length > 0
        ? production[production.length - 1]
        : null;

    const birds = Number(latestProduction?.birds ?? 0);
    const crates = Number(latestProduction?.crates ?? 0);

    const productionRate =
      birds > 0
        ? ((crates * 30) / birds) * 100
        : 0;

    return {
      revenue,
      expense,
      profit: revenue - expense,
      productionRate,
    };
  }, [production, sales, expenses]);

  const cards = [
    {
      title: "Revenue",
      value: `₦${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Expenses",
      value: `₦${stats.expense.toLocaleString()}`,
      icon: Wallet,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Profit",
      value: `₦${stats.profit.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Production",
      value: `${stats.productionRate.toFixed(1)}%`,
      icon: Egg,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon size={20} />
              </div>

              <span className="text-xs text-slate-400">
                KPI
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}