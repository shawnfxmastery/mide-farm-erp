"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Egg,
  Wheat,
  Receipt,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Activity = { title: string; subtitle: string; icon: typeof Egg };

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function loadActivities() {
      const [production, feedUsage, expense] = await Promise.all([
        supabase.from("egg_production").select("date, crates, pieces").order("date", { ascending: false }).limit(1),
        supabase.from("feed_usage").select("usage_date, bags_used").order("usage_date", { ascending: false }).limit(1),
        supabase.from("expenses").select("date, category, amount").order("date", { ascending: false }).limit(1),
      ]);
      const items: Activity[] = [];
      const p = production.data?.[0];
      if (p) items.push({ title: "Production recorded", subtitle: `${p.crates} crates${p.pieces ? ` + ${p.pieces} pieces` : ""} - ${p.date}`, icon: Egg });
      const f = feedUsage.data?.[0];
      if (f) items.push({ title: "Feed usage recorded", subtitle: `${f.bags_used} bags used - ${f.usage_date}`, icon: Wheat });
      const e = expense.data?.[0];
      if (e) items.push({ title: "Expense recorded", subtitle: `${e.category} - ₦${Number(e.amount ?? 0).toLocaleString()}`, icon: Receipt });
      setActivities(items);
    }
    loadActivities();
  }, []);
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
        {activities.length === 0 && <p className="p-6 text-sm text-slate-500">No recent farm activity yet.</p>}
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-100 text-green-700">
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
