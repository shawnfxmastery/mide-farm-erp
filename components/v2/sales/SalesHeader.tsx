import PageHeader from "@/components/v2/ui/PageHeader";

export default function SalesHeader() {
  return (
    <PageHeader
      title="Egg Sales"
      subtitle="Manage egg sales, customer payments and revenue."
      buttonText="New Sale"
      buttonHref="/dashboard-v2/sales/new"
    />
  );
}