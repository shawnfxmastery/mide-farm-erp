"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Feed = {
  id: number;
  purchase_date: string;
  feed_type: string;
  supplier: string;
  bags_available: number;
  daily_usage: number;
  cost_per_bag: number;
  total_cost: number;
};

type Props = {
  feed: Feed | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function EditFeedModal({
  feed,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<Feed>(feed as Feed);

  useEffect(() => {
    if (feed) {
      setForm(feed);
    }
  }, [feed]);

  if (!feed || !form) return null;

  async function saveChanges() {
    const totalCost =
      form.bags_available * form.cost_per_bag;

    const { error } = await supabase
      .from("feed_inventory")
      .update({
        purchase_date: form.purchase_date,
        feed_type: form.feed_type,
        supplier: form.supplier,
        bags_available: form.bags_available,
        daily_usage: form.daily_usage,
        cost_per_bag: form.cost_per_bag,
        total_cost: totalCost,
      })
      .eq("id", form.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Feed updated successfully!");

    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-8 text-3xl font-bold">
          🌽 Edit Feed
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <label>Purchase Date</label>
            <input
              type="date"
              value={form.purchase_date}
              onChange={(e)=>
                setForm({...form,purchase_date:e.target.value})
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div>
            <label>Feed Type</label>
            <input
              value={form.feed_type}
              onChange={(e)=>
                setForm({...form,feed_type:e.target.value})
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div>
            <label>Supplier</label>
            <input
              value={form.supplier}
              onChange={(e)=>
                setForm({...form,supplier:e.target.value})
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div>
            <label>Bags Available</label>
            <input
              type="number"
              value={form.bags_available}
              onChange={(e)=>
                setForm({...form,bags_available:Number(e.target.value)})
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div>
            <label>Daily Usage</label>
            <input
              type="number"
              value={form.daily_usage}
              onChange={(e)=>
                setForm({...form,daily_usage:Number(e.target.value)})
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

          <div>
            <label>Cost Per Bag</label>
            <input
              type="number"
              value={form.cost_per_bag}
              onChange={(e)=>
                setForm({...form,cost_per_bag:Number(e.target.value)})
              }
              className="w-full rounded-xl bg-slate-800 p-3"
            />
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-6 py-3"
          >
            Cancel
          </button>

          <button
            onClick={saveChanges}
            className="rounded-xl bg-green-600 px-6 py-3"
          >
            💾 Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}