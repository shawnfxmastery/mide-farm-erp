"use client";

import { useState } from "react";
import {
  Lock,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";
import { useToast } from "@/components/v2/ui/useToast";

export default function PasswordPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

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

    const { error } =
      await supabase.auth.updateUser({
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

  function PasswordInput({
    label,
    value,
    setValue,
    show,
    setShow,
    placeholder,
  }: any) {
    return (
      <div>
        <label className="mb-2 block font-medium">
          {label}
        </label>

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            placeholder={placeholder}
            className="w-full rounded-2xl border border-slate-200 p-4 pr-14 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {show ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
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
          <Lock size={32} />
          Password
        </h1>

        <p className="mt-2 text-slate-500">
          Update your account password.
        </p>
      </div>

      <SectionCard>

        <div className="space-y-6">

          <PasswordInput
            label="Current Password"
            value={currentPassword}
            setValue={setCurrentPassword}
            show={showCurrent}
            setShow={setShowCurrent}
            placeholder="Enter current password"
          />

          <PasswordInput
            label="New Password"
            value={newPassword}
            setValue={setNewPassword}
            show={showNew}
            setShow={setShowNew}
            placeholder="Enter new password"
          />

          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            show={showConfirm}
            setShow={setShowConfirm}
            placeholder="Confirm new password"
          />

          <button
            onClick={updatePassword}
            disabled={saving}
            className="w-full rounded-2xl bg-green-600 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
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