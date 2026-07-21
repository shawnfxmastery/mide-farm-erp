"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";

type Sale = {
  id: number;
  date: string | null;
  customer: string | null;
  crates: number | null;
  price_per_crate: number | null;
  total_amount: number | null;
  amount_paid: number | null;
  balance: number | null;
  payment_status: string | null;
};

export default function SalesList() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    setLoading(true);

    const { data, error } = await supabase
      .from("egg_sales")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setSales((data as Sale[]) || []);
    setLoading(false);
  }

  async function deleteSale(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sale?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("egg_sales")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Sale deleted successfully");

    loadSales();
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        Loading sales...
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h2 className="text-lg font-semibold">
          No sales yet
        </h2>

        <p className="mt-2 text-slate-500">
          Start by recording your first egg sale.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-5 py-4 text-left">Date</th>
            <th className="px-5 py-4 text-left">Customer</th>
            <th className="px-5 py-4 text-left">Crates</th>
            <th className="px-5 py-4 text-left">Total</th>
            <th className="px-5 py-4 text-left">Paid</th>
            <th className="px-5 py-4 text-left">Balance</th>
            <th className="px-5 py-4 text-left">Status</th>
            <th className="px-5 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr
              key={sale.id}
              className="border-t border-slate-200 hover:bg-slate-50"
            >
              <td className="px-5 py-4">
                {sale.date ?? "-"}
              </td>

              <td className="px-5 py-4">
                {sale.customer ?? "-"}
              </td>

              <td className="px-5 py-4">
                {sale.crates ?? 0}
              </td>

              <td className="px-5 py-4 font-medium">
                ₦{(sale.total_amount ?? 0).toLocaleString()}
              </td>

              <td className="px-5 py-4">
                ₦{(sale.amount_paid ?? 0).toLocaleString()}
              </td>

              <td className="px-5 py-4">
                ₦{(sale.balance ?? 0).toLocaleString()}
              </td>

              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    sale.payment_status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {sale.payment_status ?? "Pending"}
                </span>
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/dashboard-v2/sales/edit/${sale.id}`}
                  >
                    <Pencil
                      size={18}
                      className="text-blue-600 hover:text-blue-800"
                    />
                  </Link>

                  <button
                    onClick={() => deleteSale(sale.id)}
                  >
                    <Trash2
                      size={18}
                      className="text-red-600 hover:text-red-800"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}