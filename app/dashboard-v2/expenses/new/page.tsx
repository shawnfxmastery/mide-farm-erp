import AppLayout from "@/components/v2/layout/AppLayout";
import NewExpenseForm from "@/components/v2/expenses/NewExpenseForm";

export default function NewExpensePage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl">
        <NewExpenseForm />
      </div>
    </AppLayout>
  );
}