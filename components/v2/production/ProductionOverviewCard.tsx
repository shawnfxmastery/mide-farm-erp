"use client";

import { useEffect, useState } from "react";
import { Egg, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Production = {
  birds: number;
  crates: number;
  pieces: number;
};

export default function ProductionOverviewCard() {
  const [production, setProduction] = useState<Production>({
    birds: 0,
    crates: 0,
    pieces: 0,
  });

  useEffect(() => {
    loadProduction();
  }, []);

  async function loadProduction() {
    const { data, error } = await supabase
      .from("egg_production")
      .select("birds, crates, pieces")
      .order("date", { ascending: false })
      .limit(1)
      .single();

    if (!error && data) {
      setProduction(data);
    }
  }

  const totalEggs = production.crates * 30 + production.pieces;

  const productionRate =
    production.birds > 0
      ? ((totalEggs / production.birds) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Today's Production
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {production.crates}
          </h2>

          <p className="text-slate-500">
            Crates
            {production.pieces > 0 &&
              ` + ${production.pieces} Pieces`}
          </p>
        </div>

        <div className="rounded-2xl bg-green-100 p-4">
          <Egg className="text-green-700" />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-green-600">
        <TrendingUp size={18} />

        <span className="font-medium">
          {productionRate}% Production
        </span>
      </div>
    </div>
  );
}