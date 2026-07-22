import AppLayout from "@/components/v2/layout/AppLayout";
import EditExpenseForm from "@/components/v2/expenses/EditExpenseForm";

export default async function EditExpensePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl">
        <EditExpenseForm id={id} />
      </div>
    </AppLayout>
  );
}