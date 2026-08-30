import { supabase } from "@/lib/supabase";

const EGGS_PER_CRATE = 30;

export async function recalculateInventory() {
  // Get the verified inventory reconciliation point
  const { data: inventory, error: inventoryError } =
    await supabase
      .from("inventory")
      .select(
        "opening_crates, opening_pieces, reconciliation_date"
      )
      .eq("id", 1)
      .single();

  if (inventoryError) throw inventoryError;

  if (!inventory) {
    throw new Error("Inventory row not found.");
  }

  const openingCrates =
    Number(inventory.opening_crates ?? 0);

  const openingPieces =
    Number(inventory.opening_pieces ?? 0);

  const reconciliationDate =
    inventory.reconciliation_date;

  if (!reconciliationDate) {
    throw new Error(
      "Inventory reconciliation date has not been set."
    );
  }

  // Production recorded after reconciliation
  const { data: production, error: productionError } =
    await supabase
      .from("egg_production")
      .select("crates,pieces,date")
      .gt("date", reconciliationDate);

  if (productionError) throw productionError;

  // Sales recorded after reconciliation
  const { data: sales, error: salesError } =
    await supabase
      .from("egg_sales")
      .select("crates,pieces,date")
      .gt("date", reconciliationDate);

  if (salesError) throw salesError;

  // Adjustments recorded after reconciliation, such as broken eggs
  // or eggs given to replace a customer's damaged eggs.
  const { data: adjustments, error: adjustmentsError } =
    await supabase
      .from("egg_adjustments")
      .select("crates,pieces,date")
      .gt("date", reconciliationDate);

  if (adjustmentsError) throw adjustmentsError;

  // Start with verified physical stock
  let totalEggs =
    openingCrates * EGGS_PER_CRATE +
    openingPieces;

  // Add production
  for (const row of production ?? []) {
    totalEggs +=
      Number(row.crates ?? 0) * EGGS_PER_CRATE +
      Number(row.pieces ?? 0);
  }

  // Subtract sales
  for (const row of sales ?? []) {
    totalEggs -=
      Number(row.crates ?? 0) * EGGS_PER_CRATE +
      Number(row.pieces ?? 0);
  }

  // Subtract eggs removed through adjustments.
  for (const row of adjustments ?? []) {
    totalEggs -=
      Number(row.crates ?? 0) * EGGS_PER_CRATE +
      Number(row.pieces ?? 0);
  }

  // Never allow negative inventory
  totalEggs = Math.max(totalEggs, 0);

  // Convert eggs back to crates + pieces
  const crates = Math.floor(
    totalEggs / EGGS_PER_CRATE
  );

  const pieces =
    totalEggs % EGGS_PER_CRATE;

  // Save inventory
  const { error: updateError } =
    await supabase
      .from("inventory")
      .update({
        crates,
        pieces,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

  if (updateError) throw updateError;

  return {
    crates,
    pieces,
  };
}
