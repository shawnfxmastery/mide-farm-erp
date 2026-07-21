import {
  Bird,
  Skull,
  Wheat,
  Wallet,
} from "lucide-react";

const summary = [
  {
    title: "Birds Alive",
    value: "1,950",
    icon: Bird,
  },
  {
    title: "Mortality",
    value: "0",
    icon: Skull,
  },
  {
    title: "Feed Used",
    value: "7 Bags",
    icon: Wheat,
  },
  {
    title: "Sales Today",
    value: "₦0",
    icon: Wallet,
  },
];

export default function TodaySummary() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Today's Summary
        </h2>

        <p className="text-sm text-slate-500">
          Farm performance at a glance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <Icon size={20} />
              </div>

              <p className="text-sm text-slate-500">
                {item.title}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}