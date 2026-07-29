"use client";

import {
  BarChart3,
  TrendingUp,
  Wheat,
  Wallet,
} from "lucide-react";

export default function ExecutiveAnalytics() {
  const analytics = [
    {
      title: "Egg Production",
      description: "Track daily egg production trends.",
      icon: BarChart3,
      color: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Revenue",
      description: "Monitor daily and weekly revenue.",
      icon: TrendingUp,
      color: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Feed Usage",
      description: "Measure feed consumption.",
      icon: Wheat,
      color: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Expenses",
      description: "View operating costs.",
      icon: Wallet,
      color: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <section className="space-y-5">

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Executive Analytics
        </h2>

        <p className="text-slate-500">
          Performance insights across your farm.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {analytics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`${item.color} rounded-3xl border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-center gap-4">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg}`}
                >
                  <Icon
                    className={`h-7 w-7 ${item.iconColor}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>

              </div>

              <div className="mt-8 flex h-40 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white">
                <span className="text-sm text-slate-400">
                  Chart coming in next step
                </span>
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}