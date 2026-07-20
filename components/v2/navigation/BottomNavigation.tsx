"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Egg,
  Wheat,
  Wallet,
  Menu,
} from "lucide-react";

const navItems = [
  {
    name: "Home",
    href: "/dashboard-v2",
    icon: Home,
  },
  {
    name: "Production",
    href: "/production-v2",
    icon: Egg,
  },
  {
    name: "Feed",
    href: "/feed-v2",
    icon: Wheat,
  },
  {
    name: "Sales",
    href: "/sales-v2",
    icon: Wallet,
  },
  {
    name: "More",
    href: "/settings-v2",
    icon: Menu,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex h-20 max-w-md items-center justify-around px-2">

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-1"
            >
              <Icon
                size={22}
                className={
                  active
                    ? "text-green-600"
                    : "text-slate-400"
                }
              />

              <span
                className={`text-xs font-medium ${
                  active
                    ? "text-green-600"
                    : "text-slate-500"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}

      </div>
    </nav>
  );
}