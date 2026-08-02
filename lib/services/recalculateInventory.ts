import { supabase } from "@/lib/supabase";

const EGGS_PER_CRATE = 30;

export async function recalculateInventory() {
  // Total production
  const { data: production, error: productionError } =
    await supabase
      .from("egg_production")
      .select("crates,pieces");

  if (productionError) throw productionError;

  // Total sales
  const { data: sales, error: salesError } =
    await supabase
      .from("egg_sales")
      .select("crates,pieces");

  if (salesError) throw salesError;

  let totalProduced = 0;

  for (const row of production ?? []) {
    totalProduced += row.crates * EGGS_PER_CRATE + row.pieces;
  }

  let totalSold = 0;

  for (const row of sales ?? []) {
    totalSold += row.crates * EGGS_PER_CRATE + row.pieces;
  }

  const remaining = totalProduced - totalSold;

  const crates = Math.floor(
    Math.max(remaining, 0) / EGGS_PER_CRATE
  );

  const pieces =
    Math.max(remaining, 0) % EGGS_PER_CRATE;

  const { error } = await supabase
    .from("inventory")
    .update({
      crates,
      pieces,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) throw error;

  return {
    crates,
    pieces,
  };
}