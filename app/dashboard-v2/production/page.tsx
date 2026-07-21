import AppLayout from "@/components/v2/layout/AppLayout";

import ProductionHeader from "@/components/v2/production/ProductionHeader";
import ProductionOverviewCard from "@/components/v2/production/ProductionOverviewCard";
import ProductionHistoryCard from "@/components/v2/production/ProductionHistoryCard";
import FloatingActionButton from "@/components/v2/production/FloatingActionButton";
import ProductionList from "@/components/v2/production/ProductionList";

export default function ProductionPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">

        <ProductionHeader />

        <ProductionOverviewCard />

        <ProductionList />

      </div>

      <FloatingActionButton />
    </AppLayout>
  );
}