"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Birds() {
  const [batchNumber, setBatchNumber] = useState("");
  const [breed, setBreed] = useState("ISA Brown");
  const [arrivalDate, setArrivalDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mortality, setMortality] = useState("0");
  const [supplier, setSupplier] = useState("");
  const [vaccination, setVaccination] = useState("Pending");
  const [notes, setNotes] = useState("");

  async function saveBatch() {
    const qty = Number(quantity);
    const dead = Number(mortality);

    if (!batchNumber || !arrivalDate || qty <= 0) {
      alert("Please complete all required fields.");
      return;
    }

    const alive = qty - dead;

    const mortalityPercentage =
      qty > 0 ? (dead / qty) * 100 : 0;

    const today = new Date();
    const arrival = new Date(arrivalDate);

    const diffDays =
      (today.getTime() - arrival.getTime()) /
      (1000 * 60 * 60 * 24);

    const ageWeeks = Math.floor(diffDays / 7);

    let stage = "";

    if (ageWeeks <= 6) {
      stage = "Brooding";
    } else if (ageWeeks <= 16) {
      stage = "Growing";
    } else if (ageWeeks <= 20) {
      stage = "Point of Lay";
    } else {
      stage = "Laying";
    }

    let healthStatus = "";

    if (mortalityPercentage < 2) {
      healthStatus = "Healthy";
    } else if (mortalityPercentage < 5) {
      healthStatus = "Monitor";
    } else {
      healthStatus = "High Risk";
    }

    const { error } = await supabase
      .from("bird_batches")
      .insert([
        {
          batch_number: batchNumber,
          breed,
          arrival_date: arrivalDate,
          quantity: qty,
          alive,
          mortality: dead,
          age_weeks: ageWeeks,
          stage,
          supplier,
          vaccination_status: vaccination,
          notes,
          mortality_percentage: mortalityPercentage,
          health_status: healthStatus,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Bird batch saved successfully!");

    setBatchNumber("");
    setBreed("ISA Brown");
    setArrivalDate("");
    setQuantity("");
    setMortality("0");
    setSupplier("");
    setVaccination("Pending");
    setNotes("");

    window.location.reload();
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 lg:p-8 shadow-xl">

      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        🐔 New Bird Batch
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Batch Number
          </label>

          <input
            placeholder="FLK-001"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Breed
          </label>

          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          >
            <option>ISA Brown</option>
            <option>Lohmann Brown</option>
            <option>Hy-Line Brown</option>
            <option>Bovan Brown</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Arrival Date
          </label>

          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Quantity
          </label>

          <input
            type="number"
            placeholder="2000"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Mortality
          </label>

          <input
            type="number"
            placeholder="0"
            value={mortality}
            onChange={(e) => setMortality(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Supplier
          </label>

          <input
            placeholder="Supplier Name"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Vaccination Status
          </label>

          <select
            value={vaccination}
            onChange={(e) => setVaccination(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Notes
          </label>

          <textarea
            placeholder="Notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none"
          />
        </div>

      </div>

      <button
        onClick={saveBatch}
        className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-green-500 sm:w-auto"
      >
        Save Bird Batch
      </button>

    </div>
  );
}