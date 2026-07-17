"use client";

import Sidebar from "@/dashboard/Sidebar";
import Header from "@/dashboard/Header";
import Suppliers from "../../dashboard/Suppliers";

export default function SuppliersPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 bg-slate-950 p-8 text-white">
        <Header />
        <Suppliers />
      </main>
    </div>
  );
}