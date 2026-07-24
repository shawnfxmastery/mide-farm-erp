"use client";

import { useEffect, useState } from "react";
import { Egg, ShoppingCart } from "lucide-react";

import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";

interface Activity {
  id: number;
  type: "Production" | "Sale";
  crates: number;
  pieces: number;
  reference: string | null;
  created_at: string;
}

export default function InventoryActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivity();
  }, []);

  async function loadActivity() {
    const { data, error } = await supabase
      .from("inventory_activity")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data) {
      setActivities(data as Activity[]);
    }

    setLoading(false);
  }

  return (
    <SectionCard>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Inventory Activity
          </h2>

          <p className="text-sm text-slate-500">
            Inventory movements from production and sales.
          </p>
        </div>

        {loading ? (
          <p className="py-8 text-center text-slate-500">
            Loading activity...
          </p>
        ) : activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <div className="mb-3 text-5xl">📦</div>

            <h3 className="text-lg font-semibold text-slate-900">
              No inventory activity yet
            </h3>

            <p className="mt-2 text-slate-500">
              Production and sales transactions will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-xl p-3 ${
                      activity.type === "Production"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {activity.type === "Production" ? (
                      <Egg size={22} />
                    ) : (
                      <ShoppingCart size={22} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {activity.type}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {new Date(activity.created_at).toLocaleString()}
                    </p>

                    {activity.reference && (
                      <p className="mt-1 text-sm text-slate-600">
                        {activity.reference}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      activity.crates >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {activity.crates >= 0 ? "+" : ""}
                    {activity.crates} Crates
                  </p>

                  {activity.pieces !== 0 && (
                    <p className="text-sm text-slate-500">
                      {activity.pieces >= 0 ? "+" : ""}
                      {activity.pieces} Pieces
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}