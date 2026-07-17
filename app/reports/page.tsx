"use client";

import Sidebar from "@/dashboard/Sidebar";
import Header from "@/dashboard/Header";
import ReportsDashboard from "../../dashboard/ReportsDashboard";

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <main className="flex-1 p-8 text-white">

        <Header />

        <ReportsDashboard />

      </main>

    </div>
  );
}