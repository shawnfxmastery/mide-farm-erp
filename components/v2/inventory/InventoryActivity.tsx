"use client";

import { useEffect, useState } from "react";
import { Egg, ShoppingCart } from "lucide-react";

import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";

type Activity = {
  id: string;
  type: "Production" | "Sale";
  crates: number;
  pieces: number;
  reference: string | null;
  created_at: string;
};

export default function InventoryActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivity();
  }, []);

  async function loadActivity() {
    setLoading(true);

    try {
      // Get ALL production history
      const { data: production, error: productionError } =
        await supabase
          .from("egg_production")
          .select("id, date, crates, pieces")
          .order("date", { ascending: false });

      if (productionError) throw productionError;

      // Get ALL sales history
      const { data: sales, error: salesError } =
        await supabase
          .from("egg_sales")
          .select("id, date, crates, pieces, customer")
          .order("date", { ascending: false });

      if (salesError) throw salesError;

      const productionActivities: Activity[] =
        (production ?? []).map((row) => ({
          id: `production-${row.id}`,
          type: "Production",
          crates: Number(row.crates ?? 0),
          pieces: Number(row.pieces ?? 0),
          reference: `Production - ${row.date}`,
          created_at: row.date,
        }));

      const saleActivities: Activity[] =
        (sales ?? []).map((row) => ({
          id: `sale-${row.id}`,
          type: "Sale",
          crates: -Number(row.crates ?? 0),
          pieces: -Number(row.pieces ?? 0),
          reference: row.customer
            ? `Sale - ${row.customer}`
            : "Sale",
          created_at: row.date,
        }));

      const combined = [
        ...productionActivities,
        ...saleActivities,
      ];

      combined.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );

      setActivities(combined.slice(0, 50));
    } catch (error) {
      console.error(
        "Failed to load inventory activity:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionCard>
      <div className="space-y-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Inventory History
          </h2>

          <p className="text-sm text-slate-500">
            Production and sales movements from your actual farm records.
          </p>
        </div>

        {loading ? (
          <p className="py-8 text-center text-slate-500">
            Loading inventory history...
          </p>
        ) : activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <div className="mb-3 text-5xl">📦</div>

            <h3 className="text-lg font-semibold text-slate-900">
              No inventory history yet
            </h3>

            <p className="mt-2 text-slate-500">
              Production and sales records will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {activities.map((activity) => {
              const isProduction =
                activity.type === "Production";

              return (
                <div
                  key={activity.id}
                  className="flex items-start justify-between rounded-2xl border border-slate-200 p-4"
                >

                  <div className="flex items-start gap-4">

                    <div
                      className={`rounded-xl p-3 ${
                        isProduction
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isProduction ? (
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
                        {new Date(
                          activity.created_at
                        ).toLocaleDateString()}
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
                        isProduction
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {isProduction ? "+" : "-"}
                      {Math.abs(activity.crates)} Crates
                    </p>

                    {activity.pieces !== 0 && (
                      <p className="text-sm text-slate-500">
                        {activity.pieces > 0 ? "+" : "-"}
                        {Math.abs(activity.pieces)} Pieces
                      </p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}
      </div>
    </SectionCard>
  );
}