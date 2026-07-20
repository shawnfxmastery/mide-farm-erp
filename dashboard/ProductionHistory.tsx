"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [editingRecord, setEditingRecord] =
    useState<Production | null>(null);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const date = new Date(record.created_at)
        .toLocaleDateString()
        .toLowerCase();

      const note = (record.note || "").toLowerCase();

      return (
        date.includes(search.toLowerCase()) ||
        note.includes(search.toLowerCase())
      );
    });
  }, [records, search]);

  const totalCrates = useMemo(() => {
    return records.reduce(
      (sum, record) => sum + record.crates,
      0
    );
  }, [records]);

  const totalEggs = useMemo(() => {
    return records.reduce(
      (sum, record) =>
        sum + record.crates * 30 + record.pieces,
      0
    );
  }, [records]);

  const averageProduction = useMemo(() => {
    if (records.length === 0) return "0";

    const avg =
      records.reduce((sum, record) => {
        const eggs =
          record.crates * 30 + record.pieces;

        return sum + (eggs / record.birds) * 100;
      }, 0) / records.length;

    return avg.toFixed(1);
  }, [records]);

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
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-6 lg:p-8">

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            📋 Production History
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            View, edit and manage all production records.
          </p>
        </div>

        <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
          {filteredRecords.length} Records
        </div>

      </div>
            {/* Summary Cards */}

      <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">

          <p className="text-sm text-slate-400">
            🥚 Total Crates
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-400 sm:text-4xl">
            {totalCrates.toLocaleString()}
          </h2>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">

          <p className="text-sm text-slate-400">
            🥚 Total Eggs
          </p>

          <h2 className="mt-3 text-3xl font-bold text-blue-400 sm:text-4xl">
            {totalEggs.toLocaleString()}
          </h2>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">

          <p className="text-sm text-slate-400">
            📋 Records
          </p>

          <h2 className="mt-3 text-3xl font-bold text-yellow-400 sm:text-4xl">
            {records.length}
          </h2>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">

          <p className="text-sm text-slate-400">
            📈 Avg Production
          </p>

          <h2 className="mt-3 text-3xl font-bold text-purple-400 sm:text-4xl">
            {averageProduction}%
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="mb-8">

        <input
          type="text"
          placeholder="🔍 Search by date or note..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white placeholder-slate-500 outline-none transition focus:border-green-500"
        />

      </div>
            {/* Desktop Table */}

      <div className="hidden overflow-x-auto rounded-2xl border border-slate-800 lg:block">

        <table className="min-w-full">

          <thead className="bg-slate-800">

            <tr className="text-left text-sm uppercase tracking-wider text-slate-400">

              <th className="px-5 py-4">Date</th>

              <th className="px-5 py-4">Birds</th>

              <th className="px-5 py-4">Crates</th>

              <th className="px-5 py-4">Pieces</th>

              <th className="px-5 py-4">Total Eggs</th>

              <th className="px-5 py-4">Broken</th>

              <th className="px-5 py-4">Mortality</th>

              <th className="px-5 py-4">Production</th>

              <th className="px-5 py-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredRecords.length === 0 ? (

              <tr>

                <td
                  colSpan={9}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No production records found.
                </td>

              </tr>

            ) : (

              filteredRecords.map((record) => {

                const totalEggs =
                  record.crates * 30 + record.pieces;

                const production = (
                  (totalEggs / record.birds) * 100
                ).toFixed(1);

                return (
                                    <tr
                    key={record.id}
                    className="border-t border-slate-800 transition hover:bg-slate-800/50"
                  >
                    <td className="px-5 py-4">
                      {new Date(
                        record.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      {record.birds.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 font-semibold text-green-400">
                      {record.crates}
                    </td>

                    <td className="px-5 py-4">
                      {record.pieces}
                    </td>

                    <td className="px-5 py-4 font-semibold text-blue-400">
                      {totalEggs.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      {record.broken_eggs}
                    </td>

                    <td className="px-5 py-4">
                      {record.mortality}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                        {production}%
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            setEditingRecord(record)
                          }
                          className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
                        >
                          ✏ Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteRecord(record.id)
                          }
                          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                        >
                          🗑 Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                                  );
              })
            )}

          </tbody>

        </table>

      </div>

      {/* ===========================
          MOBILE CARD VIEW
      ============================ */}

      <div className="space-y-4 lg:hidden">

        {filteredRecords.length === 0 ? (

          <div className="rounded-2xl border border-slate-800 bg-slate-800 p-8 text-center">

            <div className="text-5xl">
              🥚
            </div>

            <h3 className="mt-4 text-xl font-bold text-white">
              No Production Records
            </h3>

            <p className="mt-2 text-slate-400">
              Record today's production to see data here.
            </p>

          </div>

        ) : (

          filteredRecords.map((record) => {

            const totalEggs =
              record.crates * 30 + record.pieces;

            const production = (
              (totalEggs / record.birds) * 100
            ).toFixed(1);

            return (
                            <div
                key={record.id}
                className="rounded-2xl border border-slate-800 bg-slate-800 p-5 shadow-lg"
              >

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-widest text-slate-500">
                      Production Date
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-white">
                      {new Date(record.created_at).toLocaleDateString()}
                    </h3>

                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                    {production}%
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      🐔 Birds
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-white">
                      {record.birds.toLocaleString()}
                    </h4>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      🥚 Crates
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-green-400">
                      {record.crates}
                    </h4>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      🥚 Total Eggs
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-blue-400">
                      {totalEggs.toLocaleString()}
                    </h4>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      🥚 Pieces
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-white">
                      {record.pieces}
                    </h4>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      💥 Broken Eggs
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-red-400">
                      {record.broken_eggs}
                    </h4>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      ☠ Mortality
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-orange-400">
                      {record.mortality}
                    </h4>
                  </div>

                </div>
                                {record.note && (
                  <div className="mt-4 rounded-xl bg-slate-900 p-4">
                    <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                      📝 Note
                    </p>

                    <p className="text-sm text-slate-300">
                      {record.note}
                    </p>
                  </div>
                )}

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <button
                    onClick={() => setEditingRecord(record)}
                    className="rounded-xl bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400 active:scale-95"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500 active:scale-95"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>
                          );
          })
        )}

      </div>

      <EditProductionModal
        production={editingRecord}
        onClose={() => setEditingRecord(null)}
        onSaved={() => {
          setEditingRecord(null);
          loadHistory();
        }}
      />
          </div>
  );
}