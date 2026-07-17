"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BirdDetailsModal from "./BirdDetailsModal";
import EditBirdModal from "./EditBirdModal";
import type { BirdBatch } from "@/types/bird";

export default function BirdHistory() {
  const [records, setRecords] = useState<BirdBatch[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBird, setSelectedBird] = useState<BirdBatch | null>(null);
  const [editingBird, setEditingBird] = useState<BirdBatch | null>(null);

  useEffect(() => {
    loadBirds();
  }, []);

  async function loadBirds() {
    const { data, error } = await supabase
      .from("bird_batches")
      .select("*")
      .order("arrival_date", { ascending: false });

    if (!error && data) {
      setRecords(data);
    }
  }

  async function deleteBatch(id: number) {
    const confirmDelete = confirm(
      "Delete this bird batch?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bird_batches")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadBirds();
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        🐔 Bird Batch History
      </h2>

      <div className="mb-6">

  <input
    type="text"
    placeholder="🔍 Search batch, breed or supplier..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl bg-slate-800 px-4 py-4 text-white placeholder-slate-500"
  />

</div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left text-slate-400">

              <th className="py-3">Batch</th>
              <th>Breed</th>
              <th>Arrival</th>
              <th>Alive</th>
              <th>Mortality</th>
              <th>Mortality %</th>
              <th>Health</th>
              <th>Age</th>
              <th>Stage</th>
              <th>Supplier</th>
              <th>Vaccination</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>
  {records
    .filter((bird) => {
      const text = search.toLowerCase();

      return (
        bird.batch_number.toLowerCase().includes(text) ||
        bird.breed.toLowerCase().includes(text) ||
        bird.supplier.toLowerCase().includes(text)
      );
    })
    .map((bird) => (
      <tr
        key={bird.id}
        className="border-b border-slate-800 hover:bg-slate-800/40"
      >
        <td className="py-4 font-semibold">
          {bird.batch_number}
        </td>

        <td>{bird.breed}</td>

        <td>{bird.arrival_date}</td>

        <td className="font-semibold text-green-400">
          {bird.alive}
        </td>

        <td className="text-red-400">
          {bird.mortality}
        </td>

        <td className="text-yellow-400">
          {Number(bird.mortality_percentage).toFixed(1)}%
        </td>

        <td>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              bird.health_status === "Healthy"
                ? "bg-green-500/20 text-green-300"
                : bird.health_status === "Monitor"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {bird.health_status}
          </span>
        </td>

        <td>{bird.age_weeks} Weeks</td>

        <td>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              bird.stage === "Brooding"
                ? "bg-purple-500/20 text-purple-300"
                : bird.stage === "Growing"
                ? "bg-blue-500/20 text-blue-300"
                : bird.stage === "Point of Lay"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-green-500/20 text-green-300"
            }`}
          >
            {bird.stage}
          </span>
        </td>

        <td>{bird.supplier}</td>

        <td>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              bird.vaccination_status === "Completed"
                ? "bg-green-500/20 text-green-300"
                : bird.vaccination_status === "In Progress"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {bird.vaccination_status}
          </span>
        </td>

        <td>
          <div className="flex gap-2">

  <button
    onClick={() => setSelectedBird(bird)}
    className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
  >
    👁 View
  </button>

  <button
  onClick={() => setEditingBird(bird)}
  className="rounded-lg bg-yellow-500 px-3 py-1 text-black hover:bg-yellow-400"
>
  ✏ Edit
</button>

  <button
    onClick={() => deleteBatch(bird.id)}
    className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-500"
  >
    🗑 Delete
  </button>

</div>
        </td>
      </tr>
    ))}
</tbody>

        </table>

      </div>

<BirdDetailsModal
  bird={selectedBird}
  onClose={() => setSelectedBird(null)}
/>

<EditBirdModal
  bird={editingBird}
  onClose={() => setEditingBird(null)}
  onSaved={loadBirds}
/>

</div>
  );
}