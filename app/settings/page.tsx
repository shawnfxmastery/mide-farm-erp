"use client";

import Sidebar from "@/dashboard/Sidebar";
import Header from "@/dashboard/Header";
import SettingsDashboard from "@/dashboard/SettingsDashboard";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <main className="flex-1 bg-slate-950 p-8 text-white">

        <Header />

        <SettingsDashboard />

      </main>

    </div>
  );
}