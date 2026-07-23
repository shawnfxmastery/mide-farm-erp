"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import AppLayout from "@/components/v2/layout/AppLayout";
import SectionCard from "@/components/v2/ui/SectionCard";

export default function NewProductionPage() {
  const router = useRouter();

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [birds, setBirds] = useState("");
  const [crates, setCrates] = useState("");
  const [pieces, setPieces] = useState("");
  const [brokenEggs, setBrokenEggs] = useState("");
  const [mortality, setMortality] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveProduction(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("egg_production")
      .insert({
        date,
        birds: Number(birds),
        crates: Number(crates),
        pieces: Number(pieces),
        broken_eggs: Number(brokenEggs),
        mortality: Number(mortality),
        note,
      });

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Production saved successfully!");

    router.push("/dashboard-v2/production");
    router.refresh();
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/dashboard-v2/production"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back to Production
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Record Production
          </h1>

          <p className="mt-1 text-slate-500">
            Record today's egg production and flock performance.
          </p>
        </div>

        <SectionCard>
          <form
            onSubmit={saveProduction}
            className="space-y-5"
          >
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
            />

            <input
              type="number"
              placeholder="Birds Alive"
              value={birds}
              onChange={(e) => setBirds(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
            />

            <input
              type="number"
              placeholder="Crates"
              value={crates}
              onChange={(e) => setCrates(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
            />

            <input
              type="number"
              placeholder="Pieces"
              value={pieces}
              onChange={(e) => setPieces(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
            />

            <input
              type="number"
              placeholder="Broken Eggs"
              value={brokenEggs}
              onChange={(e) => setBrokenEggs(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
            />

            <input
              type="number"
              placeholder="Mortality"
              value={mortality}
              onChange={(e) => setMortality(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
            />

            <textarea
              placeholder="Notes (Optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Production"}
            </button>
          </form>
        </SectionCard>
      </div>
    </AppLayout>
  );
}