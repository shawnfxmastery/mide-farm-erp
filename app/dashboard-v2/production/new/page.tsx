"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { getInventory, updateInventory } from "@/lib/inventory";
import { logInventoryActivity } from "@/lib/inventoryActivity";

import SectionCard from "@/components/v2/ui/SectionCard";
import { getTodayNigeria } from "@/lib/date";

export default function NewProductionPage() {
  const router = useRouter();

  const [date, setDate] = useState(getTodayNigeria());

  const [birds, setBirds] = useState("");
  const [crates, setCrates] = useState("");
  const [pieces, setPieces] = useState("");
  const [brokenEggs, setBrokenEggs] = useState("");
  const [mortality, setMortality] = useState("");
  const [note, setNote] = useState("");

  const [saving, setSaving] = useState(false);

  async function saveProduction(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!birds) {
      toast.error("Please enter birds alive.");
      return;
    }

    if (!crates) {
      toast.error("Please enter crates produced.");
      return;
    }

    if (Number(pieces) > 29) {
      toast.error(
        "Pieces cannot be greater than 29."
      );
      return;
    }

    setSaving(true);

    try {
      const cratesProduced = Number(crates) || 0;
      const piecesProduced = Number(pieces) || 0;

      const { error } = await supabase
        .from("egg_production")
        .insert({
          date,
          birds: Number(birds),
          crates: cratesProduced,
          pieces: piecesProduced,
          broken_eggs: Number(brokenEggs),
          mortality: Number(mortality),
          note,
        });

      if (error) throw error;

      const inventory =
        await getInventory();

      await updateInventory(
        inventory.crates + cratesProduced,
        inventory.pieces + piecesProduced
      );

      await logInventoryActivity(
        "Production",
        cratesProduced,
        piecesProduced
      );

      toast.success(
        "Production saved successfully!"
      );

      router.push(
        "/dashboard-v2/production"
      );

      router.refresh();
    } catch (err: any) {
      toast.error(
        err.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
  <>
    <div className="mx-auto max-w-3xl space-y-6">

      {/* Back Button */}

      <Link
        href="/dashboard-v2/production"
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
      >
        <ArrowLeft size={20} />
      </Link>

      {/* Hero */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-green-500 p-6 text-white shadow-xl">

        <p className="text-sm text-green-100">
          Production Module
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          🥚 Record Production
        </h1>

        <p className="mt-2 text-green-100">
          Record today's production and automatically update egg inventory.
        </p>

      </div>

      <SectionCard>

        <form
          onSubmit={saveProduction}
          className="space-y-6"
        >

          {/* Production Information */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <h2 className="mb-5 text-lg font-bold text-slate-900">
              📅 Production Information
            </h2>

            <div className="space-y-5">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Production Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  🐔 Birds Alive
                </label>

                <input
                  type="number"
                  value={birds}
                  onChange={(e) =>
                    setBirds(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
                  placeholder="1930"
                />

              </div>

            </div>

          </div>

          {/* Egg Production */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <h2 className="mb-5 text-lg font-bold text-slate-900">
              🥚 Egg Production
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Crates
                </label>

                <input
                  type="number"
                  value={crates}
                  onChange={(e) =>
                    setCrates(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Pieces
                </label>

                <input
                  type="number"
                  value={pieces}
                  onChange={(e) =>
                    setPieces(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
                />

              </div>

            </div>

          </div>

          {/* Losses */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <h2 className="mb-5 text-lg font-bold text-slate-900">
              💔 Losses
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Broken Eggs
                </label>

                <input
                  type="number"
                  value={brokenEggs}
                  onChange={(e) =>
                    setBrokenEggs(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mortality
                </label>

                <input
                  type="number"
                  value={mortality}
                  onChange={(e) =>
                    setMortality(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-green-600"
                />

              </div>

            </div>

          </div>

                      {/* Notes */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <h2 className="mb-5 text-lg font-bold text-slate-900">
              📝 Notes
            </h2>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Optional notes about today's production..."
              className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-green-600"
            />

          </div>

          {/* Save Button */}

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-green-700 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              "Saving Production..."
            ) : (
              "🥚 Save Today's Production"
            )}
          </button>

        </form>

      </SectionCard>

    </div>

  </>
);
}