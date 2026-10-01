"use client";

import { DollarSign } from "lucide-react";

export default function FinanceHeader() {
  return (
    <section className="border-b border-slate-200 bg-white px-1 pb-6 pt-1">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-100">
            <DollarSign size={25} />
          </div>

          <div>
            <p className="text-sm font-medium text-emerald-700">Finance</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              Financial overview
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              A clear view of sales, expenses and cash position.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
          All recorded transactions
        </div>
      </div>
    </section>
  );
}
