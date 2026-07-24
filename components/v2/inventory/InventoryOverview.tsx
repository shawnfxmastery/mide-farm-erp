"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";

type Inventory = {
  id: number;
  crates: number;
  pieces: number;
  updated_at: string;
};

export default function InventoryOverview() {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);

  // Change this to your actual farm selling price
  const PRICE_PER_CRATE = 5500;

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

  const inventoryValue =
    inventory.crates * PRICE_PER_CRATE;

  return (
    <SectionCard>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            📦 Crates in Storage
          </span>

          <span className="text-2xl font-bold">
            {inventory.crates}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            🥚 Loose Eggs
          </span>

          <span className="text-2xl font-bold">
            {inventory.pieces}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            💰 Inventory Value
          </span>

          <span className="text-2xl font-bold text-green-600">
            ₦{inventoryValue.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-slate-500">
            🕒 Last Updated
          </span>

          <span className="font-medium">
            {new Date(
              inventory.updated_at
            ).toLocaleString()}
          </span>
        </div>

      </div>
    </SectionCard>
  );
}