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
        <h1 className="text-3xl font-bold sm:text-4xl">
          ⚙️ Settings
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Configure your farm ERP preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Farm Information */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-6 lg:p-8">

          <h2 className="mb-6 text-xl font-bold sm:text-2xl">
            🏢 Farm Information
          </h2>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Farm Name
              </label>

              <input
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                placeholder="Farm Name"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Owner Name
              </label>

              <input
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Owner Name"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Phone Number
              </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Email Address
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Farm Address
              </label>

              <textarea
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Farm Address"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
              />
            </div>

            <button
              onClick={saveFarmInformation}
              className="w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-green-500 sm:w-auto"
            >
              Save Farm Information
            </button>

          </div>

        </div>

        {/* Account */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-6 lg:p-8">

          <h2 className="mb-6 text-xl font-bold sm:text-2xl">
            👤 Account
          </h2>

          <div className="space-y-5">

            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Username"
              defaultValue="Shawn"
            />

            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Email"
              type="email"
            />

            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="New Password"
              type="password"
            />

            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Confirm Password"
              type="password"
            />

            <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-blue-500 sm:w-auto">
              Update Account
            </button>

          </div>

        </div>

        {/* About */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-6 lg:p-8">

          <h2 className="mb-6 text-xl font-bold sm:text-2xl">
            ℹ️ About Mide Farm ERP
          </h2>

          <div className="space-y-4 text-slate-300">

            <InfoRow label="Version" value="1.0" />
            <InfoRow label="Farm" value="Mide Farm & Poultry" />
            <InfoRow label="Framework" value="Next.js + Supabase" />
            <InfoRow label="Database" value="PostgreSQL" />
            <InfoRow label="Designed For" value="Egg Layer Farm Management" />

          </div>

        </div>

        {/* Backup */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-6 lg:p-8">

          <h2 className="mb-6 text-xl font-bold sm:text-2xl">
            💾 Backup & Restore
          </h2>

          <div className="space-y-4">

            <button className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-500">
              📥 Export Farm Data
            </button>

            <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500">
              📤 Import Farm Data
            </button>

            <button className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500">
              🗑 Reset Demo Data
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-800 pb-3 sm:flex-row sm:items-center sm:justify-between">

      <span className="font-medium text-slate-400">
        {label}
      </span>

      <span className="break-words font-semibold text-white">
        {value}
      </span>

    </div>
  );
}