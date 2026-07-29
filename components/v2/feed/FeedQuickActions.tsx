"use client";

import Link from "next/link";
import { ShoppingCart, Wheat } from "lucide-react";

export default function FeedQuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">

      <Link
        href="/dashboard-v2/feed/new"
        className="rounded-2xl border border-green-200 bg-green-50 p-5 transition hover:bg-green-100"
      >
        <ShoppingCart className="mb-3 text-green-700" size={28} />

        <h3 className="font-semibold text-slate-900">
          Purchase Feed
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Add new feed stock
        </p>
      </Link>

      <Link
        href="/dashboard-v2/feed-usage/new"
        className="rounded-2xl border border-orange-200 bg-orange-50 p-5 transition hover:bg-orange-100"
      >
        <Wheat className="mb-3 text-orange-700" size={28} />

        <h3 className="font-semibold text-slate-900">
          Record Usage
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Log daily feed usage
        </p>
      </Link>

    </div>
  );
}