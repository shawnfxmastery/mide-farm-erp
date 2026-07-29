import {
  Home,
  Egg,
  Package,
  Wheat,
  Wallet,
  Receipt,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

export type UserRole =
  | "admin"
  | "supervisor"
  | "staff";

export type NavigationItem = {
  name: string;
  href: string;
  icon: any;
  roles: UserRole[];
};

export const navigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard-v2",
    icon: Home,
    roles: ["admin", "supervisor", "staff"],
  },
  {
    name: "Production",
    href: "/dashboard-v2/production",
    icon: Egg,
    roles: ["admin", "supervisor", "staff"],
  },
  {
    name: "Sales",
    href: "/dashboard-v2/sales",
    icon: Wallet,
    roles: ["admin", "supervisor", "staff"],
  },
  {
    name: "Feed",
    href: "/dashboard-v2/feed",
    icon: Wheat,
    roles: ["admin", "supervisor"],
  },
  {
    name: "Inventory",
    href: "/dashboard-v2/inventory",
    icon: Package,
    roles: ["admin", "supervisor"],
  },
  {
    name: "Expenses",
    href: "/dashboard-v2/expenses",
    icon: Receipt,
    roles: ["admin", "supervisor", "staff"],
  },
  {
    name: "Reports",
    href: "/dashboard-v2/reports",
    icon: BarChart3,
    roles: ["admin", "supervisor"],
  },
  {
    name: "Workers",
    href: "/dashboard-v2/workers",
    icon: Users,
    roles: ["admin", "supervisor"],
  },
  {
    name: "Suppliers",
    href: "/dashboard-v2/suppliers",
    icon: Users,
    roles: ["admin", "supervisor"],
  },
  {
    name: "Settings",
    href: "/dashboard-v2/settings",
    icon: Settings,
    roles: ["admin"],
  },
];