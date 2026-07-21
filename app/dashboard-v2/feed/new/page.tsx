"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function NewFeedPage() {
  const router = useRouter();

  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [feedType, setFeedType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [bagsPurchased, setBagsPurchased] = useState("");
  const [dailyUsage, setDailyUsage] = useState("");
  const [costPerBag, setCostPerBag] = useState("");
  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);

  const totalCost =
    (Number(bagsPurchased) || 0) *
    (Number(costPerBag) || 0);

  async function saveFeed(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("feed_inventory")
      .insert({
        purchase_date: purchaseDate,
        feed_type: feedType,
        supplier,
        bags_purchased: Number(bagsPurchased),
        daily_usage: Number(dailyUsage),
        cost_per_bag: Number(costPerBag),
        total_cost: totalCost,
        notes,
      });

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Feed purchase saved successfully!");

    router.push("/dashboard-v2/feed");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Add Feed Purchase
      </h1>

      <form
        onSubmit={saveFeed}
        className="space-y-4"
      >
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) =>
            setPurchaseDate(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="text"
          placeholder="Feed Type"
          value={feedType}
          onChange={(e) =>
            setFeedType(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="text"
          placeholder="Supplier"
          value={supplier}
          onChange={(e) =>
            setSupplier(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Bags Purchased"
          value={bagsPurchased}
          onChange={(e) =>
            setBagsPurchased(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Daily Usage"
          value={dailyUsage}
          onChange={(e) =>
            setDailyUsage(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Cost Per Bag (₦)"
          value={costPerBag}
          onChange={(e) =>
            setCostPerBag(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            Total Cost
          </p>

          <p className="mt-2 text-2xl font-bold">
            ₦{totalCost.toLocaleString()}
          </p>
        </div>

        <textarea
          rows={4}
          placeholder="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-green-600 p-4 font-semibold text-white"
        >
          {saving ? "Saving..." : "Save Feed Purchase"}
        </button>
      </form>
    </div>
  );
}