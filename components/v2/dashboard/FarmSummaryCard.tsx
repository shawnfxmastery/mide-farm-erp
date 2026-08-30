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
    <section className="overflow-hidden rounded-lg border border-[#edebe9] bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-[#edebe9] bg-[#faf9f8] p-5">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Farm Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Live overview of today's farm performance
            </p>

          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e8f1fb] text-2xl">
            🐔
          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 gap-4 p-5">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-md border border-[#edebe9] bg-white p-4 transition hover:border-[#0078d4] hover:shadow-sm"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#e8f1fb]">

                <Icon
                  size={20}
                  className="text-[#005a9e]"
                />

              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {item.label}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900 break-words">
                {item.value}
              </h3>

            </div>
          );
        })}

      </div>

    </section>
  );
}
