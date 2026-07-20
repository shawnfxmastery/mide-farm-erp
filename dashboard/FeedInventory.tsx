"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FeedInventory() {
  const [purchaseDate, setPurchaseDate] = useState("");
  const [feedType, setFeedType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [bags, setBags] = useState("");
  const [dailyUsage, setDailyUsage] = useState("");
  const [costPerBag, setCostPerBag] = useState("");

  const totalCost =
    Number(bags || 0) * Number(costPerBag || 0);

  async function saveFeed() {
    const { error } = await supabase
      .from("feed_inventory")
      .insert([
        {
          purchase_date: purchaseDate,
          feed_type: feedType,
          supplier,
          bags_available: Number(bags),
          daily_usage: Number(dailyUsage),
          cost_per_bag: Number(costPerBag),
          total_cost: totalCost,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Feed saved successfully!");

    setPurchaseDate("");
    setFeedType("");
    setSupplier("");
    setBags("");
    setDailyUsage("");
    setCostPerBag("");

    window.location.reload();
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 lg:p-8 shadow-xl">

      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        🌽 Feed Inventory
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Purchase Date
          </label>

          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Feed Type
          </label>

          <input
            placeholder="Layers Mash"
            value={feedType}
            onChange={(e) => setFeedType(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Supplier
          </label>

          <input
            placeholder="Supplier Name"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Bags Available
          </label>

          <input
            type="number"
            placeholder="250"
            value={bags}
            onChange={(e) => setBags(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Daily Usage
          </label>

          <input
            type="number"
            placeholder="7"
            value={dailyUsage}
            onChange={(e) => setDailyUsage(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Cost Per Bag
          </label>

          <input
            type="number"
            placeholder="13400"
            value={costPerBag}
            onChange={(e) => setCostPerBag(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-green-700 p-5 text-center">

        <p className="text-sm text-green-100">
          Total Feed Cost
        </p>

        <h2 className="mt-2 break-words text-2xl font-bold sm:text-3xl">
          ₦{totalCost.toLocaleString()}
        </h2>

      </div>

      <button
        onClick={saveFeed}
        className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-green-500 sm:w-auto"
      >
        Save Feed
      </button>

    </div>
  );
}