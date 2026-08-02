"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  Wallet,
  TrendingUp,
  PiggyBank,
  CreditCard,
  ShoppingCart,
  Package,
  Tag,
} from "lucide-react";

import {
  getFinanceSummary,
  FinanceSummary,
} from "@/lib/services/finance";

export default function FinanceOverview() {
  const [summary, setSummary] =
    useState<FinanceSummary>({
      revenue: 0,
      expenses: 0,
      profit: 0,
      cashFlow: 0,
      outstanding: 0,
      totalSales: 0,
      totalCratesSold: 0,
      averageSellingPrice: 0,
    });

  useEffect(() => {
    loadFinance();
  }, []);

  async function loadFinance() {
    try {
      const data = await getFinanceSummary();
      setSummary(data);
    } catch (err) {
      console.error(err);
    }
  }

  const cards = [
    {
      title: "Revenue",
      value: `₦${summary.revenue.toLocaleString()}`,
      color: "text-green-600",
      icon: DollarSign,
    },
    {
      title: "Expenses",
      value: `₦${summary.expenses.toLocaleString()}`,
      color: "text-red-600",
      icon: Wallet,
    },
    {
      title: "Net Profit",
      value: `₦${summary.profit.toLocaleString()}`,
      color:
        summary.profit >= 0
          ? "text-green-600"
          : "text-red-600",
      icon: TrendingUp,
    },
    {
      title: "Cash Flow",
      value: `₦${summary.cashFlow.toLocaleString()}`,
      color: "text-blue-600",
      icon: PiggyBank,
    },
    {
      title: "Outstanding",
      value: `₦${summary.outstanding.toLocaleString()}`,
      color: "text-orange-600",
      icon: CreditCard,
    },
    {
      title: "Sales",
      value: summary.totalSales.toLocaleString(),
      color: "text-purple-600",
      icon: ShoppingCart,
    },
    {
      title: "Crates Sold",
      value: summary.totalCratesSold.toLocaleString(),
      color: "text-emerald-600",
      icon: Package,
    },
    {
      title: "Avg. Price",
      value: `₦${Math.round(
        summary.averageSellingPrice
      ).toLocaleString()}`,
      color: "text-indigo-600",
      icon: Tag,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2
                  className={`mt-3 text-3xl font-bold ${card.color}`}
                >
                  {card.value}
                </h2>

              </div>

              <div className="rounded-2xl bg-slate-100 p-4">
                <Icon
                  size={30}
                  className={card.color}
                />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}