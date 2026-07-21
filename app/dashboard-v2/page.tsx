import AppLayout from "@/components/v2/layout/AppLayout";
import FarmSummaryCard from "@/components/v2/dashboard/FarmSummaryCard";
import QuickActionGrid from "@/components/v2/dashboard/QuickActionGrid";
import RecentActivity from "@/components/v2/dashboard/RecentActivity";

export default function DashboardV2() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-md space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Welcome back to Mide Farm ERP
          </p>
        </div>

        <FarmSummaryCard />

        <QuickActionGrid />

        <RecentActivity />

      </div>
    </AppLayout>
  );
}