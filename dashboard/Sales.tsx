"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Sales() {
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [crates, setCrates] = useState("");
  const [pricePerCrate, setPricePerCrate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");

  const totalAmount =
    Number(crates || 0) * Number(pricePerCrate || 0);

  async function saveSale() {
    const { error } = await supabase
      .from("egg_sales")
      .insert([
        {
          date,
          customer,
          crates: Number(crates),
          price_per_crate: Number(pricePerCrate),
          total_amount: totalAmount,
          payment_status: paymentStatus,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Sale saved successfully!");

    setDate("");
    setCustomer("");
    setCrates("");
    setPricePerCrate("");
    setPaymentStatus("Paid");
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 lg:p-8 shadow-xl">
      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        💰 Egg Sales
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-6">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Customer
          </label>

          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Customer Name"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Crates
          </label>

          <input
            type="number"
            value={crates}
            onChange={(e) => setCrates(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Price/Crate
          </label>

          <input
            type="number"
            value={pricePerCrate}
            onChange={(e) => setPricePerCrate(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Payment
          </label>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          >
            <option>Paid</option>
            <option>Owing</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Total
          </label>

          <div className="rounded-xl bg-green-700 p-3 text-center text-lg font-bold">
            ₦{totalAmount.toLocaleString()}
          </div>
        </div>

      </div>

      <button
        onClick={saveSale}
        className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-green-500 sm:w-auto"
      >
        Save Sale
      </button>
    </div>
  );
}