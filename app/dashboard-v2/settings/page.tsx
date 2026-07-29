"use client";

import { useEffect, useState } from "react";
import { Plus, Users, Shield } from "lucide-react";

import SectionCard from "@/components/v2/ui/SectionCard";
import Link from "next/link";

type User = {
  id: string;
  full_name: string;
  role: string;
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    // Supabase query comes next
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Users size={32} />
            User Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage ERP users and permissions.
          </p>

        </div>

        <Link
  href="/dashboard-v2/settings/users"
  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
>
  <Plus size={20} />
  Add User
</Link>

      </div>

      <SectionCard>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b">

                <th className="px-4 py-3 text-left">
                  Name
                </th>

                <th className="px-4 py-3 text-left">
                  Role
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

                <th className="px-4 py-3 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 && (

                <tr>

                  <td
                    colSpan={4}
                    className="py-12 text-center text-slate-500"
                  >

                    <Shield
                      className="mx-auto mb-3"
                      size={42}
                    />

                    No users found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </SectionCard>

    </div>
  );
}