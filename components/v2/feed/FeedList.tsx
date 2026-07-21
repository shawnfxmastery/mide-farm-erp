"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

type FeedRecord = {
  id: number;
  purchase_date: string;
  feed_type: string;
  supplier: string;
  bags_purchased: number;
  daily_usage: number;
  cost_per_bag: number;
  total_cost: number;
  notes: string | null;
};

export default function FeedList() {
  const [records, setRecords] = useState<FeedRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed() {
    const { data, error } = await supabase
      .from("feed_inventory")
      .select("*")
      .order("purchase_date", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setRecords(data || []);
    }

    setLoading(false);
  }

  async function deleteRecord(id: number) {
    const confirmed = window.confirm(
      "Delete this feed record?\n\nThis action cannot be undone."
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("feed_inventory")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Feed record deleted successfully!");

    await loadFeed();
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
        Loading feed records...
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-slate-500">
        No feed purchases found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div
          key={record.id}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="font-semibold">
            {new Date(record.purchase_date).toLocaleDateString()}
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">🌾 Feed Type</span>
              <span className="font-semibold">{record.feed_type}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">📦 Bags Purchased</span>
              <span className="font-semibold">{record.bags_purchased}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">🥣 Daily Usage</span>
              <span className="font-semibold">
                {record.daily_usage} Bags
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">🏪 Supplier</span>
              <span className="font-semibold">{record.supplier}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">💰 Total Cost</span>
              <span className="font-semibold">
                ₦{record.total_cost.toLocaleString()}
              </span>
            </div>

            {record.notes && (
              <div className="rounded-xl bg-slate-50 p-3 text-sm italic text-slate-600">
                {record.notes}
              </div>
            )}
          </div>

          <div className="mt-5 flex gap-3">
            <Link
              href={`/dashboard-v2/feed/edit/${record.id}`}
              className="flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
            >
              <Pencil size={16} />
              Edit
            </Link>

            <button
              onClick={() => deleteRecord(record.id)}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}