"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EditExpenseModal from "./EditExpenseModal";

type Expense = {
  id: number;
  date: string;
  category: string;
  description: string;
  vendor: string;
  amount: number;
  payment_method: string;
};

export default function ExpensesHistory() {
  const [records, setRecords] = useState<Expense[]>([]);
  const [search, setSearch] = useState("");
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      setRecords(data);
    }
  }

  async function deleteExpense(id: number) {
    const confirmDelete = confirm(
      "Delete this expense?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadExpenses();
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        💸 Expense History
      </h2>
      <div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Search expense..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl bg-slate-800 px-4 py-4 text-white placeholder-slate-500"
  />
</div>

<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">
      💸 Total Expenses
    </p>

    <h2 className="mt-3 text-4xl font-bold text-red-400">
      ₦
      {records
  .reduce((sum, e) => sum + e.amount, 0)
  .toLocaleString()}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">
      📋 Records
    </p>

    <h2 className="mt-3 text-4xl font-bold text-blue-400">
      {records.length}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">
      💵 Average Expense
    </p>

    <h2 className="mt-3 text-4xl font-bold text-green-400">
      ₦
      {(
        records.reduce((sum, e) => sum + e.amount, 0) /
(records.length || 1)
      ).toLocaleString()}
    </h2>
  </div>

</div>
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left text-slate-400">

              <th className="py-3">Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Vendor</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {records
  .filter((expense) =>
    expense.category
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((expense) => (

              <tr
                key={expense.id}
                className="border-b border-slate-800 hover:bg-slate-800/50"
              >

                <td className="py-4">
                  {expense.date}
                </td>

                <td>{expense.category}</td>

                <td>{expense.description}</td>

                <td>{expense.vendor}</td>

                <td>
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-blue-300">
                    {expense.payment_method}
                  </span>
                </td>

                <td className="font-bold text-red-400">
                  ₦{Number(expense.amount ?? 0).toLocaleString()}
                </td>

                <td>
  <div className="flex gap-2">

    <button
      onClick={() => setEditingExpense(expense)}
      className="rounded-lg bg-yellow-500 px-3 py-1 text-black hover:bg-yellow-400"
    >
      ✏ Edit
    </button>

    <button
      onClick={() => deleteExpense(expense.id)}
      className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-500"
    >
      🗑 Delete
    </button>

  </div>
</td>

              </tr>

            ))}

                    </tbody>

        </table>

      </div>

      <EditExpenseModal
        expense={editingExpense}
        onClose={() => setEditingExpense(null)}
        onSaved={loadExpenses}
      />

    </div>
  );
}