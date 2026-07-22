"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import ExpenseFilters from "./ExpenseFilters";

type Expense = {
  id: number;
  date: string;
  category: string;
  description: string | null;
  amount: number;
  payment_method: string | null;
  vendor: string | null;
  notes: string | null;
};

export default function ExpensesList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    setLoading(true);

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setExpenses(data || []);
    }

    setLoading(false);
  }

  async function deleteExpense(id: number) {
    if (!window.confirm("Delete this expense?")) return;

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Expense deleted successfully!");

    loadExpenses();
  }

  const filteredExpenses = expenses.filter((expense) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      expense.category.toLowerCase().includes(searchText) ||
      (expense.vendor ?? "").toLowerCase().includes(searchText) ||
      (expense.description ?? "").toLowerCase().includes(searchText);

    const matchesCategory =
      categoryFilter === "" ||
      expense.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-6 text-center">
        Loading expenses...
      </div>
    );
  }

  return (
    <div className="space-y-5">

      <ExpenseFilters
  search={search}
  setSearch={setSearch}
  category={categoryFilter}
  setCategory={setCategoryFilter}
  month={monthFilter}
  setMonth={setMonthFilter}
  sort={sortBy}
  setSort={setSortBy}
/>

      {filteredExpenses.length === 0 ? (
        <div className="rounded-3xl border bg-white p-8 text-center text-slate-500">
          No matching expenses found.
        </div>
      ) : (
        filteredExpenses.map((expense) => (
          <div
            key={expense.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold">
                {expense.category}
              </h3>

              <span className="text-sm text-slate-500">
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-5 space-y-3">

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Amount
                </span>

                <span className="font-bold text-green-600">
                  ₦{expense.amount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Vendor
                </span>

                <span>
                  {expense.vendor || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Payment
                </span>

                <span>
                  {expense.payment_method || "-"}
                </span>
              </div>

              {expense.description && (
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-sm text-slate-600">
                    {expense.description}
                  </p>
                </div>
              )}

              {expense.notes && (
                <div className="rounded-xl bg-yellow-50 p-3">
                  <p className="text-sm text-slate-600">
                    {expense.notes}
                  </p>
                </div>
              )}

            </div>

            <div className="mt-5 flex gap-3">

              <Link
                href={`/dashboard-v2/expenses/edit/${expense.id}`}
                className="flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-blue-600 hover:bg-blue-50"
              >
                <Pencil size={16} />
                Edit
              </Link>

              <button
                onClick={() => deleteExpense(expense.id)}
                className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>
        ))
      )}
    </div>
  );
}