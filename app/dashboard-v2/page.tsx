import AppLayout from "@/components/v2/layout/AppLayout";
import MobileHeader from "@/components/v2/layout/MobileHeader";

export default function DashboardV2() {
  return (
    <AppLayout>
      <MobileHeader />

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Mide Farm ERP
          </h2>

          <p className="mt-2 text-slate-500">
            Poultry Management System
          </p>
        </div>
      </div>
    </AppLayout>
  );
}