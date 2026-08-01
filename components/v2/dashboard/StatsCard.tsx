import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: string;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Background Accent */}
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-green-50 blur-3xl transition group-hover:bg-green-100" />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

          {trend && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">

              <TrendingUp size={14} />

              {trend}

            </div>
          )}

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-green-500 text-white shadow-lg shadow-green-600/25 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

      </div>

    </div>
  );
}