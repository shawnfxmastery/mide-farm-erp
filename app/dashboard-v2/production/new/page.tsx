"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-3xl font-bold">
        Record Production
      </h1>

      <form
        onSubmit={saveProduction}
        className="mt-6 space-y-4"
      >
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Birds"
          value={birds}
          onChange={(e) => setBirds(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Crates"
          value={crates}
          onChange={(e) => setCrates(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Pieces"
          value={pieces}
          onChange={(e) => setPieces(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Broken Eggs"
          value={brokenEggs}
          onChange={(e) => setBrokenEggs(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Mortality"
          value={mortality}
          onChange={(e) => setMortality(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-xl border p-3"
          rows={4}
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-green-600 p-4 font-semibold text-white"
        >
          {saving ? "Saving..." : "Save Production"}
        </button>
      </form>
    </div>
  );
}