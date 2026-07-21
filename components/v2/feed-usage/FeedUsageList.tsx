"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

type FeedUsage = {
  id: number;
  usage_date: string;
  feed_type: string;
  birds_fed: number;
  bags_used: number;
  notes: string | null;
};

export default function FeedUsageList() {
  const [records, setRecords] = useState<FeedUsage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedUsage();
  }, []);

  async function loadFeedUsage() {
    const { data, error } = await supabase
      .from("feed_usage")
      .select("*")
      .order("usage_date", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setRecords(data || []);
    }

    setLoading(false);
  }

  async function deleteRecord(id: number) {
    const confirmed = window.confirm(
      "Delete this feed usage record?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("feed_usage")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Feed usage deleted successfully!");

    await loadFeedUsage();
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
        Loading feed usage...
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-slate-500">
        No feed usage records found.
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
            {new Date(record.usage_date).toLocaleDateString()}
          </p>

          <div className="mt-4 space-y-3">

            <div className="flex justify-between">
              <span className="text-slate-500">
                🌾 Feed Type
              </span>

              <span className="font-semibold">
                {record.feed_type}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                🥣 Bags Used
              </span>

              <span className="font-semibold">
                {record.bags_used}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                🐔 Birds Fed
              </span>

              <span className="font-semibold">
                {record.birds_fed}
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
              href={`/dashboard-v2/feed-usage/edit/${record.id}`}
              className="flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-blue-600 hover:bg-blue-50"
            >
              <Pencil size={16} />
              Edit
            </Link>

            <button
              onClick={() => deleteRecord(record.id)}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50"
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