import AppLayout from "@/components/v2/layout/AppLayout";

import SalesHeader from "@/components/v2/sales/SalesHeader";
import SalesOverviewCard from "@/components/v2/sales/SalesOverviewCard";
import SalesList from "@/components/v2/sales/SalesList";
import FloatingSalesButton from "@/components/v2/sales/FloatingSalesButton";

export default function SalesPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <SalesHeader />

        <SalesOverviewCard />

        <SalesList />
      </div>

      <FloatingSalesButton />
    </AppLayout>
  );
}