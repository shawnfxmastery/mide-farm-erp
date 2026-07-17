"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EditSaleModal from "./EditSaleModal";
import InvoiceModal from "./InvoiceModal";
import type { Sale } from "@/types/sale";


export default function SalesHistory() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [invoiceSale, setInvoiceSale] = useState<Sale | null>(null);
  const [search, setSearch] = useState("");
  const totalRevenue = sales.reduce(
  (sum, sale) => sum + sale.total_amount,
  0
);

const totalCrates = sales.reduce(
  (sum, sale) => sum + sale.crates,
  0
);

const paidRevenue = sales
  .filter((sale) => sale.payment_status === "Paid")
  .reduce((sum, sale) => sum + sale.total_amount, 0);

const owingRevenue = sales
  .filter((sale) => sale.payment_status === "Owing")
  .reduce((sum, sale) => sum + sale.total_amount, 0);

  async function loadSales() {
    const { data, error } = await supabase
      .from("egg_sales")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      setSales(data);
    }
  }

  async function deleteSale(id: number) {
    const confirmDelete = confirm(
      "Delete this sale?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("egg_sales")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadSales();
  }

  useEffect(() => {
    loadSales();
  }, []);

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        💰 Sales History
      </h2>
      <div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Search customer..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl bg-slate-800 px-4 py-4 text-white placeholder-slate-500"
  />
</div>

<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">💰 Total Revenue</p>
    <h2 className="mt-2 text-3xl font-bold text-green-400">
      ₦{totalRevenue.toLocaleString()}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">📦 Total Crates Sold</p>
    <h2 className="mt-2 text-3xl font-bold text-blue-400">
      {totalCrates}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">🟢 Paid</p>
    <h2 className="mt-2 text-3xl font-bold text-green-400">
      ₦{paidRevenue.toLocaleString()}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400">🟡 Owing</p>
    <h2 className="mt-2 text-3xl font-bold text-yellow-400">
      ₦{owingRevenue.toLocaleString()}
    </h2>
  </div>

</div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left text-slate-400">

              <th className="py-3">Date</th>

              <th>Customer</th>

              <th>Crates</th>

              <th>Price</th>

              <th>Total</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {sales
  .filter((sale) => {
    const text = search.toLowerCase();

    return (
      sale.customer.toLowerCase().includes(text) ||
      sale.date.toLowerCase().includes(text) ||
      sale.payment_status.toLowerCase().includes(text)
    );
  })
  .map((sale) => (

              <tr
                key={sale.id}
                className="border-b border-slate-800 hover:bg-slate-800/50"
              >

                <td className="py-4">
                  {sale.date}
                </td>

                <td>{sale.customer}</td>

                <td>{sale.crates}</td>

                <td>
                  ₦{sale.price_per_crate.toLocaleString()}
                </td>

                <td className="font-semibold text-green-400">
                  ₦{sale.total_amount.toLocaleString()}
                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      sale.payment_status === "Paid"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {sale.payment_status}
                  </span>

                </td>

                <td>
  <div className="flex gap-2">

    <div className="flex gap-2">

  <button
  onClick={() => setInvoiceSale(sale)}
  className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
>
  🧾 Invoice
</button>

  <button
    onClick={() => setEditingSale(sale)}
    className="rounded-lg bg-yellow-500 px-3 py-1 text-black hover:bg-yellow-400"
  >
    ✏ Edit
  </button>

  <button
    onClick={() => deleteSale(sale.id)}
    className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-500"
  >
    🗑 Delete
  </button>

</div>

  </div>
</td>

              </tr>

                      ))}

          </tbody>

        </table>

      </div>

      <EditSaleModal
        sale={editingSale}
        onClose={() => setEditingSale(null)}
        onSaved={loadSales}
      />

      <InvoiceModal
  sale={invoiceSale}
  onClose={() => setInvoiceSale(null)}
/>

    </div>
  );
}