"use client";

import AppLayout from "@/components/v2/layout/AppLayout";

import InventoryHeader from "@/components/v2/inventory/InventoryHeader";
import InventoryOverview from "@/components/v2/inventory/InventoryOverview";
import InventoryActivity from "@/components/v2/inventory/InventoryActivity";

export default function InventoryPage() {
  return (
    <AppLayout>
      <div className="space-y-6">

        <InventoryHeader />

        <InventoryOverview />

        <InventoryActivity />

      </div>
    </AppLayout>
  );
}