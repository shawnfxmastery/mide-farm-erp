"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";
import { useToast } from "@/components/v2/ui/useToast";

type CompanySettings = {
  id: number;
  farm_name: string;
  owner_name: string;
  phone: string;
  email: string;
  address: string;
};

export default function CompanyPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [company, setCompany] =
    useState<CompanySettings>({
      id: 1,
      farm_name: "",
      owner_name: "",
      phone: "",
      email: "",
      address: "",
    });

  const { showToast } = useToast();

  useEffect(() => {
    loadCompany();
  }, []);

  async function loadCompany() {
    setLoading(true);

    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      showToast("Error", error.message, "error");
    } else if (data) {
      setCompany(data);
    }

    setLoading(false);
  }

  async function saveCompany() {
    setSaving(true);

    const { error } = await supabase
      .from("settings")
      .update({
        farm_name: company.farm_name,
        owner_name: company.owner_name,
        phone: company.phone,
        email: company.email,
        address: company.address,
      })
      .eq("id", 1);

    setSaving(false);

    if (error) {
      showToast("Error", error.message, "error");
      return;
    }

    showToast(
      "Success",
      "Company information updated successfully.",
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
          <Building2 size={32} />
          Company Information
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your business information.
        </p>

      </div>

      {/* Form */}

      <SectionCard>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-medium">
              Farm Name
            </label>

            <input
              value={company.farm_name}
              onChange={(e) =>
                setCompany({
                  ...company,
                  farm_name: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Owner Name
            </label>

            <input
              value={company.owner_name}
              onChange={(e) =>
                setCompany({
                  ...company,
                  owner_name: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Phone Number
            </label>

            <input
              value={company.phone}
              onChange={(e) =>
                setCompany({
                  ...company,
                  phone: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              value={company.email}
              onChange={(e) =>
                setCompany({
                  ...company,
                  email: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Address
            </label>

            <textarea
              rows={4}
              value={company.address}
              onChange={(e) =>
                setCompany({
                  ...company,
                  address: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

          <button
            onClick={saveCompany}
            disabled={saving}
            className="w-full rounded-2xl bg-green-600 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </SectionCard>

    </div>
  );
}