import ProductionHeader from "@/components/v2/production/ProductionHeader";
import ProductionOverviewCard from "@/components/v2/production/ProductionOverviewCard";
import FloatingActionButton from "@/components/v2/production/FloatingActionButton";
import ProductionList from "@/components/v2/production/ProductionList";
import ProductionPerformance from "@/components/v2/production/ProductionPerformance";

export default function ProductionPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl space-y-6">
        <ProductionHeader />

        <ProductionOverviewCard />

        <ProductionPerformance />

        <ProductionList />
      </div>

      <FloatingActionButton />
    </>
  );
}
