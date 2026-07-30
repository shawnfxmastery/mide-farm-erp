"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProduction } from "@/lib/services/production";
import ConfirmDialog from "@/components/v2/ui/ConfirmDialog";
import { useToast } from "@/components/v2/ui/useToast";

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
  useState<Production | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { showToast } = useToast();

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

  function deleteRecord(record: Production) {
  setSelectedRecord(record);
  setConfirmOpen(true);
}

async function confirmDelete() {
  if (!selectedRecord) return;

  try {
    setDeleting(true);

    await deleteProduction(selectedRecord.id);

    await loadProduction();

    showToast(
      "Success",
      "Production record deleted successfully.",
      "success"
    );
  } catch (error) {
    console.error(error);

    showToast(
      "Error",
      "Failed to delete production record.",
      "error"
    );
  } finally {
    setDeleting(false);
    setConfirmOpen(false);
    setSelectedRecord(null);
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
  disabled={deleting}
  onClick={() => deleteRecord(record)}
  className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50 disabled:opacity-60"
>
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <ConfirmDialog
  open={confirmOpen}
  title="Delete Production Record"
  message="Are you sure you want to delete this production record? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  confirmColor="red"
  loading={deleting}
  onConfirm={confirmDelete}
  onCancel={() => {
    if (!deleting) {
      setConfirmOpen(false);
      setSelectedRecord(null);
    }
  }}
/>
    </div>
  );
}