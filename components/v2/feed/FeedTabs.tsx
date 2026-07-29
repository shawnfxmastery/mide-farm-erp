"use client";

import { useState } from "react";

import FeedList from "./FeedList";
import FeedUsageList from "../feed-usage/FeedUsageList";

export default function FeedTabs() {
  const [activeTab, setActiveTab] = useState<"purchases" | "usage">(
    "purchases"
  );

  return (
    <div className="space-y-5">
      <div className="flex rounded-2xl bg-slate-100 p-1">
        <button
          onClick={() => setActiveTab("purchases")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
            activeTab === "purchases"
              ? "bg-white text-slate-900 shadow"
              : "text-slate-500"
          }`}
        >
          Purchases
        </button>

        <button
          onClick={() => setActiveTab("usage")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
            activeTab === "usage"
              ? "bg-white text-slate-900 shadow"
              : "text-slate-500"
          }`}
        >
          Usage
        </button>
      </div>

      {activeTab === "purchases" ? <FeedList /> : <FeedUsageList />}
    </div>
  );
}