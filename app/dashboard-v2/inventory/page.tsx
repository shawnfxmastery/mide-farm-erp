"use client";

import InventoryHeader from "@/components/v2/inventory/InventoryHeader";
import InventoryOverview from "@/components/v2/inventory/InventoryOverview";
import InventoryActivity from "@/components/v2/inventory/InventoryActivity";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <InventoryHeader />

      <InventoryOverview />

      <InventoryActivity />
    </div>
  );
}