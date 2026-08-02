import { supabase } from "@/lib/supabase";

export type FinanceSummary = {
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
  outstanding: number;
  totalSales: number;
  totalCratesSold: number;
  averageSellingPrice: number;
};

export async function getFinanceSummary(): Promise<FinanceSummary> {
  const [{ data: sales }, { data: expenses }] =
    await Promise.all([
      supabase
        .from("egg_sales")
        .select(
          "crates,total_amount,amount_paid,balance"
        ),

      supabase
        .from("expenses")
        .select("amount"),
    ]);

  const revenue =
    sales?.reduce(
      (sum, sale) =>
        sum + Number(sale.total_amount || 0),
      0
    ) ?? 0;

  const expenseTotal =
    expenses?.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    ) ?? 0;

  const outstanding =
    sales?.reduce(
      (sum, sale) =>
        sum + Number(sale.balance || 0),
      0
    ) ?? 0;

  const totalCratesSold =
    sales?.reduce(
      (sum, sale) =>
        sum + Number(sale.crates || 0),
      0
    ) ?? 0;

  const averageSellingPrice =
    totalCratesSold > 0
      ? revenue / totalCratesSold
      : 0;

  return {
    revenue,
    expenses: expenseTotal,
    profit: revenue - expenseTotal,
    cashFlow: revenue - expenseTotal,
    outstanding,
    totalSales: sales?.length ?? 0,
    totalCratesSold,
    averageSellingPrice,
  };
}