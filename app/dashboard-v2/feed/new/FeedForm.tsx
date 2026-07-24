"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";

import SectionCard from "@/components/v2/ui/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FeedForm() {
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

  const totalCost = useMemo(() => {
    return (
      (Number(bagsPurchased) || 0) *
      (Number(costPerBag) || 0)
    );
  }, [bagsPurchased, costPerBag]);

  async function saveFeed(e: React.FormEvent) {
    e.preventDefault();

    if (!feedType) {
      toast.error("Feed type is required");
      return;
    }

    if (!bagsPurchased || Number(bagsPurchased) <= 0) {
      toast.error("Enter bags purchased");
      return;
    }

    if (!costPerBag) {
      toast.error("Enter cost per bag");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from("feed_inventory")
        .insert({
          purchase_date: purchaseDate,
          feed_type: feedType,
          supplier,
          bags_purchased: Number(bagsPurchased),
          daily_usage: Number(dailyUsage) || 0,
          cost_per_bag: Number(costPerBag),
          total_cost: totalCost,
          notes,
        });

      if (error) throw error;

      toast.success("Feed purchase recorded successfully!");

      router.push("/dashboard-v2/feed");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Unable to save feed purchase");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionCard>
      <form
        onSubmit={saveFeed}
        className="space-y-8"
      >
                <div className="grid gap-7 md:grid-cols-2">

          <div>
            <Label className="mb-2 block text-sm font-semibold text-slate-700">
              Purchase Date
            </Label>

            <Input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="h-12 rounded-2xl"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-slate-700">
              Feed Type
            </Label>

            <Input
              placeholder="Layers Mash"
              value={feedType}
              onChange={(e) => setFeedType(e.target.value)}
              className="h-12 rounded-2xl"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-slate-700">
              Supplier
            </Label>

            <Input
              placeholder="Supplier name"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="h-12 rounded-2xl"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-slate-700">
              Bags Purchased
            </Label>

            <Input
              type="number"
              placeholder="250"
              value={bagsPurchased}
              onChange={(e) => setBagsPurchased(e.target.value)}
              className="h-12 rounded-2xl"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-slate-700">
              Daily Usage
            </Label>

            <Input
              type="number"
              placeholder="7"
              value={dailyUsage}
              onChange={(e) => setDailyUsage(e.target.value)}
              className="h-12 rounded-2xl"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-slate-700">
              Cost Per Bag (₦)
            </Label>

            <Input
              type="number"
              placeholder="13400"
              value={costPerBag}
              onChange={(e) => setCostPerBag(e.target.value)}
              className="h-12 rounded-2xl"
            />
          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

          <h2 className="mb-5 text-lg font-semibold text-slate-800">
            Purchase Summary
          </h2>

          <div className="flex items-center justify-between">

            <span className="text-slate-600">
              Total Cost
            </span>

            <strong className="text-2xl">
              ₦{totalCost.toLocaleString()}
            </strong>

          </div>

        </div>

        <div>

          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Notes
          </Label>

          <Textarea
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes..."
            className="rounded-2xl"
          />

        </div>

        <Button
          type="submit"
          disabled={saving}
          className="h-12 w-full rounded-2xl bg-green-600 text-base font-semibold hover:bg-green-700"
        >
          {saving ? "Saving..." : "Save Feed Purchase"}
        </Button>

      </form>
    </SectionCard>
  );
}