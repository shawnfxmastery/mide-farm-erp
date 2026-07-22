"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ExpensesOverviewCard() {
  const [todayTotal, setTodayTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [yearTotal, setYearTotal] = useState(0);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    loadOverview();
  }, []);

  async function loadOverview() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*");

    if (error || !data) return;

    setRecords(data.length);

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let todaySum = 0;
    let monthSum = 0;
    let yearSum = 0;

    data.forEach((expense) => {
      const amount = Number(expense.amount || 0);
      const expenseDate = new Date(expense.date);

      if (expense.date === todayString) {
        todaySum += amount;
      }

      if (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      ) {
        monthSum += amount;
      }

      if (expenseDate.getFullYear() === currentYear) {
        yearSum += amount;
      }
    });

    setTodayTotal(todaySum);
    setMonthTotal(monthSum);
    setYearTotal(yearSum);
  }

  const cards = [
    {
      title: "Today's Expenses",
      value: `₦${todayTotal.toLocaleString()}`,
      bg: "bg-red-50",
    },
    {
      title: "This Month",
      value: `₦${monthTotal.toLocaleString()}`,
      bg: "bg-orange-50",
    },
    {
      title: "This Year",
      value: `₦${yearTotal.toLocaleString()}`,
      bg: "bg-blue-50",
    },
    {
      title: "Records",
      value: records.toLocaleString(),
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-3xl ${card.bg} p-5`}
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}