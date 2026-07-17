"use client";

import Sidebar from "@/dashboard/Sidebar";
import Header from "@/dashboard/Header";
import EggProduction from "@/dashboard/EggProduction";
import ProductionHistory from "@/dashboard/ProductionHistory";

export default function EggProductionPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <main className="flex-1 p-8 text-white">

        <Header />

        <div className="mt-10">
          <EggProduction />
        </div>

        <div className="mt-8">
          <ProductionHistory />
        </div>

      </main>

    </div>
  );
}