"use client";

import Sidebar from "@/dashboard/Sidebar";
import Header from "@/dashboard/Header";
import HouseStats from "@/dashboard/HouseStats";

export default function HousesPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <main className="flex-1 bg-slate-950 p-8 text-white overflow-y-auto">

        <Header />

        <div className="mb-8">
          <h1 className="text-5xl font-bold">
            🏠 Farm Facilities
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            Monitor poultry houses, bird capacity, production and facility performance.
          </p>
        </div>

        <HouseStats />

      </main>

    </div>
  );
}