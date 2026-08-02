"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function InventoryHeader() {
  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          📦 Inventory
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor eggs, feed and farm stock in real time.
        </p>

      </div>

      <Link
        href="/dashboard-v2/production/new"
        className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <Plus size={18} />
        Record Production
      </Link>

    </div>
  );
}