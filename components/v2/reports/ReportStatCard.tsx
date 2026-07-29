import { ReactNode } from "react";

interface ReportStatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  bgColor: string;
}

export default function ReportStatCard({
  title,
  value,
  icon,
  bgColor,
}: ReportStatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}