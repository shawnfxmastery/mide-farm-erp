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
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-8">

      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white sm:text-2xl">
          💰 Revenue vs Expenses
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Financial Overview
        </p>
      </div>

      {/* Revenue */}
      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between gap-3">

          <span className="text-sm font-medium text-slate-300">
            Revenue
          </span>

          <span className="max-w-[60%] truncate text-sm font-bold text-green-400 sm:text-base">
            ₦{revenue.toLocaleString()}
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-green-500 transition-all duration-700"
            style={{
              width: `${revenueWidth}%`,
            }}
          />

        </div>

      </div>

      {/* Expenses */}
      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between gap-3">

          <span className="text-sm font-medium text-slate-300">
            Expenses
          </span>

          <span className="max-w-[60%] truncate text-sm font-bold text-red-400 sm:text-base">
            ₦{expenses.toLocaleString()}
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-red-500 transition-all duration-700"
            style={{
              width: `${expenseWidth}%`,
            }}
          />

        </div>

      </div>

      {/* Profit Card */}
      <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-4">

        <p className="text-xs uppercase tracking-wider text-slate-400">
          Net Profit
        </p>

        <h2
          className={`mt-2 break-words text-2xl font-bold sm:text-3xl ${
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