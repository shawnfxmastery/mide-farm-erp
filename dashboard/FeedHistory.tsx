"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EditFeedModal from "./EditFeedModal";

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

export default function FeedHistory() {
  const [records, setRecords] = useState<Feed[]>([]);
  const [search, setSearch] = useState("");
  const [editingFeed, setEditingFeed] = useState<Feed | null>(null);

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed() {
    const { data, error } = await supabase
      .from("feed_inventory")
      .select("*")
      .order("purchase_date", { ascending: false });

    if (!error && data) {
      setRecords(data);
    }
  }

  async function deleteFeed(id: number) {
    const confirmDelete = confirm(
      "Delete this feed record?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("feed_inventory")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadFeed();
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        🌽 Feed History
      </h2>
      <div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Search feed or supplier..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl bg-slate-800 px-4 py-4 text-white placeholder-slate-500"
  />
</div>
<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">
      🌽 Total Bags
    </p>

    <h2 className="mt-3 text-4xl font-bold text-green-400">
      {records.reduce((sum, f) => sum + f.bags_available, 0)}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">
      📋 Records
    </p>

    <h2 className="mt-3 text-4xl font-bold text-blue-400">
      {records.length}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">
      💰 Feed Value
    </p>

    <h2 className="mt-3 text-4xl font-bold text-yellow-400">
      ₦
      {records
        .reduce((sum, f) => sum + Number(f.total_cost), 0)
        .toLocaleString()}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">
      🥣 Avg Daily Usage
    </p>

    <h2 className="mt-3 text-4xl font-bold text-purple-400">
      {records.length > 0
        ? (
            records.reduce(
              (sum, f) => sum + f.daily_usage,
              0
            ) / records.length
          ).toFixed(1)
        : 0}
    </h2>
  </div>

</div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left text-slate-400">

              <th className="py-3">Date</th>
              <th>Feed</th>
              <th>Supplier</th>
              <th>Bags</th>
              <th>Daily Usage</th>
              <th>Cost/Bag</th>
              <th>Total Cost</th>
              <th>Days Left</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {records
  .filter((feed) => {
    const text = search.toLowerCase();

    return (
      feed.feed_type.toLowerCase().includes(text) ||
      feed.supplier.toLowerCase().includes(text)
    );
  })
  .map((feed) => (

              <tr
                key={feed.id}
                className="border-b border-slate-800 hover:bg-slate-800/50"
              >

                <td className="py-4">
                  {feed.purchase_date}
                </td>

                <td>{feed.feed_type}</td>

                <td>{feed.supplier}</td>

                <td>{feed.bags_available}</td>

                <td>{feed.daily_usage}</td>

<td className="text-blue-400 font-semibold">
  ₦{Number(feed.cost_per_bag).toLocaleString()}
</td>

<td className="font-semibold text-green-400">
  ₦{Number(feed.total_cost ?? 0).toLocaleString()}
</td>

<td className="font-semibold">
  {feed.daily_usage > 0
    ? Math.floor(feed.bags_available / feed.daily_usage)
    : 0} Days
</td>

                <td>

                  <div className="flex gap-2">

  <button
    onClick={() => setEditingFeed(feed)}
    className="rounded-lg bg-yellow-500 px-3 py-1 text-black hover:bg-yellow-400"
  >
    ✏ Edit
  </button>

  <button
    onClick={() => deleteFeed(feed.id)}
    className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-500"
  >
    🗑 Delete
  </button>

</div>

                </td>

              </tr>

            ))}

                    </tbody>

        </table>

      </div>

      <EditFeedModal
        feed={editingFeed}
        onClose={() => setEditingFeed(null)}
        onSaved={loadFeed}
      />

    </div>
  );
}