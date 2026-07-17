"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ExpensesNew() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transfer");

  async function saveExpense() {
    const { error } = await supabase
      .from("expenses")
      .insert([
        {
          date,
          category,
          description,
          vendor,
          amount: Number(amount),
          payment_method: paymentMethod,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Expense saved successfully!");

    setDate("");
    setCategory("");
    setDescription("");
    setVendor("");
    setAmount("");
    setPaymentMethod("Transfer");

    window.location.reload();
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        💸 Record Expense
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <input
          placeholder="Vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        >
          <option>Transfer</option>
          <option>Cash</option>
          <option>POS</option>
          <option>Cheque</option>
        </select>

      </div>

      <div className="mt-6 rounded-2xl bg-red-600 p-4 text-center">

        <p className="text-sm">
          Expense Amount
        </p>

        <h2 className="text-3xl font-bold">
          ₦{Number(amount || 0).toLocaleString()}
        </h2>

      </div>

      <button
        onClick={saveExpense}
        className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-500"
      >
        Save Expense
      </button>

    </div>
  );
}