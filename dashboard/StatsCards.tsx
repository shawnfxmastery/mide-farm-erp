"use client";

import {
  Bird,
  Egg,
  TrendingUp,
  Wallet,
  Receipt,
  DollarSign,
} from "lucide-react";

type Props = {
  title: string;
  value: string;
};

export default function StatsCards({ title, value }: Props) {
  function getIcon() {
    if (title.includes("Bird")) {
      return (
        <Bird className="h-6 w-6 text-emerald-400 sm:h-7 sm:w-7" />
      );
    }

    if (title.includes("Egg")) {
      return (
        <Egg className="h-6 w-6 text-yellow-400 sm:h-7 sm:w-7" />
      );
    }

    if (title.includes("Production")) {
      return (
        <TrendingUp className="h-6 w-6 text-cyan-400 sm:h-7 sm:w-7" />
      );
    }

    if (title.includes("Revenue")) {
      return (
        <Wallet className="h-6 w-6 text-blue-400 sm:h-7 sm:w-7" />
      );
    }

    if (title.includes("Expense")) {
      return (
        <Receipt className="h-6 w-6 text-red-400 sm:h-7 sm:w-7" />
      );
    }

    return (
      <DollarSign className="h-6 w-6 text-green-400 sm:h-7 sm:w-7" />
    );
  }

  function getBorderColor() {
    if (title.includes("Bird")) return "border-emerald-500";
    if (title.includes("Egg")) return "border-yellow-500";
    if (title.includes("Production")) return "border-cyan-500";
    if (title.includes("Revenue")) return "border-blue-500";
    if (title.includes("Expense")) return "border-red-500";

    return "border-green-500";
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${getBorderColor()} bg-slate-900 p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-3xl sm:p-6`}
    >
      {/* Background Glow */}
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/5 blur-3xl sm:h-32 sm:w-32" />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[2px] text-slate-500 sm:text-xs sm:tracking-[3px]">
            {title}
          </p>

          <h2 className="mt-3 break-words text-2xl font-bold leading-tight text-white sm:mt-4 sm:text-4xl">
            {value}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold text-emerald-400 sm:text-xs">
              ● Live
            </span>

            <span className="text-[10px] text-slate-500 sm:text-xs">
              Updated now
            </span>
          </div>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-800 transition duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
          {getIcon()}
        </div>
      </div>
    </div>
  );
}