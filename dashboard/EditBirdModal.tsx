"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { BirdBatch } from "@/types/bird";

type Props = {
  bird: BirdBatch | null;
  onClose: () => void;
  onSaved: () => void;
};

const vaccinationOptions = [
  "Completed",
  "In Progress",
  "Not Started",
];

export default function EditBirdModal({
  bird,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<BirdBatch | null>(null);

  useEffect(() => {
  if (bird) {
    setForm(bird);
  }
}, [bird]);

  if (!bird || !form) return null;

  async function saveChanges() {
  if (!form) return;
  if (form.mortality > form.quantity) {
  alert("Mortality cannot be greater than Quantity.");
  return;
}

  //----------------------------------
// Auto Calculate
//----------------------------------

const alive = form.quantity - form.mortality;

const mortalityPercentage =
  form.quantity > 0
    ? (form.mortality / form.quantity) * 100
    : 0;

//---------------------------
// Age in Weeks
//---------------------------

const today = new Date();

const arrival = new Date(form.arrival_date);

const diffDays =
  (today.getTime() - arrival.getTime()) /
  (1000 * 60 * 60 * 24);

const ageWeeks = Math.floor(diffDays / 7);

//---------------------------
// Stage
//---------------------------

let stage = "";

if (ageWeeks <= 6) {

  stage = "Brooding";

} else if (ageWeeks <= 16) {

  stage = "Growing";

} else if (ageWeeks <= 20) {

  stage = "Point of Lay";

} else {

  stage = "Laying";

}

//---------------------------
// Health
//---------------------------

let healthStatus = "";

if (mortalityPercentage < 2) {

  healthStatus = "Healthy";

} else if (mortalityPercentage < 5) {

  healthStatus = "Monitor";

} else {

  healthStatus = "High Risk";

}

  //----------------------------------
  // Update
  //----------------------------------

  const { error } = await supabase
    .from("bird_batches")
    .update({
      batch_number: form.batch_number,
      breed: form.breed,
      arrival_date: form.arrival_date,
      quantity: form.quantity,
      mortality: form.mortality,
      supplier: form.supplier,
      vaccination_status: form.vaccination_status,
      notes: form.notes,

      alive,
      mortality_percentage: mortalityPercentage,
      age_weeks: ageWeeks,
      stage,
      health_status: healthStatus,
    })
    .eq("id", form.id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Bird batch updated successfully!");

  onSaved();
  onClose();
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            ✏ Edit Bird Batch
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            ✕ Close
          </button>

        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-slate-400">
              Batch Number
            </label>

            <input
  value={form.batch_number}
  onChange={(e) =>
    setForm({
      ...form,
      batch_number: e.target.value,
    })
  }
  className="w-full rounded-xl bg-slate-800 p-3 text-white"
/>
          </div>

          <div>
            <label className="mb-2 block text-slate-400">
              Breed
            </label>

            <input
  value={form.breed}
  onChange={(e) =>
    setForm({
      ...form,
      breed: e.target.value,
    })
  }
  className="w-full rounded-xl bg-slate-800 p-3 text-white"
/>
          </div>

          <div>
  <label className="mb-2 block text-slate-400">
    Quantity
  </label>

  <input
    type="number"
    value={form.quantity}
    onChange={(e) =>
      setForm({
        ...form,
        quantity: Number(e.target.value),
      })
    }
    className="w-full rounded-xl bg-slate-800 p-3 text-white"
  />
</div>

<div>
  <label className="mb-2 block text-slate-400">
    Arrival Date
  </label>

  <input
    type="date"
    value={form.arrival_date}
    onChange={(e) =>
      setForm({
        ...form,
        arrival_date: e.target.value,
      })
    }
    className="w-full rounded-xl bg-slate-800 p-3 text-white"
  />
</div>

<div>
  <label className="mb-2 block text-slate-400">
    Mortality
  </label>

  <input
    type="number"
    value={form.mortality}
    onChange={(e) =>
      setForm({
        ...form,
        mortality: Number(e.target.value),
      })
    }
    className="w-full rounded-xl bg-slate-800 p-3 text-white"
  />
</div>

<div>
  <label className="mb-2 block text-slate-400">
    Supplier
  </label>

  <input
    value={form.supplier}
    onChange={(e) =>
      setForm({
        ...form,
        supplier: e.target.value,
      })
    }
    className="w-full rounded-xl bg-slate-800 p-3 text-white"
  />
</div>

<div>
  <label className="mb-2 block text-slate-400">
    Vaccination Status
  </label>

  <select
    value={form.vaccination_status}
    onChange={(e) =>
      setForm({
        ...form,
        vaccination_status: e.target.value,
      })
    }
    className="w-full rounded-xl bg-slate-800 p-3 text-white"
  >
    {vaccinationOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div className="md:col-span-2">
  <label className="mb-2 block text-slate-400">
    Notes
  </label>

  <textarea
    value={form.notes}
    onChange={(e) =>
      setForm({
        ...form,
        notes: e.target.value,
      })
    }
    className="h-32 w-full rounded-xl bg-slate-800 p-3 text-white"
  />
</div>

          <div className="md:col-span-2 mt-8 flex justify-end gap-4">

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