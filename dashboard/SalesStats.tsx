"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SalesStats() {
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);
  const [cratesSold, setCratesSold] = useState(0);
  const [owing, setOwing] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { data } = await supabase
      .from("egg_sales")
      .select("*");

    if (!data) return;

    const today = new Date().toISOString().split("T")[0];
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    let todayTotal = 0;
    let monthTotal = 0;
    let crates = 0;
    let outstanding = 0;

    data.forEach((sale) => {
      crates += sale.crates;

      if (sale.date === today) {
        todayTotal += sale.total_amount;
      }

      const saleDate = new Date(sale.date);

      if (
        saleDate.getMonth() === month &&
        saleDate.getFullYear() === year
      ) {
        monthTotal += sale.total_amount;
      }

      if (sale.payment_status === "Owing") {
        outstanding += sale.total_amount;
      }
    });

    setTodayRevenue(todayTotal);
    setMonthRevenue(monthTotal);
    setCratesSold(crates);
    setOwing(outstanding);
  }

  const cards = [
    {
      title: "Today's Sales",
      value: `₦${todayRevenue.toLocaleString()}`,
      icon: "💰",
      color: "text-green-400",
    },
    {
      title: "Monthly Revenue",
      value: `₦${monthRevenue.toLocaleString()}`,
      icon: "📈",
      color: "text-blue-400",
    },
    {
      title: "Crates Sold",
      value: cratesSold.toString(),
      icon: "🥚",
      color: "text-yellow-400",
    },
    {
      title: "Outstanding",
      value: `₦${owing.toLocaleString()}`,
      icon: "⚠️",
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-green-500/20"
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-xs uppercase tracking-widest text-slate-500">
                {card.title}
              </p>

              <h2 className={`mt-4 text-4xl font-bold ${card.color}`}>
                {card.value}
              </h2>

              <p className="mt-3 text-green-400 text-sm">
                Live Statistics
              </p>

            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-3xl">
              {card.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}