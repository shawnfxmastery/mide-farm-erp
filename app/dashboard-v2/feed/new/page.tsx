"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import FeedForm from "./FeedForm";

export default function NewFeedPage() {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-6">
      <button
        onClick={() => router.back()}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="mt-6 mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Record Feed Purchase
        </h1>

        <p className="mt-2 text-slate-500">
          Record a new feed purchase for inventory management.
        </p>
      </div>

      <FeedForm />
    </div>
  );
}