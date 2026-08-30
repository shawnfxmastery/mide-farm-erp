"use client";

import Link from "next/link";
import {
  Egg,
  Wheat,
  Wallet,
  Receipt,
} from "lucide-react";

const actions = [
  {
    title: "Production",
    href: "/dashboard-v2/production",
    icon: Egg,
  },
  {
    title: "Feed",
    href: "/dashboard-v2/feed",
    icon: Wheat,
  },
  {
    title: "Sales",
    href: "/dashboard-v2/sales",
    icon: Wallet,
  },
  {
    title: "Expenses",
    href: "/dashboard-v2/expenses",
    icon: Receipt,
  },
];

export default function QuickActionGrid() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500">
          Choose a module
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="rounded-md border border-[#edebe9] bg-white p-5 shadow-sm transition hover:border-green-500 hover:bg-[#faf9f8]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-green-100 text-green-700">
                <Icon size={24} />
              </div>

              <h3 className="font-semibold text-slate-900">
                {action.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
