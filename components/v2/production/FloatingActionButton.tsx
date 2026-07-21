"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function FloatingActionButton() {
  return (
    <Link
      href="/dashboard-v2/production/new"
      className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl transition hover:scale-105"
    >
      <Plus size={30} />
    </Link>
  );
}