"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Sale } from "@/types/sale";

type Props = {
  sale: Sale | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function EditSaleModal({
  sale,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<Sale | null>(null);

  useEffect(() => {
    if (sale) {
      setForm(sale);
    }
  }, [sale]);

  if (!sale || !form) return null;

  async function saveChanges() {
  if (!form) return;

  const { error } = await supabase
    .from("egg_sales")
    .update({
      customer: form.customer,
      crates: form.crates,
      price_per_crate: form.price_per_crate,
      total_amount: form.total_amount,
      payment_status: form.payment_status,
    })
    .eq("id", form.id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Sale updated successfully!");

  onSaved();
  onClose();
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 p-8">

        <h2 className="mb-6 text-3xl font-bold text-white">
          ✏ Edit Sale
        </h2>

        <div className="space-y-4">

  <div>
    <label className="mb-2 block text-slate-400">
      Customer
    </label>

    <input
      value={form.customer}
      onChange={(e) =>
        setForm({
          ...form,
          customer: e.target.value,
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
        total_amount:
          Number(e.target.value) * form.price_per_crate,
      })
    }
    className="w-full rounded-xl bg-slate-800 p-3 text-white"
  />
</div>

<div>
  <label className="mb-2 block text-slate-400">
    Price Per Crate
  </label>

  <input
    type="number"
    value={form.price_per_crate}
    onChange={(e) =>
      setForm({
        ...form,
        price_per_crate: Number(e.target.value),
        total_amount:
          form.crates * Number(e.target.value),
      })
    }
    className="w-full rounded-xl bg-slate-800 p-3 text-white"
  />
</div>

<div>
  <label className="mb-2 block text-slate-400">
    Total Amount
  </label>

  <input
    value={`₦${form.total_amount.toLocaleString()}`}
    readOnly
    className="w-full rounded-xl bg-slate-700 p-3 font-bold text-green-400"
  />
</div>

<div>
  <label className="mb-2 block text-slate-400">
    Payment Status
  </label>

  <select
    value={form.payment_status}
    onChange={(e) =>
      setForm({
        ...form,
        payment_status: e.target.value,
      })
    }
    className="w-full rounded-xl bg-slate-800 p-3 text-white"
  >
    <option value="Paid">Paid</option>
    <option value="Owing">Owing</option>
  </select>
</div>

<div className="mt-8 flex justify-end gap-4">
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