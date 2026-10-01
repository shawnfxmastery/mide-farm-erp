"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type FeedSummary = {
  totalBags: number;
  dailyUsage: number;
  totalValue: number;
  totalUsed: number;
  thisMonthUsed: number;
  last3MonthsUsed: number;
  last6MonthsUsed: number;
  last12MonthsUsed: number;
};

type FeedUsage = {
  bags_used: number | null;
  usage_date: string;
};

function totalSince(records: FeedUsage[], months: number) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(1);
  start.setMonth(start.getMonth() - (months - 1));

  return records
    .filter((record) => new Date(record.usage_date) >= start)
    .reduce((sum, record) => sum + Number(record.bags_used ?? 0), 0);
}

export default function FeedOverviewCard() {
  const [summary, setSummary] = useState<FeedSummary>({
    totalBags: 0,
    dailyUsage: 0,
    totalValue: 0,
    totalUsed: 0,
    thisMonthUsed: 0,
    last3MonthsUsed: 0,
    last6MonthsUsed: 0,
    last12MonthsUsed: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedSummary();
  }, []);

  async function loadFeedSummary() {
    const { data: settings } = await supabase.from("feed_stock_settings").select("opening_bags,reconciliation_date").eq("id", 1).maybeSingle();
    const reconciliationDate = settings?.reconciliation_date;
    const { data, error } = await supabase
      .from("feed_inventory")
      .select("*")
      .gt("purchase_date", reconciliationDate ?? "1900-01-01");

    const { data: stockUsage } = await supabase
      .from("feed_usage")
      .select("bags_used, usage_date")
      .gt("usage_date", reconciliationDate ?? "1900-01-01")
      .order("usage_date", { ascending: false });

    // Consumption reporting must retain the full history. The reconciliation date
    // only establishes the physical-stock starting point.
    const { data: usage, error: usageError } = await supabase
      .from("feed_usage")
      .select("bags_used, usage_date")
      .order("usage_date", { ascending: false });

    if (error || usageError) {
      console.error(error || usageError);
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

    const totalUsed = usage?.reduce((sum, item) => sum + Number(item.bags_used ?? 0), 0) ?? 0;
    const stockUsed = stockUsage?.reduce((sum, item) => sum + Number(item.bags_used ?? 0), 0) ?? 0;
    const usageRecords = (usage ?? []) as FeedUsage[];
    const dailyUsage = Number(usage?.[0]?.bags_used ?? latestRecord?.daily_usage ?? 0);

    setSummary({
      totalBags: Math.max(Number(settings?.opening_bags ?? 0) + totalBags - stockUsed, 0),
      dailyUsage,
      totalValue,
      totalUsed,
      thisMonthUsed: totalSince(usageRecords, 1),
      last3MonthsUsed: totalSince(usageRecords, 3),
      last6MonthsUsed: totalSince(usageRecords, 6),
      last12MonthsUsed: totalSince(usageRecords, 12),
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
            All recorded time
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
            🌾 Total Feed Used
          </p>

          <p className="mt-2 text-2xl font-bold">
            {summary.totalUsed}
          </p>

          <p className="text-sm text-slate-500">
            Bags
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

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Feed Consumption</h3>
          <span className="text-xs text-slate-500">Based on usage records</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["This month", summary.thisMonthUsed],
            ["Last 3 months", summary.last3MonthsUsed],
            ["Last 6 months", summary.last6MonthsUsed],
            ["Last 12 months", summary.last12MonthsUsed],
          ].map(([label, bags]) => (
            <div key={String(label)} className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">{label}</p>
              <p className="mt-1 text-lg font-bold text-slate-900">{Number(bags)} <span className="text-xs font-medium text-slate-500">bags</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
