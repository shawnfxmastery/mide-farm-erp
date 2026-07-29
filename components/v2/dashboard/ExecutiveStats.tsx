"use client";

import { useMemo } from "react";
import {
  Bird,
  Egg,
  DollarSign,
  Wallet,
  TrendingUp,
  Wheat,
  Skull,
  Activity,
} from "lucide-react";

import { useDashboard } from "@/components/v2/dashboard/context/DashboardContext";

export default function ExecutiveStats() {
  const {
    production,
    sales,
    expenses,
    feedInventory,
    feedUsage,
    loading,
  } = useDashboard();

  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    const todayProduction = production.filter(
      (item) => item.date === today
    );

    const todaySales = sales.filter(
      (item) => item.date === today
    );

    const todayExpenses = expenses.filter(
      (item) => item.date === today
    );

    const latestProduction =
      production.length > 0
        ? production[production.length - 1]
        : null;

    const birds = Number(latestProduction?.birds ?? 0);

    const eggsToday = todayProduction.reduce(
      (sum, item) => sum + Number(item.crates ?? 0),
      0
    );

    const mortality = todayProduction.reduce(
      (sum, item) => sum + Number(item.mortality ?? 0),
      0
    );

    const salesToday = todaySales.reduce(
      (sum, item) => sum + Number(item.total_amount ?? 0),
      0
    );

    const expensesToday = todayExpenses.reduce(
      (sum, item) => sum + Number(item.amount ?? 0),
      0
    );

    const bagsPurchased = feedInventory.reduce(
      (sum, item) => sum + Number(item.bags_purchased ?? 0),
      0
    );

    const bagsUsed = feedUsage.reduce(
      (sum, item) => sum + Number(item.bags_used ?? 0),
      0
    );

    const feedRemaining = bagsPurchased - bagsUsed;

    const productionRate =
      birds > 0
        ? ((eggsToday * 30) / birds) * 100
        : 0;

    return {
      birds,
      eggsToday,
      salesToday,
      expensesToday,
      profitToday: salesToday - expensesToday,
      feedRemaining,
      mortality,
      productionRate,
    };
  }, [
    production,
    sales,
    expenses,
    feedInventory,
    feedUsage,
  ]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        Loading dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Birds Alive",
      value: stats.birds.toLocaleString(),
      subtitle: "Current flock",
      icon: Bird,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Today's Eggs",
      value: `${stats.eggsToday.toLocaleString()} Crates`,
      subtitle: "Production today",
      icon: Egg,
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Revenue Today",
      value: `₦${stats.salesToday.toLocaleString()}`,
      subtitle: "Sales received",
      icon: DollarSign,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Expenses",
      value: `₦${stats.expensesToday.toLocaleString()}`,
      subtitle: "Today's expenses",
      icon: Wallet,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Profit",
      value: `₦${stats.profitToday.toLocaleString()}`,
      subtitle: "Net today",
      icon: TrendingUp,
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Feed Remaining",
      value: `${stats.feedRemaining.toLocaleString()} Bags`,
      subtitle: "Available stock",
      icon: Wheat,
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Mortality",
      value: stats.mortality.toLocaleString(),
      subtitle: "Today's losses",
      icon: Skull,
      bg: "bg-rose-50",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
    },
    {
      title: "Production Rate",
      value: `${stats.productionRate.toFixed(1)}%`,
      subtitle: "Layer performance",
      icon: Activity,
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`${card.bg} group rounded-3xl border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg}`}
              >
                <Icon
                  className={`h-7 w-7 ${card.iconColor}`}
                />
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                Live
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {card.value}
            </h2>

            <div className="mt-5 border-t border-slate-200 pt-4">
              <p className="text-sm text-slate-500">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}