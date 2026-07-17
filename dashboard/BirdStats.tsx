"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BirdStats() {
  const [batches, setBatches] = useState(0);
  const [alive, setAlive] = useState(0);
  const [mortality, setMortality] = useState(0);
  const [averageAge, setAverageAge] = useState(0);

  useEffect(() => {
    loadBirdStats();
  }, []);

  async function loadBirdStats() {
    const { data } = await supabase
      .from("bird_batches")
      .select("*");

    if (!data) return;

    let totalAlive = 0;
    let totalMortality = 0;
    let totalAge = 0;

    data.forEach((bird) => {
      totalAlive += Number(bird.alive ?? 0);
      totalMortality += Number(bird.mortality ?? 0);
      totalAge += Number(bird.age_weeks ?? 0);
    });

    setBatches(data.length);
    setAlive(totalAlive);
    setMortality(totalMortality);

    if (data.length > 0) {
      setAverageAge(
        Math.round(totalAge / data.length)
      );
    }
  }

  const cards = [
    {
      title: "Bird Batches",
      value: batches,
      icon: "🐔",
      color: "text-green-400",
    },
    {
      title: "Birds Alive",
      value: alive,
      icon: "🐣",
      color: "text-blue-400",
    },
    {
      title: "Mortality",
      value: mortality,
      icon: "☠️",
      color: "text-red-400",
    },
    {
      title: "Average Age",
      value: `${averageAge} Weeks`,
      icon: "📅",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                {card.title}
              </p>

              <h2 className={`mt-4 text-4xl font-bold ${card.color}`}>
                {card.value}
              </h2>

            </div>

            <div className="text-4xl">
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}