"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Worker = {
  id: number;
  full_name: string;
  phone: string;
  position: string;
  salary: number;
  address: string;
  status: string;
};

type Props = {
  worker: Worker | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function EditWorkerModal({
  worker,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<Worker>(worker as Worker);

  useEffect(() => {
    if (worker) {
      setForm(worker);
    }
  }, [worker]);

  if (!worker || !form) return null;

  async function saveChanges() {
    const { error } = await supabase
      .from("workers")
      .update({
        full_name: form.full_name,
        phone: form.phone,
        position: form.position,
        salary: form.salary,
        address: form.address,
        status: form.status,
      })
      .eq("id", form.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Worker updated successfully!");

    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-8 text-3xl font-bold">
          👷 Edit Worker
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <label>Full Name</label>
            <input
              value={form.full_name}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div>
            <label>Position</label>
            <input
              value={form.position}
              onChange={(e) =>
                setForm({ ...form, position: e.target.value })
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div>
            <label>Salary</label>
            <input
              type="number"
              value={form.salary}
              onChange={(e) =>
                setForm({
                  ...form,
                  salary: Number(e.target.value),
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label>Address</label>
            <textarea
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div>
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-6 py-3"
          >
            Cancel
          </button>

          <button
            onClick={saveChanges}
            className="rounded-xl bg-green-600 px-6 py-3"
          >
            💾 Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}