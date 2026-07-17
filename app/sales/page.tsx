"use client";

import Sidebar from "@/dashboard/Sidebar";
import Header from "@/dashboard/Header";
import SalesStats from "@/dashboard/SalesStats";
import Sales from "@/dashboard/Sales";
import SalesHistory from "@/dashboard/SalesHistory";

export default function SalesPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <main className="flex-1 p-8 text-white">

        <Header />

        <div className="mt-10">
          <SalesStats />
        </div>

        <div className="mt-8">
          <Sales />
        </div>

        <div className="mt-8">
          <SalesHistory />
        </div>

      </main>

    </div>
  );
}