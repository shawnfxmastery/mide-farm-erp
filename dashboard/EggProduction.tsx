"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EggProduction() {
  const [birds, setBirds] = useState("");
  const [crates, setCrates] = useState("");
  const [pieces, setPieces] = useState("");
  const [brokenEggs, setBrokenEggs] = useState("");
  const [notes, setNotes] = useState("");
  const [mortality, setMortality] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  async function saveProduction() {
    if (!birds || !crates) return;

    const { error } = await supabase
      .from("egg_production")
      .insert([
        {
          date,
          birds: Number(birds),
          crates: Number(crates),
          pieces: Number(pieces),
          broken_eggs: Number(brokenEggs),
          mortality: Number(mortality),
          note: notes,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Production saved successfully!");

    setBirds("");
    setCrates("");
    setPieces("");
    setBrokenEggs("");
    setMortality("");
    setNotes("");

    window.location.reload();
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 lg:p-8 shadow-xl">

      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        🥚 Egg Production
      </h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Birds
            </label>

            <input
              value={birds}
              onChange={(e) => setBirds(e.target.value)}
              placeholder="1945"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Crates
            </label>

            <input
              value={crates}
              onChange={(e) => setCrates(e.target.value)}
              placeholder="55"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
            />
          </div>

        </div>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Extra Pieces
            </label>

            <input
              value={pieces}
              onChange={(e) => setPieces(e.target.value)}
              placeholder="12"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Broken Eggs
            </label>

            <input
              value={brokenEggs}
              onChange={(e) => setBrokenEggs(e.target.value)}
              placeholder="3"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Mortality
            </label>

            <input
              value={mortality}
              onChange={(e) => setMortality(e.target.value)}
              placeholder="0"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Note
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
              rows={4}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
            />
          </div>

        </div>

      </div>

      <button
        onClick={saveProduction}
        className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-green-500 sm:w-auto"
      >
        Save Production
      </button>

      <hr className="my-10 border-slate-700" />

      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        📋 Production History
      </h2>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-slate-400">
        We'll load your daily production records here.
      </div>

    </div>
  );
}