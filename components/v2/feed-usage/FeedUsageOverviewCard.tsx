"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Summary = {
  totalBagsUsed: number;
  latestBirdsFed: number;
  latestUsageDate: string;
};

export default function FeedUsageOverviewCard() {
  const [summary, setSummary] = useState<Summary>({
    totalBagsUsed: 0,
    latestBirdsFed: 0,
    latestUsageDate: "-",
  });

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    const { data, error } = await supabase
      .from("feed_usage")
      .select("*")
      .order("usage_date", { ascending: false });

    if (error || !data) return;

    const totalBagsUsed = data.reduce(
      (sum, item) => sum + (item.bags_used ?? 0),
      0
    );

    const latest = data[0];

    setSummary({
      totalBagsUsed,
      latestBirdsFed: latest?.birds_fed ?? 0,
      latestUsageDate: latest?.usage_date ?? "-",
    });
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Feed Usage Overview
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-500">🥣 Total Used</p>
          <p className="mt-2 text-2xl font-bold">
            {summary.totalBagsUsed}
          </p>
          <p className="text-sm text-slate-500">Bags</p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-500">🐔 Birds Fed</p>
          <p className="mt-2 text-2xl font-bold">
            {summary.latestBirdsFed}
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-4">
          <p className="text-sm text-slate-500">📅 Latest</p>
          <p className="mt-2 text-lg font-bold">
            {summary.latestUsageDate}
          </p>
        </div>
      </div>
    </div>
  );
}