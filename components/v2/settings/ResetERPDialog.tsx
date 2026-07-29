"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { resetERP } from "@/lib/services/resetERP";

export default function ResetERPDialog() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const canReset = confirm === "RESET";

  async function handleReset() {
    if (!canReset) return;

    try {
      setLoading(true);

      await resetERP();

      toast.success("ERP reset successfully.");

      setOpen(false);
      setConfirm("");

      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to reset ERP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Reset ERP
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

            <div className="flex items-center gap-3">
              <AlertTriangle
                className="text-red-600"
                size={34}
              />

              <h2 className="text-2xl font-bold">
                Reset ERP Data
              </h2>
            </div>

            <p className="mt-5 text-slate-600">
              This action will permanently:
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>✓ Delete all production records</li>
              <li>✓ Delete all egg sales records</li>
              <li>✓ Delete all expense records</li>
              <li>✓ Delete all inventory activity</li>
              <li>✓ Reset inventory to 0 Crates + 0 Pieces</li>
            </ul>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Type <span className="font-bold text-red-600">RESET</span> to continue
              </label>

              <input
                type="text"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Type RESET"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-red-500"
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => {
                  setOpen(false);
                  setConfirm("");
                }}
                disabled={loading}
                className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleReset}
                disabled={!canReset || loading}
                className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset ERP"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}