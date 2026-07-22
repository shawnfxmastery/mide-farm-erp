"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function NewExpenseForm() {
  const router = useRouter();

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
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
      className="rounded-3xl bg-white p-8 shadow-lg space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">
          New Expense
        </h1>

        <p className="text-slate-500 mt-1">
          Record a farm expense.
        </p>
      </div>

      {/* Date */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border p-3"
          required
        />
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border p-3"
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