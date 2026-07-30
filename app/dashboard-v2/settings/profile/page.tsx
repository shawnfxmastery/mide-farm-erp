"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";
import { useToast } from "@/components/v2/ui/useToast";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const { showToast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setEmail(user.email ?? "");

    const { data, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    if (error) {
      showToast("Error", error.message, "error");
    } else if (data) {
      setFullName(data.full_name ?? "");
    }

    setLoading(false);
  }

  async function saveProfile() {
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      showToast("Error", "User not found.", "error");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      showToast("Error", error.message, "error");
      return;
    }

    showToast(
      "Success",
      "Profile updated successfully.",
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
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold">
          <User size={30} />
          Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your account information.
        </p>
      </div>

      <SectionCard>
        <div className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              value={email}
              disabled
              className="w-full rounded-xl border bg-slate-100 p-3"
            />
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </SectionCard>
    </div>
  );
}