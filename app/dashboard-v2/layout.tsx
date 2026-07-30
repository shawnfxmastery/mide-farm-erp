import AppLayout from "@/components/v2/layout/AppLayout";
import AuthGuard from "@/components/v2/auth/AuthGuard";
import { ToastProvider } from "@/components/v2/ui/ToastProvider";

export default function DashboardV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ToastProvider>
        <AppLayout>
          <div className="mx-auto w-full max-w-7xl px-4 pb-8">
            {children}
          </div>
        </AppLayout>
      </ToastProvider>
    </AuthGuard>
  );
}