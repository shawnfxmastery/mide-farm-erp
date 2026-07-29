"use client";

import { useEffect, useState } from "react";
import {
  Egg,
  Bird,
  TrendingUp,
  Skull,
  CircleOff,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Production = {
  birds: number;
  crates: number;
  pieces: number;
  broken_eggs: number;
  mortality: number;
};

export default function ProductionOverviewCard() {
  const [production, setProduction] = useState<Production>({
    birds: 0,
    crates: 0,
    pieces: 0,
    broken_eggs: 0,
    mortality: 0,
  });

  useEffect(() => {
    loadProduction();
  }, []);

  async function loadProduction() {
    const today = new Date().toISOString().split("T")[0];

    // Today's production
    const { data: todayProduction } = await supabase
      .from("egg_production")
      .select(
        "birds, crates, pieces, broken_eggs, mortality"
      )
      .eq("date", today)
      .maybeSingle();

    // Latest birds alive
    const { data: latestProduction } = await supabase
      .from("egg_production")
      .select("birds")
      .order("date", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (todayProduction) {
      setProduction({
        birds:
          latestProduction?.birds ??
          todayProduction.birds,
        crates: todayProduction.crates ?? 0,
        pieces: todayProduction.pieces ?? 0,
        broken_eggs:
          todayProduction.broken_eggs ?? 0,
        mortality:
          todayProduction.mortality ?? 0,
      });
    } else {
      setProduction({
        birds: latestProduction?.birds ?? 0,
        crates: 0,
        pieces: 0,
        broken_eggs: 0,
        mortality: 0,
      });
    }
  }

  const totalEggs =
    production.crates * 30 + production.pieces;

  const productionRate =
    production.birds > 0
      ? (
          (totalEggs / production.birds) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Today's Production
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            {production.crates}
          </h2>

          <p className="mt-1 text-slate-500">
            Crates
            {production.pieces > 0 &&
              ` + ${production.pieces} Pieces`}
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
          <Egg
            size={32}
            className="text-green-700"
          />
        </div>

      </div>

      <div className="my-6 border-t border-slate-200" />

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-2">
              <Bird
                size={18}
                className="text-blue-700"
              />
            </div>

            <span className="text-slate-600">
              Birds Alive
            </span>

          </div>

          <span className="font-bold text-slate-900">
            {production.birds.toLocaleString()}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-green-100 p-2">
              <TrendingUp
                size={18}
                className="text-green-700"
              />
            </div>

            <span className="text-slate-600">
              Production Rate
            </span>

          </div>

          <span className="font-bold text-green-700">
            {productionRate}%
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-red-100 p-2">
              <Skull
                size={18}
                className="text-red-700"
              />
            </div>

            <span className="text-slate-600">
              Mortality
            </span>

          </div>

          <span className="font-bold text-slate-900">
            {production.mortality}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-orange-100 p-2">
              <CircleOff
                size={18}
                className="text-orange-700"
              />
            </div>

            <span className="text-slate-600">
              Broken Eggs
            </span>

          </div>

          <span className="font-bold text-slate-900">
            {production.broken_eggs}
          </span>

        </div>

      </div>

    </div>
  );
}