import { ReactNode } from "react";

interface StatItem {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {stat.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {stat.value}
              </h2>

              {stat.subtitle && (
                <p className="mt-1 text-sm text-slate-500">
                  {stat.subtitle}
                </p>
              )}
            </div>

            {stat.icon && (
              <div className="rounded-2xl bg-green-100 p-3 text-green-700">
                {stat.icon}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}