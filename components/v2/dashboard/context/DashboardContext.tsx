"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { supabase } from "@/lib/supabase";

type DashboardData = {
  production: any[];
  sales: any[];
  expenses: any[];
  feedInventory: any[];
  feedUsage: any[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const DashboardContext =
  createContext<DashboardData | null>(null);

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [production, setProduction] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [feedInventory, setFeedInventory] = useState<any[]>([]);
  const [feedUsage, setFeedUsage] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);

    const [
      productionResult,
      salesResult,
      expensesResult,
      inventoryResult,
      usageResult,
    ] = await Promise.all([
      supabase
        .from("egg_production")
        .select("*")
        .order("date"),

      supabase
        .from("egg_sales")
        .select("*")
        .order("date"),

      supabase
        .from("expenses")
        .select("*")
        .order("date"),

      supabase
        .from("feed_inventory")
        .select("*")
        .order("purchase_date"),

      supabase
        .from("feed_usage")
        .select("*")
        .order("usage_date"),
    ]);

    setProduction(productionResult.data ?? []);
    setSales(salesResult.data ?? []);
    setExpenses(expensesResult.data ?? []);
    setFeedInventory(inventoryResult.data ?? []);
    setFeedUsage(usageResult.data ?? []);

    setLoading(false);
  }

  return (
    <DashboardContext.Provider
      value={{
        production,
        sales,
        expenses,
        feedInventory,
        feedUsage,
        loading,
        refresh,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}