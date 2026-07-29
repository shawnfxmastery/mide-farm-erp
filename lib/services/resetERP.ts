import { supabase } from "@/lib/supabase";

export async function resetERP() {
  // Delete production
  const { error: productionError } = await supabase
    .from("egg_production")
    .delete()
    .neq("id", 0);

  if (productionError) throw productionError;

  // Delete egg sales
  const { error: salesError } = await supabase
    .from("egg_sales")
    .delete()
    .neq("id", 0);

  if (salesError) throw salesError;

  // Delete expenses
  const { error: expenseError } = await supabase
    .from("expenses")
    .delete()
    .neq("id", 0);

  if (expenseError) throw expenseError;

  // Delete inventory activity
  const { error: activityError } = await supabase
    .from("inventory_activity")
    .delete()
    .neq("id", 0);

  if (activityError) throw activityError;

  // Reset inventory
  const { error: inventoryError } = await supabase
    .from("inventory")
    .update({
      crates: 0,
      pieces: 0,
    })
    .eq("id", 1);

  if (inventoryError) throw inventoryError;
}