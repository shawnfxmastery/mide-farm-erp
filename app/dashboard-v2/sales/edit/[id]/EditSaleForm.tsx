"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function EditSaleForm() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [crates, setCrates] = useState("");
  const [pricePerCrate, setPricePerCrate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadSale();
  }, []);

  async function loadSale() {
    const { data, error } = await supabase
      .from("egg_sales")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    setDate(data.date ?? "");
    setCustomer(data.customer ?? "");
    setCrates(String(data.crates ?? ""));
    setPricePerCrate(String(data.price_per_crate ?? ""));
    setAmountPaid(String(data.amount_paid ?? ""));
    setPaymentMethod(data.payment_method ?? "");
    setNotes(data.notes ?? "");

    setLoading(false);
  }

  async function updateSale(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const cratesNum = Number(crates);
    const priceNum = Number(pricePerCrate);
    const paidNum = Number(amountPaid);

    const total = cratesNum * priceNum;
    const balance = total - paidNum;

    const { error } = await supabase
      .from("egg_sales")
      .update({
        date,
        customer,
        crates: cratesNum,
        price_per_crate: priceNum,
        total_amount: total,
        amount_paid: paidNum,
        balance,
        payment_status: balance <= 0 ? "Paid" : "Owing",
        payment_method: paymentMethod,
        notes,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Sale updated successfully!");

    router.push("/dashboard-v2/sales");
    router.refresh();
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const total = (Number(crates) || 0) * (Number(pricePerCrate) || 0);
  const balance = total - (Number(amountPaid) || 0);

  return (
    <form
      onSubmit={updateSale}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h1 className="text-3xl font-bold">
        Edit Sale
      </h1>

      <div>
        <label className="mb-2 block font-medium">
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Customer
        </label>

        <input
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Crates
        </label>

        <input
          type="number"
          value={crates}
          onChange={(e) => setCrates(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Price Per Crate
        </label>

        <input
          type="number"
          value={pricePerCrate}
          onChange={(e) => setPricePerCrate(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Amount Paid
        </label>

        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Payment Method
        </label>

        <input
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Notes
        </label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-xl border p-3"
          rows={4}
        />
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <p>Total: ₦{total.toLocaleString()}</p>
        <p>Balance: ₦{balance.toLocaleString()}</p>
      </div>

      <button
        disabled={saving}
        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
      >
        {saving ? "Updating..." : "Update Sale"}
      </button>
    </form>
  );
}