"use client";

import { Menu, Bell } from "lucide-react";

type MobileHeaderProps = {
  onMenuClick: () => void;
};

export default function MobileHeader({
  onMenuClick,
}: MobileHeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
      >
        <Menu size={22} />
      </button>

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