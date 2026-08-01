import ExecutiveHero from "@/components/v2/dashboard/ExecutiveHero";
import FarmSummaryCard from "@/components/v2/dashboard/FarmSummaryCard";
import QuickActionGrid from "@/components/v2/dashboard/QuickActionGrid";
import RecentActivity from "@/components/v2/dashboard/RecentActivity";

import {
  DashboardProvider,
} from "@/components/v2/dashboard/context/DashboardContext";

export default function DashboardV2() {
  return (
    <DashboardProvider>
      <div className="space-y-8">

        {/* Executive Hero */}
        <ExecutiveHero />

        {/* Farm Summary */}
        <FarmSummaryCard />

        {/* Quick Actions */}
        <QuickActionGrid />

        {/* Recent Activity */}
        <RecentActivity />

      </div>
    </DashboardProvider>
  );
}