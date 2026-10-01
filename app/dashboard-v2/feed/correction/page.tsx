"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { getTodayNigeria } from "@/lib/date";

export default function FeedCorrectionPage() {
  const router = useRouter();
  const [bags, setBags] = useState("");
  const [date, setDate] = useState(getTodayNigeria());
  const [saving, setSaving] = useState(false);
  async function save() {
    if (!Number.isFinite(Number(bags)) || Number(bags) < 0) { toast.error("Enter the physical feed bags on the farm."); return; }
    setSaving(true);
    const { error } = await supabase.from("feed_stock_settings").upsert({ id: 1, opening_bags: Number(bags), reconciliation_date: date, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Feed stock corrected."); router.push("/dashboard-v2/feed"); router.refresh();
  }
  return <div className="mx-auto max-w-xl space-y-6"><div><h1 className="text-3xl font-bold">Correct Feed Stock</h1><p className="mt-2 text-slate-500">Set the verified physical bags on the farm. Previous purchase and usage history stays safe.</p></div><div className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><label className="block text-sm font-medium">Correction Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-md border p-3" /></label><label className="block text-sm font-medium">Physical Bags Available<input type="number" min="0" value={bags} onChange={(e) => setBags(e.target.value)} placeholder="193" className="mt-2 w-full rounded-md border p-3" /></label><button onClick={save} disabled={saving} className="w-full rounded-md bg-green-600 py-3 font-semibold text-white">{saving ? "Saving..." : "Save Feed Correction"}</button></div></div>;
}
