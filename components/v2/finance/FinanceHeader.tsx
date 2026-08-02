"use client";

import { DollarSign } from "lucide-react";

export default function FinanceHeader() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-green-700 p-8 text-white shadow-xl">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-white/20 p-4">
          <DollarSign size={34} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Financial Dashboard
          </h1>

          <p className="mt-1 text-green-100">
            Monitor revenue, expenses, profit and cash flow in real time.
          </p>
        </div>
      </div>
    </div>
  );
}