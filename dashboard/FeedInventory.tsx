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
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        🌽 Feed Inventory
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <input
          placeholder="Feed Type"
          value={feedType}
          onChange={(e) => setFeedType(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <input
          placeholder="Supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <input
          type="number"
          placeholder="Bags Available"
          value={bags}
          onChange={(e) => setBags(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <input
          type="number"
          placeholder="Daily Usage"
          value={dailyUsage}
          onChange={(e) => setDailyUsage(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

        <input
          type="number"
          placeholder="Cost Per Bag"
          value={costPerBag}
          onChange={(e) => setCostPerBag(e.target.value)}
          className="rounded-xl bg-slate-800 p-3"
        />

      </div>

      <div className="mt-6 rounded-2xl bg-green-600 p-4 text-center">

        <p className="text-sm">
          Total Feed Cost
        </p>

        <h2 className="text-3xl font-bold">
          ₦{totalCost.toLocaleString()}
        </h2>

      </div>

      <button
        onClick={saveFeed}
        className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-bold hover:bg-green-500"
      >
        Save Feed
      </button>

    </div>
  );
}