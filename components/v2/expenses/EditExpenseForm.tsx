"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Props = {
  id: string;
};

export default function EditExpenseForm({ id }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [vendor, setVendor] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadExpense();
  }, []);

  async function loadExpense() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      router.push("/dashboard-v2/expenses");
      return;
    }

    setDate(data.date ?? "");
    setCategory(data.category ?? "");
    setDescription(data.description ?? "");
    setAmount(String(data.amount ?? ""));
    setPaymentMethod(data.payment_method ?? "");
    setVendor(data.vendor ?? "");
    setNotes(data.notes ?? "");

    setLoading(false);
  }

  async function updateExpense(e: React.FormEvent) {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("expenses")
      .update({
        date,
        category,
        description,
        amount: Number(amount),
        payment_method: paymentMethod,
        vendor,
        notes,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Expense updated successfully!");

    router.push("/dashboard-v2/expenses");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-center text-slate-500">
          Loading expense...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={updateExpense}
      className="rounded-3xl bg-white p-8 shadow-lg space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">
          Edit Expense
        </h1>

        <p className="mt-1 text-slate-500">
          Update this expense record.
        </p>
      </div>

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

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <input
          type="text"
          placeholder="Expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Amount (₦)
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border p-3"
          required
        />
      </div>

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

      <div>
        <label className="mb-2 block text-sm font-medium">
          Vendor / Supplier
        </label>

        <input
          type="text"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Vendor name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Notes
        </label>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Additional notes..."
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {saving ? "Updating Expense..." : "Update Expense"}
      </button>
    </form>
  );
}