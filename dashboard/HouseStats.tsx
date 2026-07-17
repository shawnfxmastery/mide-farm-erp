"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type House = {
  id: number;
  house_name: string;
  house_type: string;
  capacity: number;
  current_birds: number;
  daily_feed: number;
  daily_production: number;
  health_status: string;
};

export default function HouseStats() {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    loadHouses();
  }, []);

  async function loadHouses() {
    const { data } = await supabase
      .from("farm_houses")
      .select("*")
      .order("id");

    if (data) setHouses(data);
  }

  const totalCapacity = houses.reduce(
    (sum, house) => sum + house.capacity,
    0
  );

  const totalBirds = houses.reduce(
    (sum, house) => sum + house.current_birds,
    0
  );

  const totalProduction = houses.reduce(
    (sum, house) => sum + house.daily_production,
    0
  );

  const totalFeed = houses.reduce(
    (sum, house) => sum + house.daily_feed,
    0
  );

  const occupancy =
    totalCapacity > 0
      ? ((totalBirds / totalCapacity) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">Total Houses</p>
          <h2 className="mt-3 text-4xl font-bold text-green-400">
            {houses.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">Total Birds</p>
          <h2 className="mt-3 text-4xl font-bold text-blue-400">
            {totalBirds.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">Capacity</p>
          <h2 className="mt-3 text-4xl font-bold text-yellow-400">
            {totalCapacity.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">Occupancy</p>
          <h2 className="mt-3 text-4xl font-bold text-green-500">
            {occupancy}%
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {houses.map((house) => (

          <div
            key={house.id}
            className="rounded-3xl bg-slate-900 p-8"
          >

            <h2 className="text-3xl font-bold">
              🏠 {house.house_name}
            </h2>

            <p className="mt-2 text-slate-400">
              {house.house_type}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-6">

              <div>
                <p className="text-slate-500">Birds</p>
                <h3 className="text-3xl font-bold">
                  {house.current_birds}
                </h3>
              </div>

              <div>
                <p className="text-slate-500">Capacity</p>
                <h3 className="text-3xl font-bold">
                  {house.capacity}
                </h3>
              </div>

              <div>
                <p className="text-slate-500">
                  Daily Production
                </p>

                <h3 className="text-3xl font-bold text-green-400">
                  {house.daily_production} Crates
                </h3>
              </div>

              <div>
                <p className="text-slate-500">
                  Feed Today
                </p>

                <h3 className="text-3xl font-bold text-yellow-400">
                  {house.daily_feed} Bags
                </h3>
              </div>

            </div>

            <div className="mt-8 flex items-center justify-between">

              <span className="rounded-full bg-green-500/20 px-4 py-2 font-semibold text-green-400">
                {house.health_status}
              </span>

              <button className="rounded-xl bg-green-600 px-5 py-2 font-semibold hover:bg-green-500">
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="rounded-3xl bg-slate-900 p-8">

        <h2 className="text-3xl font-bold">
          📈 Facility Overview
        </h2>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">

          <div>
            <p className="text-slate-500">Total Birds</p>
            <h3 className="text-3xl font-bold">
              {totalBirds}
            </h3>
          </div>

          <div>
            <p className="text-slate-500">Daily Eggs</p>
            <h3 className="text-3xl font-bold text-green-400">
              {totalProduction}
            </h3>
          </div>

          <div>
            <p className="text-slate-500">Feed Used</p>
            <h3 className="text-3xl font-bold text-yellow-400">
              {totalFeed} Bags
            </h3>
          </div>

          <div>
            <p className="text-slate-500">Occupancy</p>
            <h3 className="text-3xl font-bold text-blue-400">
              {occupancy}%
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}