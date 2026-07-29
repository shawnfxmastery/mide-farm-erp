"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";
import { formatEggQuantity } from "@/lib/utils/eggFormatter";

type Inventory = {
  id: number;
  crates: number;
  pieces: number;
  updated_at: string;
};

export default function InventoryOverview() {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);

  // Farm selling price per crate
  const PRICE_PER_CRATE = 4000;

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("id", 1)
      .single();

    if (!error) {
      setInventory(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <SectionCard>
        <p className="text-center text-slate-500">
          Loading inventory...
        </p>
      </SectionCard>
    );
  }

  if (!inventory) {
    return (
      <SectionCard>
        <p className="text-center text-red-500">
          Inventory not found.
        </p>
      </SectionCard>
    );
  }

  const eggs = formatEggQuantity(
    inventory.crates,
    inventory.pieces
  );

  const inventoryValue =
    (eggs.crates + eggs.pieces / 30) * PRICE_PER_CRATE;

  return (
    <SectionCard>
      <div className="space-y-6">

        {/* Available Stock */}
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">
            📦 Available Stock
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {eggs.display}
          </h2>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">
              💰 Inventory Value
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-600">
              ₦{Math.round(inventoryValue).toLocaleString()}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Based on ₦4,000 per crate
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">
              🕒 Last Updated
            </p>

            <h3 className="mt-2 text-sm font-semibold text-slate-900">
              {new Date(inventory.updated_at).toLocaleString()}
            </h3>
          </div>

        </div>

      </div>
    </SectionCard>
  );
}