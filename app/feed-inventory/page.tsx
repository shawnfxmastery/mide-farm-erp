"use client";

import Sidebar from "@/dashboard/Sidebar";
import Header from "@/dashboard/Header";
import FeedStats from "@/dashboard/FeedStats";
import FeedInventory from "@/dashboard/FeedInventory";
import FeedHistory from "@/dashboard/FeedHistory";

export default function FeedInventoryPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <main className="flex-1 p-8 text-white">

        <Header />

        <div className="mt-10">
          <FeedStats />
        </div>

        <div className="mt-8">
          <FeedInventory />
        </div>

        <div className="mt-8">
          <FeedHistory />
        </div>

      </main>

    </div>
  );
}