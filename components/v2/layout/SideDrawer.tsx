"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
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
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const operations = navigation.filter((item) =>
    [
      "Dashboard",
      "Production",
      "Sales",
      "Feed",
      "Medication",
      "Inventory",
    ].includes(item.name)
  );

  const management = navigation.filter((item) =>
  [
    "Expenses",
    "Finance",
    "Reports",
    "Workers",
    "Suppliers",
  ].includes(item.name)
);

  const system = navigation.filter((item) =>
    ["Settings"].includes(item.name)
  );

  const renderSection = (
  title: string,
  items: typeof navigation
) => (
  <div className="mb-8">
    <div className="mb-3 flex items-center gap-2 px-3">
      <div className="h-px flex-1 bg-slate-200" />

      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
        {title}
      </span>

      <div className="h-px flex-1 bg-slate-200" />
    </div>

    <div className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;

        const active =
          item.href === "/dashboard-v2"
            ? pathname === "/dashboard-v2"
            : pathname === item.href ||
              pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            className={`
              group
              flex
              items-center
              justify-between
              rounded-2xl
              px-4
              py-3
              transition-all
              duration-200
              ${
                active
                  ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-600/20"
                  : "text-slate-700 hover:bg-[#f3f2f1]"
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div
                className={`
                  rounded-xl
                  p-2
                  ${
                    active
                      ? "bg-white/20"
                      : "bg-[#f3f2f1] group-hover:bg-white"
                  }
                `}
              >
                <Icon size={18} />
              </div>

              <span className="font-semibold">
                {item.name}
              </span>
            </div>

            <ChevronRight
              size={16}
              className={`
                transition-transform
                ${
                  active
                    ? "translate-x-0 text-white"
                    : "translate-x-1 text-slate-300 group-hover:translate-x-2"
                }
              `}
            />
          </Link>
        );
      })}
    </div>
  </div>
);

  return (
  <>
    {/* Overlay */}
    <div
      onClick={onClose}
      className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        open
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    />

    {/* Drawer */}
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-80 flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Premium Header */}

      <div className="border-b border-slate-200 bg-gradient-to-br from-green-700 via-green-600 to-green-500 p-6 text-white">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-white text-2xl shadow-sm">
              🐔
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Mide Farm ERP
              </h2>

              <p className="mt-1 text-green-100">
                Poultry Management
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                <ShieldCheck size={14} />
                Version 2.0
              </div>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-md bg-white/10 p-2 transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {renderSection("Operations", operations)}

        {renderSection("Management", management)}

        {renderSection("System", system)}

      </nav>

      {/* User Card */}

      <div className="border-t border-slate-200 p-5">

        <div className="mb-4 flex items-center gap-4 rounded-md bg-[#f3f2f1] p-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-600 text-xl font-bold text-white">
            S
          </div>

          <div>

            <h3 className="font-bold text-slate-900">
              Shawn
            </h3>

            <p className="text-sm text-slate-500">
              Administrator
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-md bg-red-50 py-3 font-semibold text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  </>
);
}
