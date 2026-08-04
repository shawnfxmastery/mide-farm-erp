"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  ArrowLeft,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";
import AddUserDialog from "@/components/v2/settings/AddUserDialog";
import EditUserDialog from "@/components/v2/settings/EditUserDialog";

type User = {
  id: string;
  full_name: string;
  email?: string;
  role: "admin" | "supervisor" | "staff";
  status?: "Active" | "Inactive";
  created_at: string;
};

export default function UsersPage() {
    const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name");

    if (error) {
      console.error(error);
    } else {
      setUsers((data ?? []) as User[]);
    }

    setLoading(false);
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalUsers = users.length;

const adminCount = users.filter(
  (u) => u.role === "admin"
).length;

const supervisorCount = users.filter(
  (u) => u.role === "supervisor"
).length;

const staffCount = users.filter(
  (u) => u.role === "staff"
).length;
  function roleColor(role: string) {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";

      case "supervisor":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-green-100 text-green-700";
    }
  }

  return (
  <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">

    <div className="space-y-5">

      <button
        onClick={() => router.push("/dashboard-v2/settings")}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:-translate-x-1 hover:shadow-xl"
      >
        <ArrowLeft size={22} />
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Users size={32} />
            User Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage administrators, supervisors and staff.
          </p>
        </div>

        <AddUserDialog />

      </div>

    </div> {/* ← THIS closes space-y-5 */}

    {/* Dashboard Cards */}

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

  <SectionCard>

    <p className="text-sm text-slate-500">
      Total Users
    </p>

    <h2 className="mt-2 text-4xl font-bold">
      {totalUsers}
    </h2>

  </SectionCard>

  <SectionCard>

    <p className="text-sm text-slate-500">
      Administrators
    </p>

    <h2 className="mt-2 text-4xl font-bold text-red-600">
      {adminCount}
    </h2>

  </SectionCard>

  <SectionCard>

    <p className="text-sm text-slate-500">
      Supervisors
    </p>

    <h2 className="mt-2 text-4xl font-bold text-blue-600">
      {supervisorCount}
    </h2>

  </SectionCard>

  <SectionCard>

    <p className="text-sm text-slate-500">
      Staff
    </p>

    <h2 className="mt-2 text-4xl font-bold text-green-600">
      {staffCount}
    </h2>

  </SectionCard>

</div>

{/* Search */}

<SectionCard>

  <div className="relative">


          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-green-600"
          />

        </div>

      </SectionCard>

      {/* Desktop Table */}

      <SectionCard>

        {loading ? (

          <div className="py-16 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />

            <p className="mt-4 text-slate-500">
              Loading users...
            </p>

          </div>

        ) : filteredUsers.length === 0 ? (

          <div className="py-16 text-center">

            <Users
              size={48}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 text-xl font-semibold">
              No users found
            </h2>

            <p className="mt-2 text-slate-500">
              Create your first employee.
            </p>

          </div>

        ) : (

          <>
            {/* Desktop */}

            <div className="hidden overflow-x-auto lg:block">

              <table className="min-w-full">

                <thead>

                  <tr className="border-b">

                    <th className="px-4 py-4 text-left">
                      Name
                    </th>

                    <th className="px-4 py-4 text-left">
                      Role
                    </th>

                    <th className="px-4 py-4 text-left">
                      Joined
                    </th>

                    <th className="px-4 py-4 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b"
                    >

                      <td className="px-4 py-4">

  <div className="flex items-center gap-4">

    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 font-bold text-white">
      {user.full_name?.charAt(0).toUpperCase()}
    </div>

    <div>

      <p className="font-semibold">
        {user.full_name}
      </p>

      <p className="text-sm text-slate-500">
        {user.email ?? "No email"}
      </p>

    </div>

  </div>

</td>

                      <td className="px-4 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${roleColor(
                            user.role
                          )}`}
                        >
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>

                      </td>

                      <td className="px-4 py-4 text-slate-500">
                        {new Date(
                          user.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4 text-right">

                        <EditUserDialog
  user={user}
  onUpdated={loadUsers}
/>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Mobile */}

            <div className="space-y-4 lg:hidden">

              {filteredUsers.map((user) => (

                <div
                  key={user.id}
                  className="rounded-xl border p-4"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 font-bold text-white">
    {user.full_name?.charAt(0).toUpperCase()}
  </div>

  <div>

    <h3 className="font-semibold">
      {user.full_name}
    </h3>

    <p className="text-sm text-slate-500">
      {user.email ?? "No email"}
    </p>

  </div>

</div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${roleColor(
                        user.role
                      )}`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Joined{" "}
                    {new Date(
                      user.created_at
                    ).toLocaleDateString()}
                  </p>

                  <div className="mt-4">
  <EditUserDialog
    user={user}
    onUpdated={loadUsers}
  />
</div>

                </div>

              ))}

            </div>

          </>

        )}

      </SectionCard>

    </div>
  );
}