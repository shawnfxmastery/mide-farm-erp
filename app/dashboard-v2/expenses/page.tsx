import AppLayout from "@/components/v2/layout/AppLayout";

import ExpensesHeader from "../../../components/v2/expenses/ExpensesHeader";
import ExpensesOverviewCard from "@/components/v2/expenses/ExpensesOverviewCard";
import ExpensesList from "@/components/v2/expenses/ExpensesList";
import FloatingExpenseButton from "@/components/v2/expenses/FloatingExpenseButton";
import ExpenseActions from "@/components/v2/expenses/ExpenseActions";

export default function ExpensesPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <ExpensesHeader />

        <ExpensesOverviewCard />

        <ExpenseActions />

        <ExpensesList />
      </div>

      <FloatingExpenseButton />
    </AppLayout>
  );
}