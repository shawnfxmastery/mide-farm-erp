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
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold mb-6">
        🥚 Egg Production
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

  <div>

    <label className="text-slate-400">
      Date
    </label>

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="mt-2 w-full rounded-xl bg-slate-800 p-3"
    />

  </div>

  <div>

    <label className="text-slate-400">
      Birds
    </label>

    <input
      value={birds}
      onChange={(e) => setBirds(e.target.value)}
      className="mt-2 w-full rounded-xl bg-slate-800 p-3"
      placeholder="1945"
    />

  </div>

        <div>

          <label className="text-slate-400">
            Crates
          </label>

          <input
            value={crates}
            onChange={(e) => setCrates(e.target.value)}
            className="mt-2 w-full rounded-xl bg-slate-800 p-3"
            placeholder="55"
      />
      <label className="mt-4 block">
  Extra Pieces
</label>

<input
  value={pieces}
  onChange={(e) => setPieces(e.target.value)}
  className="mt-2 w-full rounded-xl bg-slate-800 p-3"
  placeholder="12"
/>
<label className="mt-4 block text-slate-400">
  Broken Eggs
</label>

<input
  value={brokenEggs}
  onChange={(e) => setBrokenEggs(e.target.value)}
  className="mt-2 w-full rounded-xl bg-slate-800 p-3"
  placeholder="3"
/>
<label className="mt-4 block text-slate-400">
  Mortality
</label>

<input
  value={mortality}
  onChange={(e) => setMortality(e.target.value)}
  className="mt-2 w-full rounded-xl bg-slate-800 p-3"
  placeholder="0"
/>
<label className="mt-4 block text-slate-400">
  Note
</label>

<textarea
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  className="mt-2 w-full rounded-xl bg-slate-800 p-3"
  placeholder="Optional notes..."
/>

        </div>

      </div>

     <button
  onClick={saveProduction}
  className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-500"
>
  Save Production
</button>

<hr className="my-10 border-slate-700" />

<h2 className="mb-6 text-2xl font-bold">
  📋 Production History
</h2>

<p className="text-slate-400">
  We'll load your daily production records here.
</p>

    </div>
  );
}