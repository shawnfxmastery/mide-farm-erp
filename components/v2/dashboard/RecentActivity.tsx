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

      <div className="divide-y rounded-lg border border-[#edebe9] bg-white shadow-sm">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#e8f1fb] text-[#005a9e]">
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
                className="text-[#107c10]"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
