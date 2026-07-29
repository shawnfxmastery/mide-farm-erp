import ProductionHeader from "@/components/v2/production/ProductionHeader";
import ProductionOverviewCard from "@/components/v2/production/ProductionOverviewCard";
import FloatingActionButton from "@/components/v2/production/FloatingActionButton";
import ProductionList from "@/components/v2/production/ProductionList";

export default function ProductionPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl space-y-6">
        <ProductionHeader />

        <ProductionOverviewCard />

        <ProductionList />
      </div>

      <FloatingActionButton />
    </>
  );
}