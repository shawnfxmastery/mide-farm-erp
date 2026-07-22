"use client";

import { useMemo } from "react";
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
      <div className="rounded-3xl bg-white p-6 shadow text-center">
        Loading dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Birds",
      value: stats.birds.toLocaleString(),
      color: "bg-blue-50",
    },
    {
      title: "Eggs Today",
      value: `${stats.eggsToday.toLocaleString()} Crates`,
      color: "bg-yellow-50",
    },
    {
      title: "Sales Today",
      value: `₦${stats.salesToday.toLocaleString()}`,
      color: "bg-green-50",
    },
    {
      title: "Expenses Today",
      value: `₦${stats.expensesToday.toLocaleString()}`,
      color: "bg-red-50",
    },
    {
      title: "Profit Today",
      value: `₦${stats.profitToday.toLocaleString()}`,
      color: "bg-emerald-50",
    },
    {
      title: "Feed Remaining",
      value: `${stats.feedRemaining.toLocaleString()} Bags`,
      color: "bg-orange-50",
    },
    {
      title: "Mortality",
      value: stats.mortality.toLocaleString(),
      color: "bg-rose-50",
    },
    {
      title: "Production %",
      value: `${stats.productionRate.toFixed(1)}%`,
      color: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-3xl ${card.color} p-5 shadow-sm`}
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}