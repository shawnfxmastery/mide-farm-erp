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
    <div className="mt-10 rounded-2xl bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        💰 Egg Sales
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

        <div>
          <label className="block mb-2 text-slate-400">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Customer
          </label>

          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
            placeholder="Customer Name"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Crates
          </label>

          <input
            type="number"
            value={crates}
            onChange={(e) => setCrates(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Price/Crate
          </label>

          <input
            type="number"
            value={pricePerCrate}
            onChange={(e) => setPricePerCrate(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Payment
          </label>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3"
          >
            <option>Paid</option>
            <option>Owing</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Total
          </label>

          <div className="rounded-lg bg-green-700 p-3 text-center font-bold">
            ₦{totalAmount.toLocaleString()}
          </div>
        </div>

      </div>

      <button
        onClick={saveSale}
        className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-bold hover:bg-green-500"
      >
        Save Sale
      </button>
    </div>
  );
}