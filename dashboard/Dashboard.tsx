"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import AppLayout from "./AppLayout";
import Header from "./Header";
import StatsCards from "./StatsCards";
import ProductionChart from "./ProductionChart";
import RevenueChart from "./RevenueChart";
import RecentActivity from "./RecentActivity";
import EggProduction from "./EggProduction";
import ProductionHistory from "./ProductionHistory";
import ExecutiveInsights from "./ExecutiveInsights";
import AlertsPanel from "./AlertsPanel";
import QuickActions from "./QuickActions";

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: "🐔 Total Birds", value: "Loading..." },
    { title: "🥚 Today's Eggs", value: "Loading..." },
    { title: "📈 Production", value: "Loading..." },
    { title: "💰 Revenue", value: "Loading..." },
    { title: "💸 Expenses", value: "Loading..." },
    { title: "💵 Profit", value: "Loading..." },
  ]);

  const [productionData, setProductionData] = useState<number[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

  // Total Birds
  const { data: birds } = await supabase
    .from("bird_batches")
    .select("alive");

  const totalBirds =
    birds?.reduce(
      (sum, b) => sum + Number(b.alive ?? 0),
      0
    ) || 0;

  // Latest production
  const { data: production, error } = await supabase
    .from("egg_production")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

    if (error || !production || production.length === 0) {
      console.log(error);
      return;
    }

    const latest = production[0];

    // Production chart
    const { data: history } = await supabase
      .from("egg_production")
      .select("crates,birds")
      .order("created_at", { ascending: true })
      .limit(30);

    if (history) {
      const chart = history.map((day) =>
        Math.round(((day.crates * 30) / day.birds) * 100)
      );

      setProductionData(chart);
    }

    // Sales (CORRECT TABLE)
    const { data: sales } = await supabase
      .from("egg_sales")
      .select("total_amount");

    // Expenses
    const { data: expenseData } = await supabase
      .from("expenses")
      .select("amount");

    const totalRevenue =
      sales?.reduce(
        (sum, sale) => sum + Number(sale.total_amount ?? 0),
        0
      ) || 0;

    const totalExpenses =
      expenseData?.reduce(
        (sum, expense) => sum + Number(expense.amount ?? 0),
        0
      ) || 0;

    const totalProfit = totalRevenue - totalExpenses;

    setRevenue(totalRevenue);
    setExpenses(totalExpenses);

    const productionPercent = (
      ((latest.crates * 30) / latest.birds) *
      100
    ).toFixed(1);

    setStats([
      {
        title: "🐔 Total Birds",
        value: totalBirds.toLocaleString(),
      },
      {
        title: "🥚 Today's Eggs",
        value: `${latest.crates} Crates`,
      },
      {
        title: "📈 Production",
        value: `${productionPercent}%`,
      },
      {
        title: "💰 Revenue",
        value: `₦${totalRevenue.toLocaleString()}`,
      },
      {
        title: "💸 Expenses",
        value: `₦${totalExpenses.toLocaleString()}`,
      },
      {
        title: "💵 Profit",
        value: `₦${totalProfit.toLocaleString()}`,
      },
    ]);
  }

  return (
  <AppLayout>

    <Header />


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
          {stats.map((card) => (
            <StatsCards
              key={card.title}
              title={card.title}
              value={card.value}
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2">
            <ProductionChart data={productionData} />
          </div>

          <RevenueChart
            revenue={revenue}
            expenses={expenses}
          />

        </div>

        <div className="mt-8">
  <QuickActions />
</div>

<div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
  <ExecutiveInsights />
  <AlertsPanel />
</div>

<div className="mt-8">
  <RecentActivity />
</div>

        <div className="mt-8">
          <EggProduction />
        </div>

                <div className="mt-8">
          <ProductionHistory />
        </div>

  </AppLayout>
);
}