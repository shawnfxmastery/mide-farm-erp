"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Production = {
  id: number;
  birds: number;
  crates: number;
  created_at: string;
};

type Props = {
  production: Production | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function EditProductionModal({
  production,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<Production | null>(null);

  useEffect(() => {
    if (production) {
      setForm(production);
    }
  }, [production]);

  if (!production || !form) return null;

  async function saveChanges() {
  if (!form) return;

  const production = form;

  const { error } = await supabase
    .from("egg_production")
    .update({
      birds: production.birds,
      crates: production.crates,
    })
    .eq("id", production.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Production updated successfully!");

    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <h2 className="mb-8 text-3xl font-bold text-white">
          ✏ Edit Production
        </h2>

        <div className="space-y-6">

          <div>
            <label className="mb-2 block text-slate-400">
              Birds
            </label>

            <input
              type="number"
              value={form.birds}
              onChange={(e) =>
                setForm({
                  ...form,
                  birds: Number(e.target.value),
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-400">
              Crates
            </label>

            <input
              type="number"
              value={form.crates}
              onChange={(e) =>
                setForm({
                  ...form,
                  crates: Number(e.target.value),
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3 text-white"
            />
          </div>

          <div className="flex justify-end gap-4">

            <button
              onClick={onClose}
              className="rounded-xl bg-slate-700 px-6 py-3 text-white hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              onClick={saveChanges}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
            >
              💾 Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}