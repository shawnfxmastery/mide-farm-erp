import FarmSummaryCard from "@/components/v2/dashboard/FarmSummaryCard";
import QuickActionGrid from "@/components/v2/dashboard/QuickActionGrid";
import RecentActivity from "@/components/v2/dashboard/RecentActivity";

import {
  DashboardProvider,
} from "@/components/v2/dashboard/context/DashboardContext";

export default function DashboardV2() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <DashboardProvider>
      <div className="space-y-8">

        {/* Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <p className="text-sm font-medium text-green-600">
            {today}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            👋 {greeting}, Shawn
          </h1>

          <p className="mt-3 text-slate-500">
            Welcome back to Mide Farm ERP.
            Here's what's happening on your farm today.
          </p>

        </div>

        <FarmSummaryCard />

        <QuickActionGrid />

        <RecentActivity />

      </div>
    </DashboardProvider>
  );
}