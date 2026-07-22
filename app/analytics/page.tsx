import AppLayout from "@/components/v2/layout/AppLayout";

import ProductionChart from "../../components/v2/dashboard/charts/ProductionChart";
import SalesExpenseChart from "../../components/v2/dashboard/charts/SalesExpenseChart";
import FeedUsageChart from "../../components/v2/dashboard/charts/FeedUsageChart";
import AnalyticsStats from "../../components/v2/dashboard/charts/AnalyticsStats";
import AnalyticsFilters from "../../components/v2/dashboard/charts/AnalyticsFilters";

import {
  DashboardProvider,
} from "@/components/v2/dashboard/context/DashboardContext";

export default function AnalyticsPage() {
  return (
    <DashboardProvider>
      <AppLayout>
        <div className="mx-auto max-w-7xl space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Analytics
            </h1>

            <p className="mt-1 text-slate-500">
              Business Intelligence Dashboard
            </p>
          </div>

          {/* Date Filters */}
          <AnalyticsFilters />

          {/* KPI Cards */}
          <AnalyticsStats />

          {/* Production Chart */}
          <ProductionChart />

          {/* Bottom Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <SalesExpenseChart />

            <FeedUsageChart />
          </div>

        </div>
      </AppLayout>
    </DashboardProvider>
  );
}