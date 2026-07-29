"use client";

import { useEffect, useState } from "react";
import {
  Bird,
  Egg,
  Skull,
  Wheat,
  Wallet,
} from "lucide-react";

import { getDashboardStats } from "@/lib/services/dashboard";

type DashboardStats = {
  birdsAlive: number;
  eggsToday: {
    crates: number;
    pieces: number;
  };
  mortality: number;
  todayFeed: number;
  todayRevenue: number;
};

export default function FarmSummaryCard() {
  const [stats, setStats] = useState<DashboardStats>({
    birdsAlive: 0,
    eggsToday: {
      crates: 0,
      pieces: 0,
    },
    mortality: 0,
    todayFeed: 0,
    todayRevenue: 0,
  });

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    const data = await getDashboardStats();

    setStats({
      birdsAlive: data.birdsAlive,
      eggsToday: data.eggsToday,
      mortality: data.mortality,
      todayFeed: data.todayFeed,
      todayRevenue: data.todayRevenue,
    });
  }

  const items = [
    {
      icon: Bird,
      label: "Birds Alive",
      value: stats.birdsAlive.toLocaleString(),
    },
    {
      icon: Egg,
      label: "Today's Eggs",
      value: `${stats.eggsToday.crates} Crates${
        stats.eggsToday.pieces > 0
          ? ` + ${stats.eggsToday.pieces} Pieces`
          : ""
      }`,
    },
    {
      icon: Skull,
      label: "Mortality",
      value: stats.mortality.toString(),
    },
    {
      icon: Wheat,
      label: "Feed Used",
      value: `${stats.todayFeed} Bags`,
    },
    {
      icon: Wallet,
      label: "Revenue",
      value: `₦${stats.todayRevenue.toLocaleString()}`,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Farm Summary
      </h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon size={18} />
                </div>

                <span className="text-slate-600">
                  {item.label}
                </span>
              </div>

              <span className="font-bold text-slate-900">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}