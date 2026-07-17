"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ExpensesStats() {
  const [todayExpenses, setTodayExpenses] = useState(0);
  const [monthExpenses, setMonthExpenses] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [largestExpense, setLargestExpense] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { data } = await supabase
      .from("expenses")
      .select("*");

    if (!data) return;

    const today = new Date().toISOString().split("T")[0];
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    let todayTotal = 0;
    let monthTotal = 0;
    let overall = 0;
    let highest = 0;

    data.forEach((expense) => {
      const amount = Number(expense.amount ?? 0);

      overall += amount;

      if (expense.date === today) {
        todayTotal += amount;
      }

      const expenseDate = new Date(expense.date);

      if (
        expenseDate.getMonth() === month &&
        expenseDate.getFullYear() === year
      ) {
        monthTotal += amount;
      }

      if (amount > highest) {
        highest = amount;
      }
    });

    setTodayExpenses(todayTotal);
    setMonthExpenses(monthTotal);
    setTotalExpenses(overall);
    setLargestExpense(highest);
  }

  const cards = [
    {
      title: "Today's Expenses",
      value: `₦${todayExpenses.toLocaleString()}`,
      icon: "📅",
      color: "text-red-400",
    },
    {
      title: "Monthly Expenses",
      value: `₦${monthExpenses.toLocaleString()}`,
      icon: "📈",
      color: "text-orange-400",
    },
    {
      title: "Total Expenses",
      value: `₦${totalExpenses.toLocaleString()}`,
      icon: "💸",
      color: "text-red-400",
    },
    {
      title: "Largest Expense",
      value: `₦${largestExpense.toLocaleString()}`,
      icon: "🔥",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-widest text-slate-500">
                {card.title}
              </p>

              <h2 className={`mt-4 text-4xl font-bold ${card.color}`}>
                {card.value}
              </h2>

              <p className="mt-3 text-sm text-red-400">
                Live Expense Data
              </p>

            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}