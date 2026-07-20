"use client";

import { useRouter } from "next/navigation";
import {
  Egg,
  ShoppingCart,
  Wheat,
  Wallet,
  FileText,
  Bird,
} from "lucide-react";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Record Production",
      icon: Egg,
      color: "bg-green-600 hover:bg-green-500",
      route: "/egg-production",
    },
    {
      title: "Record Sale",
      icon: ShoppingCart,
      color: "bg-blue-600 hover:bg-blue-500",
      route: "/sales",
    },
    {
      title: "Update Feed",
      icon: Wheat,
      color: "bg-yellow-600 hover:bg-yellow-500",
      route: "/feed-inventory",
    },
    {
      title: "Add Bird Batch",
      icon: Bird,
      color: "bg-purple-600 hover:bg-purple-500",
      route: "/birds",
    },
    {
      title: "Record Expense",
      icon: Wallet,
      color: "bg-red-600 hover:bg-red-500",
      route: "/expenses",
    },
    {
      title: "View Reports",
      icon: FileText,
      color: "bg-slate-700 hover:bg-slate-600",
      route: "/reports",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-8">

      <div>
        <h2 className="text-lg font-bold text-white sm:text-2xl">
          ⚡ Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Frequently used farm operations.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => router.push(action.route)}
              className={`flex min-h-[72px] items-center gap-4 rounded-2xl px-5 py-4 text-left text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 ${action.color}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Icon size={24} />
              </div>

              <div className="min-w-0">
                <p className="text-base font-semibold">
                  {action.title}
                </p>
              </div>
            </button>
          );
        })}

      </div>

    </div>
  );
}