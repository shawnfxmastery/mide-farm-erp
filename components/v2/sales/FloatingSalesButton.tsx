"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function FloatingSalesButton() {
  return (
    <Link
      href="/dashboard-v2/sales/new"
      className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-xl transition hover:scale-105 hover:bg-green-700"
    >
      <Plus size={28} />
    </Link>
  );
}