"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BirdMortality() {
  const [date, setDate] = useState("");
  const [birdsDead, setBirdsDead] = useState("");
  const [cause, setCause] = useState("");
  const [notes, setNotes] = useState("");

  async function saveMortality() {
    const { error } = await supabase
      .from("bird_mortality")
      .insert([
        {
          date,
          birds_dead: Number(birdsDead),
          cause,
          notes,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Mortality record saved!");

    setDate("");
    setBirdsDead("");
    setCause("");
    setNotes("");
  }

  return (
    <div className="mt-10 rounded-2xl bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        🐔 Bird Mortality
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div>
          <label className="block mb-2 text-slate-400">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Birds Dead
          </label>

          <input
            type="number"
            value={birdsDead}
            onChange={(e) => setBirdsDead(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Cause
          </label>

          <input
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
            placeholder="Disease, Injury..."
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Notes
          </label>

          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
            placeholder="Optional"
          />
        </div>

      </div>

      <button
        onClick={saveMortality}
        className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-500"
      >
        Save Mortality
      </button>
    </div>
  );
}