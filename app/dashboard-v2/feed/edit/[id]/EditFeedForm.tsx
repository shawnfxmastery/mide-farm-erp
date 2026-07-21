"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Props = {
  id: string;
};

export default function EditFeedForm({ id }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [purchaseDate, setPurchaseDate] = useState("");
  const [feedType, setFeedType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [bagsPurchased, setBagsPurchased] = useState("");
  const [dailyUsage, setDailyUsage] = useState("");
  const [costPerBag, setCostPerBag] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadRecord();
  }, []);

  async function loadRecord() {
    const { data, error } = await supabase
      .from("feed_inventory")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      toast.error(error.message);
      router.push("/dashboard-v2/feed");
      return;
    }

    setPurchaseDate(data.purchase_date);
    setFeedType(data.feed_type);
    setSupplier(data.supplier);
    setBagsPurchased(String(data.bags_purchased));
    setDailyUsage(String(data.daily_usage));
    setCostPerBag(String(data.cost_per_bag));
    setNotes(data.notes ?? "");

    setLoading(false);
  }

  const totalCost =
    (Number(bagsPurchased) || 0) *
    (Number(costPerBag) || 0);

  async function updateFeed(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("feed_inventory")
      .update({
        purchase_date: purchaseDate,
        feed_type: feedType,
        supplier,
        bags_purchased: Number(bagsPurchased),
        daily_usage: Number(dailyUsage),
        cost_per_bag: Number(costPerBag),
        total_cost: totalCost,
        notes,
      })
      .eq("id", Number(id));

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Feed updated successfully!");

    router.push("/dashboard-v2/feed");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Feed Purchase
      </h1>

      <form
        onSubmit={updateFeed}
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
          placeholder="Cost Per Bag"
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
          {saving ? "Updating..." : "Update Feed Purchase"}
        </button>
      </form>
    </div>
  );
}