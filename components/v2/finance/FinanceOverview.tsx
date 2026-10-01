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
      color: "text-emerald-700",
      iconColor: "text-emerald-700",
      iconBackground: "bg-emerald-50",
      icon: DollarSign,
    },
    {
      title: "Expenses",
      value: `₦${summary.expenses.toLocaleString()}`,
      color: "text-slate-900",
      iconColor: "text-slate-600",
      iconBackground: "bg-slate-100",
      icon: Wallet,
    },
    {
      title: "Net Profit",
      value: `₦${summary.profit.toLocaleString()}`,
      color:
        summary.profit >= 0
          ? "text-emerald-700"
          : "text-rose-700",
      iconColor:
        summary.profit >= 0
          ? "text-emerald-700"
          : "text-rose-700",
      iconBackground:
        summary.profit >= 0
          ? "bg-emerald-50"
          : "bg-rose-50",
      icon: TrendingUp,
    },
    {
      title: "Cash Flow",
      value: `₦${summary.cashFlow.toLocaleString()}`,
      color: summary.cashFlow >= 0 ? "text-slate-900" : "text-rose-700",
      iconColor: summary.cashFlow >= 0 ? "text-slate-600" : "text-rose-700",
      iconBackground: summary.cashFlow >= 0 ? "bg-slate-100" : "bg-rose-50",
      icon: PiggyBank,
    },
    {
      title: "Outstanding",
      value: `₦${summary.outstanding.toLocaleString()}`,
      color: summary.outstanding > 0 ? "text-amber-700" : "text-slate-900",
      iconColor: summary.outstanding > 0 ? "text-amber-700" : "text-slate-600",
      iconBackground: summary.outstanding > 0 ? "bg-amber-50" : "bg-slate-100",
      icon: CreditCard,
    },
    {
      title: "Sales",
      value: summary.totalSales.toLocaleString(),
      color: "text-slate-900",
      iconColor: "text-slate-600",
      iconBackground: "bg-slate-100",
      icon: ShoppingCart,
    },
    {
      title: "Crates Sold",
      value: summary.totalCratesSold.toLocaleString(),
      color: "text-slate-900",
      iconColor: "text-slate-600",
      iconBackground: "bg-slate-100",
      icon: Package,
    },
    {
      title: "Avg. Price",
      value: `₦${Math.round(
        summary.averageSellingPrice
      ).toLocaleString()}`,
      color: "text-slate-900",
      iconColor: "text-slate-600",
      iconBackground: "bg-slate-100",
      icon: Tag,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-slate-300"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2
                  className={`mt-2 text-2xl font-semibold tracking-tight ${card.color}`}
                >
                  {card.value}
                </h2>

              </div>

              <div className={`rounded-xl p-3 ${card.iconBackground}`}>
                <Icon
                  size={22}
                  className={card.iconColor}
                />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
