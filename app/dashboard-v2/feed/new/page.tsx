"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import FeedForm from "./FeedForm";

export default function NewFeedPage() {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">

  <button
    onClick={() => router.back()}
    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
  >
    <ArrowLeft size={20} />
  </button>

  <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-green-500 p-6 text-white shadow-xl">

    <p className="text-sm text-green-100">
      Feed Module
    </p>

    <h1 className="mt-2 text-3xl font-bold">
      🌽 Purchase Feed
    </h1>

    <p className="mt-2 text-green-100">
      Record feed purchases and automatically update inventory.
    </p>

  </div>

  <FeedForm />

</div>
  );
}