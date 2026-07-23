"use client";

interface FilterChipsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterChips({
  options,
  active,
  onChange,
}: FilterChipsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {options.map((option) => {
        const isActive = active === option;

        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "bg-green-600 text-white shadow"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}