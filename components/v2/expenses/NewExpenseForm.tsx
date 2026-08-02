"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { getTodayNigeria } from "@/lib/date";

export default function NewExpenseForm() {
  const router = useRouter();

  const [date, setDate] = useState(
  getTodayNigeria()
);

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [vendor, setVendor] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveExpense(e: React.FormEvent) {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("expenses").insert({
      date,
      category,
      description,
      amount: Number(amount),
      payment_method: paymentMethod,
      vendor,
      notes,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Expense saved successfully!");

    router.push("/dashboard-v2/expenses");
    router.refresh();
  }

  return (
    <form
  onSubmit={saveExpense}
  className="space-y-8"
>
  

      {/* Expense Information */}

<div className="rounded-2xl border border-slate-200 p-5">

  <h2 className="mb-5 text-lg font-bold text-slate-900">
    💸 Expense Information
  </h2>

  <div className="grid gap-7 md:grid-cols-2">

    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Expense Date
      </label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full rounded-xl border border-slate-300 p-3"
        required
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Category
      </label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-xl border border-slate-300 p-3"
        required
      >
          <option value="">Select Category</option>

          <option value="Feed">Feed</option>
          <option value="Medication">Medication</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Salary">Salary</option>
          <option value="Fuel">Fuel</option>
          <option value="Transport">Transport</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Equipment">Equipment</option>
          <option value="Repairs">Repairs</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Packaging">Packaging</option>
          <option value="Security">Security</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Other">Other</option>
       </select>

    </div>

  </div>

</div>

{/* Expense Details */}

<div className="rounded-2xl border border-slate-200 p-5">

  <h2 className="mb-5 text-lg font-bold text-slate-900">
    📄 Expense Details
  </h2>

  <div className="space-y-5">
 
      {/* Description */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <input
          type="text"
          placeholder="e.g. Bought 20 bags of feed"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      {/* Amount */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Amount (₦)
        </label>

        <input
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border p-3"
          required
        />
      </div>

      {/* Payment Method */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-xl border p-3"
        >
          <option value="">Select Payment Method</option>

          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="POS">POS</option>
          <option value="Cheque">Cheque</option>
          <option value="Mobile Money">Mobile Money</option>
        </select>
      </div>

      {/* Vendor */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Vendor / Supplier
        </label>

        <input
          type="text"
          placeholder="Vendor name"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      </div>

</div>

{/* Expense Summary */}

<div className="rounded-3xl border border-green-200 bg-gradient-to-r from-green-50 to-white p-6">

  <h2 className="mb-6 text-lg font-bold text-slate-900">
    💰 Expense Summary
  </h2>

  <div className="flex items-center justify-between">

    <div>

      <p className="text-sm text-slate-500">
        Total Expense
      </p>

      <h3 className="mt-1 text-3xl font-bold text-red-600">
        ₦{Number(amount || 0).toLocaleString()}
      </h3>

    </div>

    <div className="rounded-2xl bg-red-100 px-5 py-4">

      <p className="text-xs text-red-700">
        Category
      </p>

      <p className="font-bold text-red-800">
        {category || "-"}
      </p>

    </div>

  </div>

</div>

{/* Notes */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Notes
        </label>

        <textarea
          rows={4}
          placeholder="Additional notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Saving Expense..." : "Save Expense"}
      </button>
    </form>
  );
}