"use client";

import { useEffect, useState } from "react";
import {
  Bird,
  Egg,
  Skull,
  Wheat,
  Wallet,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Production = {
  birds: number;
  crates: number;
  pieces: number;
  mortality: number;
};

export default function FarmSummaryCard() {
  const [production, setProduction] = useState<Production>({
    birds: 0,
    crates: 0,
    pieces: 0,
    mortality: 0,
  });

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    const { data, error } = await supabase
      .from("egg_production")
      .select("birds, crates, pieces, mortality")
      .order("date", { ascending: false })
      .limit(1)
      .single();

    if (!error && data) {
      setProduction(data);
    }
  }

  const items = [
    {
      icon: Bird,
      label: "Birds Alive",
      value: production.birds.toLocaleString(),
    },
    {
      icon: Egg,
      label: "Today's Eggs",
      value: `${production.crates} Crates ${production.pieces > 0 ? `+ ${production.pieces} Pieces` : ""}`,
    },
    {
      icon: Skull,
      label: "Mortality",
      value: production.mortality.toString(),
    },
    {
      icon: Wheat,
      label: "Feed Used",
      value: "7 Bags",
    },
    {
      icon: Wallet,
      label: "Revenue",
      value: "₦0",
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Farm Summary
      </h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon size={18} />
                </div>

                <span className="text-slate-600">
                  {item.label}
                </span>
              </div>

              <span className="font-bold text-slate-900">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}