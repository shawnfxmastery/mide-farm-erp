"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";
import { useToast } from "@/components/v2/ui/useToast";

export default function PasswordPage() {
  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { showToast } = useToast();

  async function updatePassword() {
    if (!newPassword) {
      showToast(
        "Warning",
        "Please enter a new password.",
        "warning"
      );
      return;
    }

    if (newPassword.length < 8) {
      showToast(
        "Warning",
        "Password must be at least 8 characters.",
        "warning"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast(
        "Warning",
        "Passwords do not match.",
        "warning"
      );
      return;
    }

    setSaving(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setSaving(false);

    if (error) {
      showToast(
        "Error",
        error.message,
        "error"
      );
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    showToast(
      "Success",
      "Password updated successfully.",
      "success"
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold">
          <Lock size={30} />
          Change Password
        </h1>

        <p className="mt-2 text-slate-500">
          Update your account password.
        </p>
      </div>

      <SectionCard>
        <div className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              className="w-full rounded-xl border p-3"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full rounded-xl border p-3"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full rounded-xl border p-3"
              placeholder="Confirm new password"
            />
          </div>

          <button
            onClick={updatePassword}
            disabled={saving}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Updating Password..."
              : "Update Password"}
          </button>
        </div>
      </SectionCard>
    </div>
  );
}