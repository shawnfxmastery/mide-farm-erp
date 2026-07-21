"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Props = {
  id: string;
};

export default function EditProductionForm({ id }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [date, setDate] = useState("");
  const [birds, setBirds] = useState("");
  const [crates, setCrates] = useState("");
  const [pieces, setPieces] = useState("");
  const [brokenEggs, setBrokenEggs] = useState("");
  const [mortality, setMortality] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    loadRecord();
  }, []);

  async function loadRecord() {
    const { data, error } = await supabase
      .from("egg_production")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      toast.error(error.message);
      router.push("/dashboard-v2/production");
      return;
    }

    setDate(data.date);
    setBirds(String(data.birds));
    setCrates(String(data.crates));
    setPieces(String(data.pieces));
    setBrokenEggs(String(data.broken_eggs));
    setMortality(String(data.mortality));
    setNote(data.note ?? "");

    setLoading(false);
  }

  async function updateProduction(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("egg_production")
      .update({
        date,
        birds: Number(birds),
        crates: Number(crates),
        pieces: Number(pieces),
        broken_eggs: Number(brokenEggs),
        mortality: Number(mortality),
        note,
      })
      .eq("id", Number(id));

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Production updated successfully!");

    router.push("/dashboard-v2/production");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Production
      </h1>

      <form
        onSubmit={updateProduction}
        className="space-y-4"
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
          rows={4}
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-green-600 p-4 font-semibold text-white"
        >
          {saving ? "Updating..." : "Update Production"}
        </button>
      </form>
    </div>
  );
}