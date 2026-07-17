"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Expense } from "@/types/expense";

type Props = {
  expense: Expense | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function EditExpenseModal({
  expense,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<Expense | null>(null);

  useEffect(() => {
    if (expense) {
      setForm(expense);
    }
  }, [expense]);

  if (!expense || !form) return null;

  async function saveChanges() {
  if (!form) return;

  const expense = form;

  console.log("Expense ID:", expense.id);
  console.log("Expense object:", expense);

  const { data, error } = await supabase
  .from("expenses")
  .update({
    date: expense.date,
    category: expense.category,
    description: expense.description,
    vendor: expense.vendor,
    amount: expense.amount,
    payment_method: expense.payment_method,
  })
  .eq("id", expense.id)
.select()
.single();

console.log("Updated rows:", data);
console.log("Error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Expense updated successfully!");

    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 p-8">

        <h2 className="mb-6 text-3xl font-bold text-white">
  ✏ Edit Expense
</h2>

<div className="space-y-4">

  <div>
    <label className="mb-2 block text-slate-400">
      Date
    </label>

    <input
      type="date"
      value={form.date}

onChange={(e) =>
  setForm({
    ...form,
    date: e.target.value,
  })
}
      className="w-full rounded-xl bg-slate-800 p-3 text-white"
    />
  </div>

  <div>
    <label className="mb-2 block text-slate-400">
      Category
    </label>

    <input
  value={form.category}
  onChange={(e) =>
    setForm({
      ...form,
      category: e.target.value,
    })
  }
  className="w-full rounded-xl bg-slate-800 p-3 text-white"
/>
  </div>

  <div>
    <label className="mb-2 block text-slate-400">
      Description
    </label>

    <input
  value={form.description}
  onChange={(e) =>
    setForm({
      ...form,
      description: e.target.value,
    })
  }
  className="w-full rounded-xl bg-slate-800 p-3 text-white"
/>
  </div>

  <div>
    <label className="mb-2 block text-slate-400">
      Vendor
    </label>

    <input
  value={form.vendor}
  onChange={(e) =>
    setForm({
      ...form,
      vendor: e.target.value,
    })
  }
  className="w-full rounded-xl bg-slate-800 p-3 text-white"
/>
  </div>

  <div>
    <label className="mb-2 block text-slate-400">
      Amount
    </label>

    <input
  type="number"
  value={form.amount}
  onChange={(e) =>
    setForm({
      ...form,
      amount: Number(e.target.value),
    })
  }
  className="w-full rounded-xl bg-slate-800 p-3 text-white"
/>
  </div>

  <div>
    <label className="mb-2 block text-slate-400">
      Payment Method
    </label>

    <input
  value={form.payment_method}
  onChange={(e) =>
    setForm({
      ...form,
      payment_method: e.target.value,
    })
  }
  className="w-full rounded-xl bg-slate-800 p-3 text-white"
/>
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