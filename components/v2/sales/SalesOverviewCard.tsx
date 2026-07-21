"use client";

import { useEffect, useState } from "react";
import { Wallet, Package, Users, CircleDollarSign } from "lucide-react";
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

    if (error) {
      console.error(error);
      return;
    }

    const sales = (data ?? []) as Sale[];

    const revenue = sales.reduce(
      (sum, item) => sum + Number(item.total_amount ?? 0),
      0
    );

    const crates = sales.reduce(
      (sum, item) => sum + Number(item.crates ?? 0),
      0
    );

    const balance = sales.reduce(
      (sum, item) => sum + Number(item.balance ?? 0),
      0
    );

    const customers = new Set(
      sales
        .map((item) => item.customer)
        .filter(Boolean)
    ).size;

    setStats({
      revenue,
      crates,
      customers,
      balance,
    });
  }

  const cards = [
    {
      title: "Revenue",
      value: `₦${stats.revenue.toLocaleString()}`,
      icon: Wallet,
    },
    {
      title: "Crates Sold",
      value: stats.crates.toLocaleString(),
      icon: Package,
    },
    {
      title: "Customers",
      value: stats.customers.toLocaleString(),
      icon: Users,
    },
    {
      title: "Outstanding",
      value: `₦${stats.balance.toLocaleString()}`,
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {card.title}
              </span>

              <Icon className="h-6 w-6 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}