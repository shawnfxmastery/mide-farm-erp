import AppLayout from "@/components/v2/layout/AppLayout";
import AuthGuard from "@/components/v2/auth/AuthGuard";

export default function DashboardV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppLayout>
        <div className="mx-auto w-full max-w-7xl px-4 pb-8">
          {children}
        </div>
      </AppLayout>
    </AuthGuard>
  );
}