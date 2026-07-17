"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FeedStats() {
  const [bags, setBags] = useState(0);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [feedValue, setFeedValue] = useState(0);

  useEffect(() => {
    loadFeedStats();
  }, []);

  async function loadFeedStats() {
    const { data } = await supabase
      .from("feed_inventory")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (!data || data.length === 0) return;

    const latest = data[0];

    const remaining =
      latest.daily_usage > 0
        ? Math.floor(latest.bags_available / latest.daily_usage)
        : 0;

    setBags(Number(latest.bags_available ?? 0));
    setDailyUsage(Number(latest.daily_usage ?? 0));
    setDaysRemaining(remaining);
    const value =
  Number(latest.bags_available ?? 0) *
  Number(latest.cost_per_bag ?? 0);

setFeedValue(value);
  }

  const cards = [
    {
      title: "Bags Available",
      value: bags,
      icon: "🌽",
      color: "text-green-400",
    },
    {
      title: "Daily Usage",
      value: dailyUsage,
      icon: "🥣",
      color: "text-blue-400",
    },
    {
      title: "Days Remaining",
      value: daysRemaining,
      icon: "📅",
      color: daysRemaining <= 7
        ? "text-red-400"
        : "text-yellow-400",
    },
    {
      title: "Feed Value",
      value: `₦${feedValue.toLocaleString()}`,
      icon: "💰",
      color: "text-green-400",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-green-500/20"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-widest text-slate-500">
                  {card.title}
                </p>

                <h2 className={`mt-4 text-4xl font-bold ${card.color}`}>
                  {card.value}
                </h2>

                <p
  className={`mt-3 text-sm ${
    daysRemaining <= 3
      ? "text-red-400"
      : daysRemaining <= 7
      ? "text-yellow-400"
      : "text-green-400"
  }`}
>
  {daysRemaining <= 3
    ? "Critical Stock"
    : daysRemaining <= 7
    ? "Low Stock"
    : "Stock Healthy"}
</p>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-3xl">
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Low Stock Alert */}

      {daysRemaining <= 7 && (

        <div className="mt-6 rounded-3xl border border-red-500 bg-red-500/10 p-6">

          <div className="flex items-center gap-4">

            <div className="text-5xl">
              ⚠️
            </div>

            <div>

              <h2 className="text-2xl font-bold text-red-400">
  {daysRemaining <= 3
    ? "🚨 Critical Feed Level"
    : "⚠️ Low Feed Stock"}
</h2>

              <p className="mt-2 text-slate-300">
                Feed stock is estimated to last only{" "}
                <span className="font-bold text-red-400">
                  {daysRemaining} days
                </span>.
              </p>

              <p className="mt-1 text-slate-400">
                Purchase additional feed soon to avoid production interruption.
              </p>

            </div>

          </div>

        </div>

      )}

    </>
  );
}