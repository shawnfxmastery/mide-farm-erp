"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function FeedUsageForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [usageDate, setUsageDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [feedType, setFeedType] = useState("");
  const [birdsFed, setBirdsFed] = useState("");
  const [bagsUsed, setBagsUsed] = useState("");
  const [notes, setNotes] = useState("");

  async function saveFeedUsage(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("feed_usage")
      .insert({
        usage_date: usageDate,
        feed_type: feedType,
        birds_fed: Number(birdsFed),
        bags_used: Number(bagsUsed),
        notes,
      });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Feed usage saved successfully!");

    router.push("/dashboard-v2/feed-usage");
    router.refresh();
  }

  return (
    <form
      onSubmit={saveFeedUsage}
      className="space-y-7"
    >
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Usage Date
        </label>

        <input
          type="date"
          value={usageDate}
          onChange={(e) => setUsageDate(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Feed Type
        </label>

        <input
          value={feedType}
          onChange={(e) => setFeedType(e.target.value)}
          placeholder="e.g. Growers Mash"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Birds Fed
        </label>

        <input
          type="number"
          value={birdsFed}
          onChange={(e) => setBirdsFed(e.target.value)}
          placeholder="1950"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Bags Used
        </label>

        <input
          type="number"
          value={bagsUsed}
          onChange={(e) => setBagsUsed(e.target.value)}
          placeholder="8"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Notes
        </label>

        <textarea
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes..."
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Feed Usage"}
      </button>
    </form>
  );
}