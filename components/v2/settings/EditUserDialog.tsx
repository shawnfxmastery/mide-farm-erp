"use client";

import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/v2/ui/useToast";
import { useState } from "react";
import {
  X,
  User,
  Shield,
  Save,
  Trash2,
} from "lucide-react";

type UserType = {
  id: string;
  full_name: string;
  email?: string;
  role: "admin" | "supervisor" | "staff";
  status?: "Active" | "Inactive";
};

type Props = {
  user: UserType;
  onUpdated: () => void;
};

export default function EditUserDialog({
  user,
  onUpdated,
}: Props) {
  const [open, setOpen] = useState(false);

  const [fullName, setFullName] = useState(
    user.full_name
  );

  const [role, setRole] = useState(user.role);

  const [status, setStatus] = useState(
    user.status ?? "Active"
  );

  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  async function deleteUser() {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", user.id);

  if (error) {
    showToast(
      "Error",
      error.message,
      "error"
    );
    return;
  }

  showToast(
    "Success",
    "User deleted successfully.",
    "success"
  );

  setOpen(false);
  onUpdated();
}

  async function saveUser() {
  setSaving(true);

  const { error } = await supabase
    .from("profiles")
    .update({
  full_name: fullName,
  role: role,
})
    .eq("id", user.id);

  setSaving(false);

  if (error) {
    showToast(
      "Error",
      error.message,
      "error"
    );
    return;
  }

  showToast(
    "Success",
    "User updated successfully.",
    "success"
  );

  setOpen(false);
  onUpdated();
}

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-200 px-4 py-2 font-medium transition hover:bg-slate-100"
      >
        Edit User
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b p-6">

              <div>

                <h2 className="text-2xl font-bold">
                  Edit User
                </h2>

                <p className="text-slate-500">
                  Update employee information
                </p>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 hover:bg-slate-100"
              >
                <X size={22} />
              </button>

            </div>

            {/* Body */}

            <div className="space-y-6 p-6">

              <div>

                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="w-full rounded-xl border p-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Email
                </label>

                <input
                  disabled
                  value={user.email}
                  className="w-full rounded-xl border bg-slate-100 p-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Role
                </label>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(
                      e.target.value as
                        | "admin"
                        | "supervisor"
                        | "staff"
                    )
                  }
                  className="w-full rounded-xl border p-3"
                >
                  <option value="admin">
                    Administrator
                  </option>

                  <option value="supervisor">
                    Supervisor
                  </option>

                  <option value="staff">
                    Staff
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as
                        | "Active"
                        | "Inactive"
                    )
                  }
                  className="w-full rounded-xl border p-3"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

              </div>

              {/* Danger Zone */}

              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

                <h3 className="font-semibold text-red-700">
                  Danger Zone
                </h3>

                <p className="mt-2 text-sm text-red-600">
                  Deleting this user cannot be undone.
                </p>

                <button
  onClick={deleteUser}
  className="mt-4 flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700"
>
  <Trash2 size={18} />
  Delete User
</button>

              </div>

            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 border-t p-6">

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border px-5 py-3"
              >
                Cancel
              </button>

              <button
                onClick={saveUser}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                <Save size={18} />

                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}