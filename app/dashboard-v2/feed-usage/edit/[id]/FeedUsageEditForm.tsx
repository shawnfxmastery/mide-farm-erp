"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function FeedUsageEditForm() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [usageDate, setUsageDate] = useState("");
  const [feedType, setFeedType] = useState("");
  const [birdsFed, setBirdsFed] = useState("");
  const [bagsUsed, setBagsUsed] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadFeedUsage();
  }, []);

  async function loadFeedUsage() {
    const { data, error } = await supabase
      .from("feed_usage")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    setUsageDate(data.usage_date);
    setFeedType(data.feed_type);
    setBirdsFed(String(data.birds_fed));
    setBagsUsed(String(data.bags_used));
    setNotes(data.notes ?? "");

    setLoading(false);
  }
  async function updateFeedUsage(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  setSaving(true);

  const { error } = await supabase
    .from("feed_usage")
    .update({
      usage_date: usageDate,
      feed_type: feedType,
      birds_fed: Number(birdsFed),
      bags_used: Number(bagsUsed),
      notes,
    })
    .eq("id", id);

  setSaving(false);

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Feed usage updated!");

  router.push("/dashboard-v2/feed-usage");
  router.refresh();
}

if (loading) {
  return (
    <div className="rounded-2xl border bg-white p-8">
      Loading...
    </div>
  );
}

return (
  <form
    onSubmit={updateFeedUsage}
    className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
  >
    <h1 className="text-3xl font-bold">
      Edit Feed Usage
    </h1>

    <input
      type="date"
      value={usageDate}
      onChange={(e) => setUsageDate(e.target.value)}
      className="w-full rounded-xl border p-3"
    />

    <input
      value={feedType}
      onChange={(e) => setFeedType(e.target.value)}
      placeholder="Feed Type"
      className="w-full rounded-xl border p-3"
    />

    <input
      type="number"
      value={birdsFed}
      onChange={(e) => setBirdsFed(e.target.value)}
      placeholder="Birds Fed"
      className="w-full rounded-xl border p-3"
    />

    <input
      type="number"
      value={bagsUsed}
      onChange={(e) => setBagsUsed(e.target.value)}
      placeholder="Bags Used"
      className="w-full rounded-xl border p-3"
    />

    <textarea
      rows={4}
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Notes"
      className="w-full rounded-xl border p-3"
    />

    <button
      type="submit"
      disabled={saving}
      className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
    >
      {saving ? "Updating..." : "Update Feed Usage"}
    </button>
  </form>
);
}