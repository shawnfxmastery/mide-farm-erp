"use client";

import { Bell, ChevronDown } from "lucide-react";

type MobileHeaderProps = {
  userName?: string;
  greeting?: string;
};

export default function MobileHeader({
  userName = "Shawn",
  greeting = "Good Morning",
}: MobileHeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">
          {greeting}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {userName}
          </h1>

          <ChevronDown
            size={18}
            className="text-slate-400"
          />
        </div>
      </div>

      <button
        type="button"
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
      >
        <Bell
          size={20}
          className="text-slate-700"
        />

        <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
      </button>
    </header>
  );
}