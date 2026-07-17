"use client";

import Sidebar from "@/dashboard/Sidebar";
import Header from "@/dashboard/Header";
import BirdStats from "@/dashboard/BirdStats";
import Birds from "@/dashboard/Birds";
import BirdHistory from "@/dashboard/BirdHistory";

export default function BirdsPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <main className="flex-1 p-8 text-white">

        <Header />

        <div className="mt-10">
          <BirdStats />
        </div>

        <div className="mt-8">
          <Birds />
        </div>

        <div className="mt-8">
          <BirdHistory />
        </div>

      </main>

    </div>
  );
}