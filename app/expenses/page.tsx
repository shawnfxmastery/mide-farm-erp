"use client";

import Sidebar from "@/dashboard/Sidebar";
import Header from "@/dashboard/Header";
import ExpensesStats from "@/dashboard/ExpensesStats";
import ExpensesNew from "@/dashboard/ExpensesNew";
import ExpensesHistory from "@/dashboard/ExpensesHistory";

export default function ExpensesPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <main className="flex-1 p-8 text-white">

        <Header />

        <div className="mt-10">
          <ExpensesStats />
        </div>

        <div className="mt-8">
          <ExpensesNew />
        </div>

        <div className="mt-8">
          <ExpensesHistory />
        </div>

      </main>

    </div>
  );
}