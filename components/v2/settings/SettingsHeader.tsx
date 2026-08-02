"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

export default function SettingsHeader({
  title,
  description,
}: Props) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <button
        onClick={() => router.push("/dashboard-v2/settings")}
        className="mb-5 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
      >
        <ArrowLeft size={18} />
        Back to Settings
      </button>

      <h1 className="text-3xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-2 text-slate-500">
        {description}
      </p>
    </div>
  );
}