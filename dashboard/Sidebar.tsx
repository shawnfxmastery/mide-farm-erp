"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";

import {
  LayoutDashboard,
  Warehouse,
  Bird,
  Egg,
  Wheat,
  DollarSign,
  Receipt,
  Users,
  Truck,
  FileBarChart,
  Settings,
} from "lucide-react";

const sections = [
  {
    title: "FARM OPERATIONS",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/" },
      { name: "Farm Facilities", icon: Warehouse, href: "/houses" },
      { name: "Bird Management", icon: Bird, href: "/birds" },
      { name: "Egg Production", icon: Egg, href: "/egg-production" },
      { name: "Feed Management", icon: Wheat, href: "/feed-inventory" },
    ],
  },
  {
    title: "SALES & FINANCE",
    items: [
      { name: "Egg Sales", icon: DollarSign, href: "/sales" },
      { name: "Expenses", icon: Receipt, href: "/expenses" },
    ],
  },
  {
    title: "PEOPLE",
    items: [
      { name: "Workers", icon: Users, href: "/workers" },
      { name: "Suppliers", icon: Truck, href: "/suppliers" },
    ],
  },
  {
    title: "REPORTS",
    items: [{ name: "Reports", icon: FileBarChart, href: "/reports" }],
  },
  {
    title: "SYSTEM",
    items: [{ name: "Settings", icon: Settings, href: "/settings" }],
  },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 lg:w-72 flex-col bg-slate-950 border-r border-slate-800">

      {/* Header */}
      <div className="border-b border-slate-800 p-6">

        <div className="mb-4 flex justify-end lg:hidden">
          <button
  onClick={onClose}
  className="rounded-lg p-2 transition hover:bg-slate-800"
>
  <X size={22} className="text-white" />
</button>
        </div>

        <div className="flex items-center gap-4">

          <Image
  src="/logo.png"
  alt="Logo"
  width={52}
  height={52}
  className="rounded-xl sm:h-[60px] sm:w-[60px]"
 />

          <div>
            <h1 className="text-xl font-bold text-green-400">
              Mide Farm ERP
            </h1>

            <p className="text-sm text-green-400">
              Farm Management System
            </p>
          </div>

        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-6">

        {sections.map((section) => (
          <div key={section.title} className="mb-8">

            <p className="mb-3 text-xs font-bold tracking-widest text-slate-500">
              {section.title}
            </p>

            <div className="space-y-2">

              {section.items.map((item) => {

                const Icon = item.icon;

                const active = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-4 rounded-xl px-4 py-3 transition

                    ${
                      active
                        ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">
  {item.name}
</span>
                  </Link>
                );
              })}

            </div>
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-6">

        <div className="rounded-xl bg-slate-900 p-4">

          <p className="text-xs text-slate-400">
            Logged in as
          </p>

          <h3 className="mt-2 font-bold text-white">
            Shawn
          </h3>

          <p className="text-green-400">
            Farm Owner
          </p>

        </div>

      </div>

    </aside>
  );
}