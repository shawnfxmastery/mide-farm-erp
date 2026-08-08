import { supabase } from "@/lib/supabase";
import { recalculateInventory } from "./recalculateInventory";
import { logInventoryActivity } from "@/lib/inventoryActivity";

export type ProductionInput = {
  date: string;
  birds: number;
  crates: number;
  pieces: number;
  brokenEggs: number;
  mortality: number;
  note?: string;
};

export async function createProduction(
  production: ProductionInput
) {
  const { data, error } = await supabase
    .from("egg_production")
    .insert({
      date: production.date,
      birds: production.birds,
      crates: production.crates,
      pieces: production.pieces,
      broken_eggs: production.brokenEggs,
      mortality: production.mortality,
      note: production.note,
    })
    .select()
    .single();

  if (error) throw error;

  // Recalculate inventory using all existing production and sales.
  await recalculateInventory();

  // Record this new production movement in inventory history.
  await logInventoryActivity(
    "Production",
    production.crates,
    production.pieces,
    `Production - ${production.date}`
  );

  return data;
}

export async function updateProduction(
  id: number,
  production: ProductionInput
) {
  const { error } = await supabase
    .from("egg_production")
    .update({
      date: production.date,
      birds: production.birds,
      crates: production.crates,
      pieces: production.pieces,
      broken_eggs: production.brokenEggs,
      mortality: production.mortality,
      note: production.note,
    })
    .eq("id", id);

  if (error) throw error;

  // Recalculate inventory after editing the historical record.
  await recalculateInventory();
}

export async function deleteProduction(
  id: number
) {
  const { error } = await supabase
    .from("egg_production")
    .delete()
    .eq("id", id);

  if (error) throw error;

  // Recalculate inventory after removing the record.
  await recalculateInventory();
}