"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import NewSaleForm from "./SaleForm";

export default function NewSalePage() {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-6">

      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          New Egg Sale
        </h1>

        <p className="mt-2 text-slate-500">
          Record a new egg sale transaction.
        </p>
      </div>

      <NewSaleForm />

    </div>
  );
}