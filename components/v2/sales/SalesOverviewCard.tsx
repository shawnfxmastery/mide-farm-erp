"use client";

import { useEffect, useState } from "react";
import {
  Wallet,
  Package,
  Users,
  CircleDollarSign,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Sale = {
  total_amount: number | null;
  crates: number | null;
  balance: number | null;
  customer: string | null;
};

export default function SalesOverviewCard() {
  const [stats, setStats] = useState({
    revenue: 0,
    crates: 0,
    customers: 0,
    balance: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { data, error } = await supabase
      .from("egg_sales")
      .select("*");

    if (error) return;

    const sales = (data ?? []) as Sale[];

    setStats({
      revenue: sales.reduce(
        (sum, item) => sum + Number(item.total_amount ?? 0),
        0
      ),

      crates: sales.reduce(
        (sum, item) => sum + Number(item.crates ?? 0),
        0
      ),

      balance: sales.reduce(
        (sum, item) => sum + Number(item.balance ?? 0),
        0
      ),

      customers: new Set(
        sales
          .map((item) => item.customer)
          .filter(Boolean)
      ).size,
    });
  }

  const cards = [
    {
      title: "Revenue",
      value: `₦${stats.revenue.toLocaleString()}`,
      subtitle: "Total revenue",
      icon: Wallet,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },

    {
      title: "Outstanding",
      value: `₦${stats.balance.toLocaleString()}`,
      subtitle: "Awaiting payment",
      icon: CircleDollarSign,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },

    {
      title: "Crates Sold",
      value: stats.crates.toLocaleString(),
      subtitle: "Eggs delivered",
      icon: Package,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },

    {
      title: "Customers",
      value: stats.customers.toLocaleString(),
      subtitle: "Active buyers",
      icon: Users,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-5 flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg}`}
              >
                <Icon
                  className={`h-6 w-6 ${card.iconColor}`}
                />
              </div>

              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                KPI
              </span>
            </div>

            <p className="text-sm text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {card.value}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}