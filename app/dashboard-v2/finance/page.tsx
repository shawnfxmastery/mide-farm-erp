import FinanceHeader from "@/components/v2/finance/FinanceHeader";
import FinanceOverview from "@/components/v2/finance/FinanceOverview";
import FinanceCharts from "@/components/v2/finance/FinanceCharts";
import OutstandingPayments from "@/components/v2/finance/OutstandingPayments";

export default function FinancePage() {
  return (
    <div className="space-y-6">

      <FinanceHeader />

      <FinanceOverview />

      <FinanceCharts />

      <OutstandingPayments />

    </div>
  );
}