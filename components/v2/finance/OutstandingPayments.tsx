"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CreditCard, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Sale = {
  id: number;
  date: string;
  customer: string | null;
  total_amount: number | null;
  amount_paid: number | null;
  balance: number | null;
};

function amountOwed(sale: Sale) {
  const storedBalance = Number(sale.balance);
  const calculatedBalance = Number(sale.total_amount ?? 0) - Number(sale.amount_paid ?? 0);

  return Math.max(
    sale.balance !== null && Number.isFinite(storedBalance)
      ? storedBalance
      : calculatedBalance,
    0
  );
}

function displayDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function OutstandingPayments() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSales() {
    setLoading(true);
    const { data, error } = await supabase
      .from("egg_sales")
      .select("id,date,customer,total_amount,amount_paid,balance")
      .order("date", { ascending: false });

    if (error) {
      console.error("Unable to load outstanding payments:", error);
      setSales([]);
    } else {
      setSales(((data ?? []) as Sale[]).filter((sale) => amountOwed(sale) > 0));
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSales();
  }, []);

  const totalOwed = useMemo(
    () => sales.reduce((sum, sale) => sum + amountOwed(sale), 0),
    [sales]
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-orange-100 p-3 text-orange-700"><CreditCard size={22} /></div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Outstanding Payments</h2>
            <p className="text-sm text-slate-500">Customers who still have a balance to pay.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={loadSales} disabled={loading} className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50" aria-label="Refresh outstanding payments" title="Refresh">
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          <div className="rounded-2xl bg-orange-50 px-4 py-3 text-right">
            <p className="text-xs font-semibold text-orange-700">TOTAL OWED</p>
            <p className="text-xl font-bold text-orange-700">₦{totalOwed.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="py-6 text-center text-slate-500">Loading balances...</p>
      ) : sales.length === 0 ? (
        <div className="rounded-2xl bg-green-50 p-6 text-center text-green-800">No outstanding customer payments. Well done.</div>
      ) : (
        <div className="space-y-3">
          {sales.map((sale) => (
            <div key={sale.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
              <div>
                <p className="font-semibold text-slate-900">{sale.customer || "Unnamed customer"}</p>
                <p className="mt-1 text-sm text-slate-500">{displayDate(sale.date)} · Total ₦{Number(sale.total_amount ?? 0).toLocaleString()} · Paid ₦{Number(sale.amount_paid ?? 0).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-orange-700">₦{amountOwed(sale).toLocaleString()} owed</p>
                <Link href={`/dashboard-v2/sales/edit/${sale.id}`} className="inline-flex items-center gap-1 rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700">
                  Update payment <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
