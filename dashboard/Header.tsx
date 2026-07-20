"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import {
  CalendarDays,
  Activity,
  Bell,
  Egg,
} from "lucide-react";

export default function Header() {
  const hour = new Date().getHours();
  const router = useRouter();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [farmStatus, setFarmStatus] = useState("Healthy");
  const [alerts, setAlerts] = useState(0);
  const [goal, setGoal] = useState("60 Crates");

  useEffect(() => {
    loadHeader();
  }, []);

  async function loadHeader() {
    try {
      let alertCount = 0;

      // Bird Health
      const { data: birds } = await supabase
        .from("bird_batches")
        .select("health_status");

      if (birds) {
        const unhealthy = birds.filter(
          (bird) => bird.health_status !== "Healthy"
        ).length;

        if (unhealthy > 0) {
          setFarmStatus("Attention");
          alertCount += unhealthy;
        } else {
          setFarmStatus("Healthy");
        }
      }

      // Feed Inventory
      const { data: feed } = await supabase
        .from("feed_inventory")
        .select("bags_available,daily_usage")
        .limit(1);

      if (feed && feed.length > 0) {
        const latest = feed[0];

        const days =
          latest.daily_usage > 0
            ? Math.floor(
                latest.bags_available / latest.daily_usage
              )
            : 0;

        if (days <= 30) {
          alertCount++;
        }
      }

      // Latest Production
      const { data: production } = await supabase
        .from("egg_production")
        .select("crates")
        .order("created_at", { ascending: false })
        .limit(1);

      if (production && production.length > 0) {
        setGoal(`${production[0].crates} Crates`);
      }

      setAlerts(alertCount);
    } catch (error) {
      console.error("Header Error:", error);
    }
  }
  async function logout() {
  await supabase.auth.signOut();
  router.push("/login");
}

  return (
    <div className="mb-10">
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-green-950 p-4 sm:p-6 lg:p-8 shadow-2xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}
          <div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">

              <span className="rounded-full bg-green-500/20 px-4 py-1 text-sm font-semibold text-green-400">
                {greeting}, Shawn 👋
              </span>

              <span className="flex items-center gap-2 text-sm text-slate-400">
                <CalendarDays size={16} />
                {today}
              </span>

            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Mide Farm ERP
            </h1>

            <p className="mt-3 max-w-3xl text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-slate-400">
              Monitor your farm operations, bird health, egg production,
              feed inventory, sales, expenses and business performance
              from one intelligent dashboard.
            </p>

          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">

              <div className="flex items-center gap-2 text-green-400">
                <Activity size={18} />
                <span className="text-sm">Farm Status</span>
              </div>

              <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                {farmStatus}
              </h3>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">

              <div className="flex items-center gap-2 text-yellow-400">
                <Bell size={18} />
                <span className="text-sm">Alerts</span>
              </div>

              <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                 {alerts}
              </h3>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">

              <div className="flex items-center gap-2 text-blue-400">
                <Egg size={18} />
                <span className="text-sm">Today's Goal</span>
              </div>

              <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                 {goal}
             </h3>

            </div>

            <div className="flex flex-col gap-3">

              <button className="rounded-2xl bg-green-600 px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-500">
                🥚 Record Production
              </button>

              <button
  onClick={logout}
  className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500"
>
  🚪 Sign Out
</button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}