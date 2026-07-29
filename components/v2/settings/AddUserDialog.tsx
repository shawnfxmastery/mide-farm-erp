"use client";

import { useState } from "react";
import { X, UserPlus } from "lucide-react";

export default function AddUserDialog() {
  const [open, setOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const [loading, setLoading] = useState(false);

  async function createUser() {
  if (!fullName || !email || !password) {
    alert("Please complete all fields.");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
        role,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Unable to create user.");
      return;
    }

    alert("User created successfully!");

    setOpen(false);

    setFullName("");
    setEmail("");
    setPassword("");
    setRole("staff");

    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Unable to create user.");
  } finally {
    setLoading(false);
  }
}

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <UserPlus size={20} />
        Add User
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <UserPlus size={20} />
        Add User
      </button>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Create User
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border p-3 outline-none focus:border-green-600"
              placeholder="John Doe"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border p-3 outline-none focus:border-green-600"
              placeholder="john@email.com"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border p-3 outline-none focus:border-green-600"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border p-3 outline-none focus:border-green-600"
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
                    <button
            disabled={loading}
            onClick={createUser}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating User..." : "Create User"}
          </button>

        </div>

      </div>
    </>
  );
}