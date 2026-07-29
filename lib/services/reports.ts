import { supabase } from "@/lib/supabase";

export async function getReportStats() {
  const [
    sales,
    expenses,
    production,
    feedUsage,
  ] = await Promise.all([
    supabase
      .from("egg_sales")
      .select("amount_paid"),

    supabase
      .from("expenses")
      .select("amount"),

    supabase
      .from("egg_production")
      .select("crates,pieces,mortality"),

    supabase
      .from("feed_usage")
      .select("bags_used"),
  ]);

  const totalRevenue =
    sales.data?.reduce(
      (sum, row) => sum + Number(row.amount_paid ?? 0),
      0
    ) ?? 0;

  const totalExpenses =
    expenses.data?.reduce(
      (sum, row) => sum + Number(row.amount ?? 0),
      0
    ) ?? 0;

  const totalCrates =
    production.data?.reduce(
      (sum, row) => sum + Number(row.crates ?? 0),
      0
    ) ?? 0;

  const totalPieces =
    production.data?.reduce(
      (sum, row) => sum + Number(row.pieces ?? 0),
      0
    ) ?? 0;

  const totalMortality =
    production.data?.reduce(
      (sum, row) => sum + Number(row.mortality ?? 0),
      0
    ) ?? 0;

  const totalFeed =
    feedUsage.data?.reduce(
      (sum, row) => sum + Number(row.bags_used ?? 0),
      0
    ) ?? 0;

  return {
    totalRevenue,
    totalExpenses,
    totalProfit:
      totalRevenue - totalExpenses,
    totalCrates,
    totalPieces,
    totalFeed,
    totalMortality,
  };
}