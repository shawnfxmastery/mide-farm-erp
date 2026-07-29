"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProduction } from "@/lib/services/production";

type Production = {
  id: number;
  date: string;
  birds: number;
  crates: number;
  pieces: number;
  broken_eggs: number;
  mortality: number;
  note: string | null;
};

export default function ProductionList() {
  const [records, setRecords] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduction();
  }, []);

  async function loadProduction() {
    setLoading(true);

    const { data, error } = await supabase
      .from("egg_production")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Failed to load production:", error);
    } else {
      setRecords(data || []);
    }

    setLoading(false);
  }

  async function deleteRecord(record: Production) {
    const confirmed = window.confirm(
      "Delete this production record?\n\nThis action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await deleteProduction(record.id);

      await loadProduction();

      alert("Production deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete production record.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
        Loading production...
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-slate-500">
        No production records found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div
          key={record.id}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="w-full">
              <p className="font-semibold">
                {new Date(record.date).toLocaleDateString()}
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    🥚 Production
                  </span>

                  <span className="font-semibold">
                    {record.crates} Crates
                    {record.pieces > 0 &&
                      ` + ${record.pieces} Pieces`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    🐔 Birds Alive
                  </span>

                  <span className="font-semibold">
                    {record.birds.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    💔 Broken Eggs
                  </span>

                  <span className="font-semibold">
                    {record.broken_eggs}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    ☠️ Mortality
                  </span>

                  <span className="font-semibold">
                    {record.mortality}
                  </span>
                </div>
              </div>

              {record.note && (
                <p className="mt-2 text-sm italic text-slate-600">
                  {record.note}
                </p>
              )}

              <div className="mt-5 flex items-center gap-3">
                <Link
                  href={`/dashboard-v2/production/edit/${record.id}`}
                  className="flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
                >
                  <Pencil size={16} />
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() => deleteRecord(record)}
                  className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}