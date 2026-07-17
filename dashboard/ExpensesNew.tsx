"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Expenses() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Feed");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  async function saveExpense() {
    const { error } = await supabase
      .from("expenses")
      .insert([
        {
          date,
          category,
          description,
          amount: Number(amount),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Expense saved!");

    setDate("");
    setCategory("Feed");
    setDescription("");
    setAmount("");
  }

  return (
    <div className="mt-10 rounded-2xl bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        💸 Expenses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div>
          <label className="block mb-2 text-slate-400">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
          >
            <option>Feed</option>
            <option>Medication</option>
            <option>Salary</option>
            <option>Diesel</option>
            <option>Electricity</option>
            <option>Water</option>
            <option>Transportation</option>
            <option>Repairs</option>
            <option>Packaging</option>
            <option>Miscellaneous</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Description
          </label>

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Feed Purchase"
            className="w-full rounded-lg bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="3350000"
            className="w-full rounded-lg bg-slate-800 p-3"
          />
        </div>

      </div>

      <button
        onClick={saveExpense}
        className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-500"
      >
        Save Expense
      </button>
    </div>
  );
}