"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigation } from "@/components/v2/navigation/navigation";

type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideDrawer({
  open,
  onClose,
}: SideDrawerProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-xl font-bold text-green-700">
              Mide Farm ERP
            </h2>

            <p className="text-sm text-slate-500">
              Poultry Management
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                  active
                    ? "bg-green-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-5">
          <p className="font-semibold text-slate-900">
            Shawn
          </p>

          <p className="text-sm text-slate-500">
            Administrator
          </p>
        </div>
      </aside>
    </>
  );
}