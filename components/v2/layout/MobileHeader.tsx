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
        className="flex h-10 w-10 items-center justify-center rounded-md border border-[#edebe9] bg-white shadow-sm transition hover:bg-[#f3f2f1]"
      >
        <Menu size={22} />
      </button>

      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center rounded-md border border-[#edebe9] bg-white shadow-sm transition hover:bg-[#f3f2f1]"
      >
        <Bell size={20} />

        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
      </button>
    </header>
  );
}
