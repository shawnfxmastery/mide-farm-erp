import {
  Home,
  LayoutDashboard,
  Egg,
  Package,
  Wheat,
  Wallet,
  Receipt,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard-v2",
    icon: Home,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: LayoutDashboard,
  },
  {
    name: "Production",
    href: "/dashboard-v2/production",
    icon: Egg,
  },
  {
    name: "Inventory",
    href: "/dashboard-v2/inventory",
    icon: Package,
  },
  {
    name: "Feed Purchases",
    href: "/dashboard-v2/feed",
    icon: Wheat,
  },
  {
    name: "Feed Usage",
    href: "/dashboard-v2/feed-usage",
    icon: Wheat,
  },
  {
    name: "Sales",
    href: "/dashboard-v2/sales",
    icon: Wallet,
  },
  {
    name: "Expenses",
    href: "/dashboard-v2/expenses",
    icon: Receipt,
  },
  {
    name: "Reports",
    href: "/dashboard-v2/reports",
    icon: BarChart3,
  },
  {
    name: "Workers",
    href: "/dashboard-v2/workers",
    icon: Users,
  },
  {
    name: "Suppliers",
    href: "/dashboard-v2/suppliers",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/dashboard-v2/settings",
    icon: Settings,
  },
];