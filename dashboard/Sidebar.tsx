"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
      },
      {
        name: "Farm Facilities",
        icon: Warehouse,
        href: "/houses",
      },
      {
        name: "Bird Management",
        icon: Bird,
        href: "/birds",
      },
      {
        name: "Egg Production",
        icon: Egg,
        href: "/egg-production",
      },
      {
        name: "Feed Management",
        icon: Wheat,
        href: "/feed-inventory",
      },
    ],
  },

  {
    title: "SALES & FINANCE",
    items: [
      {
        name: "Egg Sales",
        icon: DollarSign,
        href: "/sales",
      },
      {
        name: "Expenses",
        icon: Receipt,
        href: "/expenses",
      },
    ],
  },

  {
    title: "PEOPLE",

    items: [
      {
        name: "Workers",
        icon: Users,
        href: "/workers",
      },

      {
        name: "Suppliers",
        icon: Truck,
        href: "/suppliers",
      },
    ],
  },

  {
    title: "REPORTS",

    items: [
      {
        name: "Reports",
        icon: FileBarChart,
        href: "/reports",
      },
    ],
  },

  {
    title: "SYSTEM",

    items: [
      {
        name: "Settings",
        icon: Settings,
        href: "/settings",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 min-h-screen border-r border-slate-800 bg-slate-950">

      <div className="border-b border-slate-800 p-6">

  <div className="flex items-center gap-4">

    <Image
      src="/logo.png"
      alt="Mide's Farm Logo"
      width={70}
      height={70}
      className="rounded-xl"
    />

    <div>

      <h1 className="text-2xl font-extrabold text-green-400">
        Mide's Farm ERP
      </h1>

      <p className="text-sm text-green-400">
        Farm Management System
      </p>

    </div>

  </div>

</div>

      <div className="space-y-8 p-6">

        {sections.map((section) => (

          <div key={section.title}>

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
                    className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300

                    ${
                      active
                        ? "bg-green-600 text-white shadow-lg"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }
                    
                    `}
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

      <div className="absolute bottom-0 w-80 border-t border-slate-800 p-6">

        <div className="rounded-2xl bg-slate-900 p-4">

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