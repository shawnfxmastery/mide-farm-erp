import SalesHeader from "@/components/v2/sales/SalesHeader";
import SalesOverviewCard from "@/components/v2/sales/SalesOverviewCard";
import SalesList from "@/components/v2/sales/SalesList";
import FloatingSalesButton from "@/components/v2/sales/FloatingSalesButton";

export default function SalesPage() {
  return (
    <div className="space-y-8">
      <SalesHeader />

      <SalesOverviewCard />

      <SalesList />

      <FloatingSalesButton />
    </div>
  );
}