import { supabase } from "@/lib/supabase";
import { checkInventory } from "@/lib/inventory";
import { recalculateInventory } from "./recalculateInventory";

export type EggAdjustmentInput = {
  date: string;
  crates: number;
  pieces: number;
  reason: string;
  notes: string;
};

export async function createEggAdjustment(
  adjustment: EggAdjustmentInput
) {
  if (adjustment.crates === 0 && adjustment.pieces === 0) {
    throw new Error("Enter at least one crate or piece.");
  }

  // An adjustment removes eggs from farm stock, so it must never
  // make the available inventory negative.
  await checkInventory(adjustment.crates, adjustment.pieces);

  const { data, error } = await supabase
    .from("egg_adjustments")
    .insert({
      date: adjustment.date,
      crates: adjustment.crates,
      pieces: adjustment.pieces,
      reason: adjustment.reason,
      notes: adjustment.notes || null,
    })
    .select()
    .single();

  if (error) throw error;

  await recalculateInventory();

  return data;
}
