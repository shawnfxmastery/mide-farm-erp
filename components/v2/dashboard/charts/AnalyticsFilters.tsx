"use client";

const filters = [
  "Today",
  "7 Days",
  "30 Days",
  "This Month",
  "This Year",
];

export default function AnalyticsFilters() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {filters.map((filter, index) => (
        <button
          key={filter}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
            index === 1
              ? "bg-emerald-600 text-white shadow"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}