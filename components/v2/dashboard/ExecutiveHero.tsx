"use client";

import { getTodayNigeria } from "@/lib/date";
import Link from "next/link";
import {
  ArrowRight,
  Egg,
  Wallet,
} from "lucide-react";

export default function ExecutiveHero() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const today = getTodayNigeria();

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-green-700 via-green-600 to-green-500 p-8 text-white shadow-2xl">

      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

      <div className="relative">

        <p className="text-green-100">
          {today}
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          👋 {greeting}, Shawn
        </h1>

        <p className="mt-3 max-w-xl text-green-100">
          Welcome back to Mide Farm ERP.
          Here's what's happening on your farm today.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <Link
            href="/dashboard-v2/production/new"
            className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:scale-105"
          >
            <Egg size={20} />

            New Production

            <ArrowRight size={18} />
          </Link>

          <Link
            href="/dashboard-v2/sales/new"
            className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
          >
            <Wallet size={20} />

            Record Sale
          </Link>

        </div>

      </div>

    </section>
  );
}