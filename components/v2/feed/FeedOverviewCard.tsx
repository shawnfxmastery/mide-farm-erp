"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type FeedSummary = {
  totalBags: number;
  dailyUsage: number;
  totalValue: number;
  daysRemaining: number;
};

export default function FeedOverviewCard() {
  const [summary, setSummary] = useState<FeedSummary>({
    totalBags: 0,
    dailyUsage: 0,
    totalValue: 0,
    daysRemaining: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedSummary();
  }, []);

  async function loadFeedSummary() {
    const { data, error } = await supabase
      .from("feed_inventory")
      .select("*");

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const totalBags =
      data?.reduce(
        (sum, item) => sum + (item.bags_purchased ?? 0),
        0
      ) ?? 0;

    const totalValue =
      data?.reduce(
        (sum, item) => sum + (item.total_cost ?? 0),
        0
      ) ?? 0;

    const latestRecord =
      data && data.length > 0
        ? data.sort(
            (a, b) =>
              new Date(b.purchase_date).getTime() -
              new Date(a.purchase_date).getTime()
          )[0]
        : null;

    const dailyUsage = latestRecord?.daily_usage ?? 0;

    const daysRemaining =
      dailyUsage > 0
        ? Math.floor(totalBags / dailyUsage)
        : 0;

    setSummary({
      totalBags,
      dailyUsage,
      totalValue,
      daysRemaining,
    });

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        Loading feed summary...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Feed Overview
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-500">
            📦 Feed Stock
          </p>

          <p className="mt-2 text-2xl font-bold">
            {summary.totalBags}
          </p>

          <p className="text-sm text-slate-500">
            Bags
          </p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-500">
            🥣 Daily Usage
          </p>

          <p className="mt-2 text-2xl font-bold">
            {summary.dailyUsage}
          </p>

          <p className="text-sm text-slate-500">
            Bags / Day
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-4">
          <p className="text-sm text-slate-500">
            📅 Days Remaining
          </p>

          <p className="mt-2 text-2xl font-bold">
            {summary.daysRemaining}
          </p>

          <p className="text-sm text-slate-500">
            Days
          </p>
        </div>

        <div className="rounded-2xl bg-purple-50 p-4">
          <p className="text-sm text-slate-500">
            💰 Feed Value
          </p>

          <p className="mt-2 text-2xl font-bold">
            ₦{summary.totalValue.toLocaleString()}
          </p>

          <p className="text-sm text-slate-500">
            Total Cost
          </p>
        </div>
      </div>
    </div>
  );
}