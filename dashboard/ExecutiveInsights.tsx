"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ExecutiveInsights() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    loadInsights();
  }, []);

  async function loadInsights() {
    try {
      const insights: string[] = [];

      // Feed
      const { data: feed, error: feedError } = await supabase
        .from("feed_inventory")
        .select("bags_available,daily_usage")
        .limit(1);

      console.log("Feed:", feed, feedError);

      // Production
      const { data: production, error: productionError } = await supabase
        .from("egg_production")
        .select("birds,crates")
        .limit(1);

      console.log("Production:", production, productionError);

      // Sales
      const { data: sales, error: salesError } = await supabase
        .from("egg_sales")
        .select("total_amount,payment_status");

      console.log("Sales:", sales, salesError);

      // Birds
      const { data: birds, error: birdError } = await supabase
        .from("bird_batches")
        .select("health_status");

      console.log("Birds:", birds, birdError);

      insights.push("✅ Executive Insights connected successfully.");

      setMessages(insights);
    } catch (err) {
      console.error("Executive Insights Error:", err);

      setMessages([
        "❌ Error loading Executive Insights. Check browser console.",
      ]);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 lg:p-8 shadow-xl">
      <h2 className="text-xl sm:text-2xl font-bold">🧠 Executive Insights</h2>

      <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
  {messages.map((m, i) => (
    <div
      key={i}
      className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 text-sm sm:text-base"
    >
      {m}
    </div>
  ))}
</div>
    </div>
  );
}