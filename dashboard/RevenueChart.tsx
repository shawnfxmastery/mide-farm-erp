"use client";

type Props = {
  revenue: number;
  expenses: number;
};

export default function RevenueChart({
  revenue,
  expenses,
}: Props) {
  const max = Math.max(revenue, expenses, 1);

  const revenueWidth = (revenue / max) * 100;
  const expenseWidth = (expenses / max) * 100;

  const profit = revenue - expenses;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

      <h2 className="text-2xl font-bold">
        💰 Revenue vs Expenses
      </h2>

      <p className="mt-2 text-slate-400">
        Financial Overview
      </p>

      {/* Revenue */}

      <div className="mt-8">

        <div className="mb-2 flex justify-between">

          <span>Revenue</span>

          <span className="font-semibold text-green-400">
            ₦{revenue.toLocaleString()}
          </span>

        </div>

        <div className="h-4 rounded-full bg-slate-800">

          <div
            className="h-4 rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${revenueWidth}%` }}
          />

        </div>

      </div>

      {/* Expenses */}

      <div className="mt-8">

        <div className="mb-2 flex justify-between">

          <span>Expenses</span>

          <span className="font-semibold text-red-400">
            ₦{expenses.toLocaleString()}
          </span>

        </div>

        <div className="h-4 rounded-full bg-slate-800">

          <div
            className="h-4 rounded-full bg-red-500 transition-all duration-500"
            style={{ width: `${expenseWidth}%` }}
          />

        </div>

      </div>

      {/* Profit */}

      <div className="mt-8 rounded-2xl bg-slate-800 p-4">

        <p className="text-sm text-slate-400">
          Net Profit
        </p>

        <h2
          className={`mt-2 text-3xl font-bold ${
            profit >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          ₦{profit.toLocaleString()}
        </h2>

      </div>

    </div>
  );
}