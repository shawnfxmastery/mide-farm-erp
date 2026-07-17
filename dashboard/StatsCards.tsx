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
        <Bird className="h-7 w-7 text-emerald-400" />
      );
    }

    if (title.includes("Egg")) {
      return (
        <Egg className="h-7 w-7 text-yellow-400" />
      );
    }

    if (title.includes("Production")) {
      return (
        <TrendingUp className="h-7 w-7 text-cyan-400" />
      );
    }

    if (title.includes("Revenue")) {
      return (
        <Wallet className="h-7 w-7 text-blue-400" />
      );
    }

    if (title.includes("Expense")) {
      return (
        <Receipt className="h-7 w-7 text-red-400" />
      );
    }

    return (
      <DollarSign className="h-7 w-7 text-green-400" />
    );
  }

  function getBorderColor() {
    if (title.includes("Bird"))
      return "border-emerald-500";

    if (title.includes("Egg"))
      return "border-yellow-500";

    if (title.includes("Production"))
      return "border-cyan-500";

    if (title.includes("Revenue"))
      return "border-blue-500";

    if (title.includes("Expense"))
      return "border-red-500";

    return "border-green-500";
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border ${getBorderColor()} bg-slate-900 p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-white/5 blur-3xl" />

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[3px] text-slate-500">
            {title}
          </p>

          <h2 className="mt-5 text-4xl font-bold text-white">
            {value}
          </h2>

          <div className="mt-5 flex items-center gap-2">

            <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-400">
              ▲ Live
            </span>

            <span className="text-xs text-slate-500">
              Updated now
            </span>

          </div>

        </div>

        <div className="rounded-2xl bg-slate-800 p-4 transition duration-300 group-hover:scale-110">
          {getIcon()}
        </div>

      </div>
    </div>
  );
}