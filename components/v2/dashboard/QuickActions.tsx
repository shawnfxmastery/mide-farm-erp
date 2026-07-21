"use client";

import {
  Egg,
  Wallet,
  Wheat,
  Receipt,
  ChevronRight,
} from "lucide-react";

type Action = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const actions: Action[] = [
  {
    title: "Record Production",
    description: "Save today's egg production",
    icon: Egg,
  },
  {
    title: "Record Sale",
    description: "Add a new egg sale",
    icon: Wallet,
  },
  {
    title: "Feed Inventory",
    description: "Update available feed",
    icon: Wheat,
  },
  {
    title: "Record Expense",
    description: "Track farm expenses",
    icon: Receipt,
  },
];

export default function QuickActions() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500">
          Frequently used actions
        </p>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-green-500 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <Icon size={22} />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold text-slate-900">
                    {action.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {action.description}
                  </p>
                </div>
              </div>

              <ChevronRight
                size={20}
                className="text-slate-400"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}