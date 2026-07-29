import { supabase } from "@/lib/supabase";

const CRATE_VALUE = 4000;

export async function getDashboardStats() {
  const today = new Date().toISOString().split("T")[0];

  const [
    inventory,
    production,
    sales,
    expenses,
    feedUsage,
    latestBirds,
    todayProductionRecord,
  ] = await Promise.all([
    supabase
      .from("inventory")
      .select("*")
      .eq("id", 1)
      .single(),

    supabase
      .from("egg_production")
      .select("*")
      .eq("date", today),

    supabase
      .from("egg_sales")
      .select("*")
      .eq("date", today),

    supabase
      .from("expenses")
      .select("*")
      .eq("date", today),

    supabase
      .from("feed_usage")
      .select("*")
      .eq("usage_date", today),

    // Latest bird count
    supabase
      .from("egg_production")
      .select("birds")
      .order("date", { ascending: false })
      .limit(1)
      .single(),

    // Today's production only
    supabase
      .from("egg_production")
      .select("crates,pieces,mortality")
      .eq("date", today)
      .maybeSingle(),
  ]);

  const crates = inventory.data?.crates ?? 0;

  const pieces = inventory.data?.pieces ?? 0;

  const inventoryValue = crates * CRATE_VALUE;

  const todayProduction =
    production.data?.reduce(
      (sum, row) => sum + Number(row.crates ?? 0),
      0
    ) ?? 0;

  const todayRevenue =
    sales.data?.reduce(
      (sum, row) => sum + Number(row.amount_paid ?? 0),
      0
    ) ?? 0;

  const todayExpenses =
    expenses.data?.reduce(
      (sum, row) => sum + Number(row.amount ?? 0),
      0
    ) ?? 0;

  const todayFeed =
    feedUsage.data?.reduce(
      (sum, row) => sum + Number(row.bags_used ?? 0),
      0
    ) ?? 0;

  return {
    crates,
    pieces,
    inventoryValue,

    todayProduction,

    todayRevenue,

    todayExpenses,

    todayFeed,

    // Always latest bird count
    birdsAlive: latestBirds.data?.birds ?? 0,

    // Only today's production
    eggsToday: {
      crates: todayProductionRecord.data?.crates ?? 0,
      pieces: todayProductionRecord.data?.pieces ?? 0,
    },

    // Only today's mortality
    mortality: todayProductionRecord.data?.mortality ?? 0,

    profit: todayRevenue - todayExpenses,
  };
}