"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EditProductionModal from "./EditProductionModal";

type Production = {
  id: number;
  birds: number;
  crates: number;
  pieces: number;
  broken_eggs: number;
  mortality: number;
  note: string;
  created_at: string;
};

export default function ProductionHistory() {
  const [records, setRecords] = useState<Production[]>([]);
  const [search, setSearch] = useState("");
  const [editingRecord, setEditingRecord] = useState<Production | null>(null);

  async function loadHistory() {
    const { data, error } = await supabase
      .from("egg_production")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setRecords(data);
    }
  }

  async function deleteRecord(id: number) {
    const confirmDelete = confirm(
      "Delete this production record?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("egg_production")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadHistory();
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        📋 Production History
      </h2>
      
      <div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Search production..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl bg-slate-800 px-4 py-4 text-white placeholder-slate-500"
  />
</div>
<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">🥚 Total Crates</p>

    <h2 className="mt-3 text-4xl font-bold text-green-400">
      {records.reduce((sum, r) => sum + r.crates, 0)}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">🥚 Total Eggs</p>

<h2 className="mt-3 text-4xl font-bold text-blue-400">
  {records
    .reduce(
      (sum, r) => sum + (r.crates * 30 + r.pieces),
      0
    )
    .toLocaleString()}
</h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">📋 Records</p>

    <h2 className="mt-3 text-4xl font-bold text-yellow-400">
      {records.length}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">📈 Avg Production</p>

    <h2 className="mt-3 text-4xl font-bold text-purple-400">
      {records.length > 0
        ? (
            records.reduce(
              (sum, r) => sum + ((r.crates * 30) / r.birds) * 100,
              0
            ) / records.length
          ).toFixed(1)
        : "0"}
      %
    </h2>
  </div>

</div>
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left text-slate-400">

              <th className="py-3">Date</th>
              <th>Birds</th>
              <th>Crates</th>
              <th>Pieces</th>
              <th>Total Eggs</th>
              <th>Broken</th>
              <th>Mortality</th>
              <th>Production</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {records
  .filter((record) =>
    new Date(record.created_at)
      .toLocaleDateString()
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((record) => {

  const totalEggs =
    record.crates * 30 + record.pieces;

  const production = (
    (totalEggs / record.birds) * 100
  ).toFixed(1);

  return (

                <tr
                  key={record.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50"
                >

                  <td className="py-4">
                    {new Date(record.created_at).toLocaleDateString()}
                  </td>

                  <td>{record.birds}</td>

                  <td>{record.crates}</td>

                  <td>{record.pieces}</td>

                  <td className="font-semibold text-blue-400">
                     {totalEggs.toLocaleString()}
                  </td>

                  <td>{record.broken_eggs}</td>

                  <td>{record.mortality}</td>

                  <td className="font-semibold text-green-400">
                    {production}%
                  </td>

                  <td>
  <div className="flex gap-2">

    <button
      onClick={() => setEditingRecord(record)}
      className="rounded-lg bg-yellow-500 px-3 py-1 text-black hover:bg-yellow-400"
    >
      ✏ Edit
    </button>

    <button
      onClick={() => deleteRecord(record.id)}
      className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-500"
    >
      🗑 Delete
    </button>

  </div>
</td>

                </tr>

              );

            })}

                  </tbody>

      </table>

    </div>

    <EditProductionModal
      production={editingRecord}
      onClose={() => setEditingRecord(null)}
      onSaved={loadHistory}
    />

  </div>
);
}