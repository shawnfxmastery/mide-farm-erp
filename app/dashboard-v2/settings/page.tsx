"use client";

import ConfirmDialog from "@/components/v2/ui/ConfirmDialog";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  Egg,
  Users,
  Lock,
  Settings,
  ChevronRight,
  Trash2,
  Package,
  DollarSign,
  Wheat,
  LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import SectionCard from "@/components/v2/ui/SectionCard";

const menuItems = [
  {
    title: "Profile",
    description: "Manage your account information.",
    href: "/dashboard-v2/settings/profile",
    icon: User,
  },
  {
    title: "Company Information",
    description: "Update business name, logo and address.",
    href: "/dashboard-v2/settings/company",
    icon: Building2,
  },
  {
    title: "Farm Information",
    description: "Manage farm details and capacity.",
    href: "/dashboard-v2/settings/farm",
    icon: Egg,
  },
  {
    title: "User Management",
    description: "Manage administrators, supervisors and staff.",
    href: "/dashboard-v2/settings/users",
    icon: Users,
  },
  {
    title: "Change Password",
    description: "Update your account password.",
    href: "/dashboard-v2/settings/password",
    icon: Lock,
  },
];

export default function SettingsPage() {
  const router = useRouter();
  const [logoutOpen, setLogoutOpen] = useState(false);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Failed to logout.");
      return;
    }

    router.replace("/login");
  }

  function comingSoon(name: string) {
    alert(`${name} will be available soon.`);
  }
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6">

      {/* Header */}

      <div>

        <h1 className="flex items-center gap-3 text-3xl font-bold">
          <Settings size={32} />
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your farm ERP, company information and system preferences.
        </p>

      </div>

            {/* Account */}

      <SectionCard>

        <h2 className="mb-5 text-xl font-semibold">
          Account
        </h2>

        <div className="space-y-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-green-500 hover:bg-green-50"
              >
                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-green-100 p-3">
                    <Icon
                      size={22}
                      className="text-green-700"
                    />
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.description}
                    </p>

                  </div>

                </div>

                <ChevronRight
                  size={22}
                  className="text-slate-400"
                />

              </Link>
            );
          })}

        </div>

      </SectionCard>

      {/* System Tools */}

      <SectionCard>

        <h2 className="mb-5 text-xl font-semibold">
          System Tools
        </h2>

        <div className="space-y-4">

          <button
            onClick={() => comingSoon("Reset Inventory")}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-orange-100 p-3">
                <Package
                  className="text-orange-600"
                  size={22}
                />
              </div>

              <div className="text-left">

                <h3 className="font-semibold">
                  Reset Inventory
                </h3>

                <p className="text-sm text-slate-500">
                  Delete all inventory records.
                </p>

              </div>

            </div>

            <ChevronRight className="text-slate-400" />

          </button>

          <button
            onClick={() => comingSoon("Reset Production")}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-orange-100 p-3">
                <Egg
                  className="text-orange-600"
                  size={22}
                />
              </div>

              <div className="text-left">

                <h3 className="font-semibold">
                  Reset Production
                </h3>

                <p className="text-sm text-slate-500">
                  Delete all production records.
                </p>

              </div>

            </div>

            <ChevronRight className="text-slate-400" />

          </button>

          <button
            onClick={() => comingSoon("Reset Feed")}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-orange-100 p-3">
                <Wheat
                  className="text-orange-600"
                  size={22}
                />
              </div>

              <div className="text-left">

                <h3 className="font-semibold">
                  Reset Feed
                </h3>

                <p className="text-sm text-slate-500">
                  Delete all feed records.
                </p>

              </div>

            </div>

            <ChevronRight className="text-slate-400" />

          </button>

          <button
            onClick={() => comingSoon("Reset Sales")}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-orange-100 p-3">
                <DollarSign
                  className="text-orange-600"
                  size={22}
                />
              </div>

              <div className="text-left">

                <h3 className="font-semibold">
                  Reset Sales
                </h3>

                <p className="text-sm text-slate-500">
                  Delete all sales records.
                </p>

              </div>

            </div>

            <ChevronRight className="text-slate-400" />

          </button>

          <button
            onClick={() => comingSoon("Factory Reset ERP")}
            className="flex w-full items-center justify-between rounded-xl border border-red-300 p-4 transition hover:bg-red-50"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-red-100 p-3">
                <Trash2
                  className="text-red-600"
                  size={22}
                />
              </div>

              <div className="text-left">

                <h3 className="font-semibold text-red-600">
                  Factory Reset ERP
                </h3>

                <p className="text-sm text-slate-500">
                  Permanently delete all ERP data.
                </p>

              </div>

            </div>

            <ChevronRight className="text-red-400" />

          </button>

        </div>

      </SectionCard>

      {/* Logout */}

      <SectionCard>

        <button
          onClick={() => setLogoutOpen(true)}
          className="flex w-full items-center justify-between rounded-xl border border-red-300 bg-red-50 p-4 transition hover:bg-red-100"
        >

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-red-100 p-3">
              <LogOut
                className="text-red-600"
                size={22}
              />
            </div>

            <div className="text-left">

              <h3 className="font-semibold text-red-600">
                Logout
              </h3>

              <p className="text-sm text-slate-500">
                Sign out of your ERP account.
              </p>

            </div>

          </div>

          <ChevronRight className="text-red-400" />

        </button>

      </SectionCard>

      <p className="pb-8 text-center text-sm text-slate-400">
        Mide Farm ERP • Version 2.0
      </p>

<ConfirmDialog
  open={logoutOpen}
  title="Logout"
  message="Are you sure you want to sign out of Mide Farm ERP?"
  confirmText="Logout"
  confirmColor="red"
  onCancel={() => setLogoutOpen(false)}
  onConfirm={async () => {
    setLogoutOpen(false);
    await handleLogout();
  }}
/>
    </div>
  );
}