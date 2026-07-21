import {
  CheckCircle2,
  Egg,
  Wheat,
  Receipt,
} from "lucide-react";

const activities = [
  {
    title: "Production recorded",
    subtitle: "56 crates added",
    icon: Egg,
  },
  {
    title: "Feed updated",
    subtitle: "7 bags used",
    icon: Wheat,
  },
  {
    title: "Expense recorded",
    subtitle: "Fuel purchase",
    icon: Receipt,
  },
];

export default function RecentActivity() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="text-sm text-slate-500">
          Latest updates from your farm
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm divide-y">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <Icon size={20} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {activity.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {activity.subtitle}
                  </p>
                </div>
              </div>

              <CheckCircle2
                size={18}
                className="text-green-600"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}