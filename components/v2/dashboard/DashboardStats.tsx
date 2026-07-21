import {
  Bird,
  Egg,
  TrendingUp,
  Wallet,
} from "lucide-react";

import StatsCard from "./StatsCard";

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Birds"
        value="1,950"
        subtitle="Active Layers"
        icon={<Bird size={22} />}
      />

      <StatsCard
        title="Today's Eggs"
        value="56 Crates"
        subtitle="Latest Production"
        icon={<Egg size={22} />}
      />

      <StatsCard
        title="Production"
        value="86.4%"
        subtitle="Today's Rate"
        icon={<TrendingUp size={22} />}
      />

      <StatsCard
        title="Revenue"
        value="₦0"
        subtitle="Today's Sales"
        icon={<Wallet size={22} />}
      />
    </div>
  );
}