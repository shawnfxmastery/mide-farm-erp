"use client";

import { useEffect, useState } from "react";
import {
  Egg,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";
import { useToast } from "@/components/v2/ui/useToast";

type FarmSettings = {
  id: number;
  total_capacity: number;
  current_birds: number;
  poultry_houses: number;
  farm_type: string;
  egg_tray_size: number;
};

export default function FarmPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [farm, setFarm] = useState<FarmSettings>({
    id: 1,
    total_capacity: 0,
    current_birds: 0,
    poultry_houses: 0,
    farm_type: "",
    egg_tray_size: 0,
  });

  const { showToast } = useToast();

  useEffect(() => {
    loadFarm();
  }, []);

  async function loadFarm() {
    setLoading(true);

    const { data, error } = await supabase
      .from("farm_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      showToast("Error", error.message, "error");
    } else if (data) {
      setFarm(data);
    }

    setLoading(false);
  }

  async function saveFarm() {
    setSaving(true);

    const { error } = await supabase
      .from("farm_settings")
      .update({
        total_capacity: farm.total_capacity,
        current_birds: farm.current_birds,
        poultry_houses: farm.poultry_houses,
        farm_type: farm.farm_type,
        egg_tray_size: farm.egg_tray_size,
      })
      .eq("id", 1);

    setSaving(false);

    if (error) {
      showToast("Error", error.message, "error");
      return;
    }

    showToast(
      "Success",
      "Farm information updated successfully.",
      "success"
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">

      {/* Back Button */}

      <button
        onClick={() =>
          router.push("/dashboard-v2/settings")
        }
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:-translate-x-1 hover:shadow-xl"
      >
        <ArrowLeft size={22} />
      </button>

      {/* Header */}

      <div>

        <h1 className="flex items-center gap-3 text-3xl font-bold">
          <Egg size={32} />
          Farm Information
        </h1>

        <p className="mt-2 text-slate-500">
          Configure your farm capacity and production settings.
        </p>

      </div>

      {/* Form */}

      <SectionCard>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-medium">
              Total Bird Capacity
            </label>

            <input
              type="number"
              value={farm.total_capacity}
              onChange={(e) =>
                setFarm({
                  ...farm,
                  total_capacity: Number(e.target.value),
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Current Birds
            </label>

            <input
              type="number"
              value={farm.current_birds}
              onChange={(e) =>
                setFarm({
                  ...farm,
                  current_birds: Number(e.target.value),
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Poultry Houses
            </label>

            <input
              type="number"
              value={farm.poultry_houses}
              onChange={(e) =>
                setFarm({
                  ...farm,
                  poultry_houses: Number(e.target.value),
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Farm Type
            </label>

            <input
              value={farm.farm_type}
              onChange={(e) =>
                setFarm({
                  ...farm,
                  farm_type: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Eggs Per Tray
            </label>

            <input
              type="number"
              value={farm.egg_tray_size}
              onChange={(e) =>
                setFarm({
                  ...farm,
                  egg_tray_size: Number(e.target.value),
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <button
            onClick={saveFarm}
            disabled={saving}
            className="w-full rounded-2xl bg-green-600 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </SectionCard>

    </div>
  );
}