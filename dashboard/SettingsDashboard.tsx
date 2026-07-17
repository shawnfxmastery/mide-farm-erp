"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsDashboard() {

  const [farmName, setFarmName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const { data } = await supabase
      .from("settings")
      .select("*")
      .limit(1)
      .single();

    if (!data) return;

    setFarmName(data.farm_name ?? "");
    setOwnerName(data.owner_name ?? "");
    setPhone(data.phone ?? "");
    setEmail(data.email ?? "");
    setAddress(data.address ?? "");
  }

  async function saveFarmInformation() {
    const { error } = await supabase
      .from("settings")
      .update({
        farm_name: farmName,
        owner_name: ownerName,
        phone,
        email,
        address,
      })
      .eq("id", 1);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Farm information updated successfully!");
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          ⚙️ Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Configure your farm ERP preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-slate-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">
    🏢 Farm Information
  </h2>

  <div className="space-y-4">

    <input
  value={farmName}
  onChange={(e) => setFarmName(e.target.value)}
  className="w-full rounded-xl bg-slate-800 p-3"
  placeholder="Farm Name"
/>

    <input
  value={ownerName}
  onChange={(e) => setOwnerName(e.target.value)}
  className="w-full rounded-xl bg-slate-800 p-3"
  placeholder="Owner Name"
/>

    <input
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="w-full rounded-xl bg-slate-800 p-3"
  placeholder="Phone Number"
/>

    <input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full rounded-xl bg-slate-800 p-3"
  placeholder="Email Address"
/>

    <textarea
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  className="w-full rounded-xl bg-slate-800 p-3"
  placeholder="Farm Address"
  rows={3}
/>

    <button
  onClick={saveFarmInformation}
  className="rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-500"
>
  Save Farm Information
</button>

  </div>

</div>

        <div className="rounded-2xl bg-slate-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">
    👤 Account
  </h2>

  <div className="space-y-4">

    <input
      className="w-full rounded-xl bg-slate-800 p-3"
      placeholder="Username"
      defaultValue="Shawn"
    />

    <input
      className="w-full rounded-xl bg-slate-800 p-3"
      placeholder="Email"
      type="email"
    />

    <input
      className="w-full rounded-xl bg-slate-800 p-3"
      placeholder="New Password"
      type="password"
    />

    <input
      className="w-full rounded-xl bg-slate-800 p-3"
      placeholder="Confirm Password"
      type="password"
    />

    <button
      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
    >
      Update Account
    </button>

  </div>

</div>

        <div className="rounded-2xl bg-slate-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">
    ℹ️ About Mide Farm ERP
  </h2>

  <div className="space-y-3 text-slate-300">

    <p>
      <strong>Version:</strong> 1.0
    </p>

    <p>
      <strong>Farm:</strong> Mide Farm & Poultry
    </p>

    <p>
      <strong>Framework:</strong> Next.js + Supabase
    </p>

    <p>
      <strong>Database:</strong> PostgreSQL
    </p>

    <p>
      <strong>Designed For:</strong> Egg Layer Farm Management
    </p>

  </div>

  </div>

        <div className="rounded-2xl bg-slate-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">
    💾 Backup & Restore
  </h2>

  <div className="space-y-4">

    <button
      className="w-full rounded-xl bg-green-600 py-3 font-semibold hover:bg-green-500"
    >
      📥 Export Farm Data
    </button>

    <button
      className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-500"
    >
      📤 Import Farm Data
    </button>

    <button
      className="w-full rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-500"
    >
      🗑 Reset Demo Data
    </button>

  </div>

</div>

      </div>

    </div>

  );
}