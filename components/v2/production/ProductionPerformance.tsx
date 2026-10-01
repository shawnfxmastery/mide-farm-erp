"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, CalendarDays, Egg, TrendingUp, TriangleAlert } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Record = { date: string; birds: number; crates: number; pieces: number; broken_eggs: number; mortality: number };

function monthStart(offset: number) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + offset);
  return date.toISOString().slice(0, 10);
}

export default function ProductionPerformance() {
  const [records, setRecords] = useState<Record[]>([]);
  const [flockStart, setFlockStart] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [production, farm] = await Promise.all([
        supabase.from("egg_production").select("date,birds,crates,pieces,broken_eggs,mortality").order("date", { ascending: false }),
        supabase.from("farm_settings").select("flock_start_date").eq("id", 1).maybeSingle(),
      ]);
      setRecords((production.data as Record[]) ?? []);
      setFlockStart(farm.data?.flock_start_date ?? null);
    }
    load();
  }, []);

  const stats = useMemo(() => {
    const currentMonth = records.filter((item) => item.date >= monthStart(0));
    const lastMonth = records.filter((item) => item.date >= monthStart(-1) && item.date < monthStart(0));
    const calculateRate = (items: Record[]) => {
      const eggs = items.reduce((sum, item) => sum + Number(item.crates ?? 0) * 30 + Number(item.pieces ?? 0), 0);
      const birds = items.reduce((sum, item) => sum + Number(item.birds ?? 0), 0);
      return birds > 0 ? (eggs / birds) * 100 : 0;
    };
    const ageDays = flockStart ? Math.max(0, Math.floor((Date.now() - new Date(`${flockStart}T00:00:00`).getTime()) / 86400000)) : null;
    return {
      age: ageDays === null ? "Set flock date" : `${Math.floor(ageDays / 7)} weeks ${ageDays % 7} days`,
      lastMonthRate: calculateRate(lastMonth),
      thisMonthEggs: currentMonth.reduce((sum, item) => sum + Number(item.crates ?? 0) * 30 + Number(item.pieces ?? 0), 0),
      thisMonthBroken: currentMonth.reduce((sum, item) => sum + Number(item.broken_eggs ?? 0), 0),
      totalBroken: records.reduce((sum, item) => sum + Number(item.broken_eggs ?? 0), 0),
      mortality: currentMonth.reduce((sum, item) => sum + Number(item.mortality ?? 0), 0),
    };
  }, [records, flockStart]);

  const cards = [
    { title: "Flock Age", value: stats.age, subtitle: "Since placement", icon: CalendarDays, color: "bg-blue-100 text-blue-700" },
    { title: "Last Month Rate", value: `${stats.lastMonthRate.toFixed(1)}%`, subtitle: "Average production", icon: TrendingUp, color: "bg-green-100 text-green-700" },
    { title: "Cracked Eggs", value: stats.thisMonthBroken.toLocaleString(), subtitle: `All time: ${stats.totalBroken.toLocaleString()}`, icon: TriangleAlert, color: "bg-orange-100 text-orange-700" },
    { title: "This Month", value: `${Math.floor(stats.thisMonthEggs / 30).toLocaleString()} crates`, subtitle: `Mortality: ${stats.mortality}`, icon: Egg, color: "bg-emerald-100 text-emerald-700" },
  ];

  return <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center gap-3"><div className="rounded-md bg-green-100 p-3 text-green-700"><Activity size={22} /></div><div><h2 className="text-xl font-bold text-slate-900">Production Performance</h2><p className="text-sm text-slate-500">Live flock and monthly production performance.</p></div></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => { const Icon = card.icon; return <div key={card.title} className="rounded-md border border-slate-200 p-4"><div className={`mb-3 inline-flex rounded-md p-2 ${card.color}`}><Icon size={18} /></div><p className="text-sm text-slate-500">{card.title}</p><p className="mt-1 text-2xl font-bold text-slate-900">{card.value}</p><p className="mt-1 text-xs text-slate-500">{card.subtitle}</p></div>; })}</div></section>;
}
