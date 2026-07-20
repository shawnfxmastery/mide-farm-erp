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
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 lg:p-8 shadow-xl">

      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        💸 Record Expense
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Category
          </label>

          <input
            placeholder="Feed, Fuel, Salary..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Description
          </label>

          <input
            placeholder="Expense description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Vendor
          </label>

          <input
            placeholder="Vendor Name"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Amount
          </label>

          <input
            type="number"
            placeholder="50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-red-500 focus:outline-none"
          >
            <option>Transfer</option>
            <option>Cash</option>
            <option>POS</option>
            <option>Cheque</option>
          </select>
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-red-700 p-5 text-center">

        <p className="text-sm text-red-100">
          Expense Amount
        </p>

        <h2 className="mt-2 break-words text-2xl font-bold sm:text-3xl">
          ₦{Number(amount || 0).toLocaleString()}
        </h2>

      </div>

      <button
        onClick={saveExpense}
        className="mt-6 w-full rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-red-500 sm:w-auto"
      >
        Save Expense
      </button>

    </div>
  );
}