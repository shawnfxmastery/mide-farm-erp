"use client";

import { useRouter } from "next/navigation";
import {
  Egg,
  ShoppingCart,
  Wheat,
  Wallet,
  FileText,
  Home,
} from "lucide-react";

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

      <h2 className="text-2xl font-bold">
        ⚡ Quick Actions
      </h2>

      <p className="mt-2 text-slate-400">
        Frequently used farm operations.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <button
          onClick={() => router.push("/egg-production")}
          className="flex items-center gap-3 rounded-2xl bg-green-600 p-4 text-white transition hover:bg-green-500"
        >
          <Egg size={22} />
          <span>Record Production</span>
        </button>

        <button
          onClick={() => router.push("/sales")}
          className="flex items-center gap-3 rounded-2xl bg-blue-600 p-4 text-white transition hover:bg-blue-500"
        >
          <ShoppingCart size={22} />
          <span>Record Sale</span>
        </button>

        <button
          onClick={() => router.push("/feed-inventory")}
          className="flex items-center gap-3 rounded-2xl bg-yellow-600 p-4 text-white transition hover:bg-yellow-500"
        >
          <Wheat size={22} />
          <span>Update Feed</span>
        </button>

        <button
          onClick={() => router.push("/birds")}
          className="flex items-center gap-3 rounded-2xl bg-purple-600 p-4 text-white transition hover:bg-purple-500"
        >
          🐔
          <span>Add Bird Batch</span>
        </button>

        <button
          onClick={() => router.push("/expenses")}
          className="flex items-center gap-3 rounded-2xl bg-red-600 p-4 text-white transition hover:bg-red-500"
        >
          <Wallet size={22} />
          <span>Record Expense</span>
        </button>

        <button
          onClick={() => router.push("/reports")}
          className="flex items-center gap-3 rounded-2xl bg-slate-700 p-4 text-white transition hover:bg-slate-600"
        >
          <FileText size={22} />
          <span>View Reports</span>
        </button>

      </div>
    </div>
  );
}