"use client";

import { Menu, Bell } from "lucide-react";

type MobileHeaderProps = {
  onMenuClick: () => void;
  userName?: string;
  greeting?: string;
};

export default function MobileHeader({
  onMenuClick,
  userName = "Shawn",
  greeting = "Good Morning",
}: MobileHeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-sm text-slate-500">
            {greeting}
          </p>

          <h1 className="text-xl font-bold text-slate-900">
            {userName}
          </h1>
        </div>
      </div>

      <button
        type="button"
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
      >
        <Bell size={20} />

        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
      </button>
    </header>
  );
}