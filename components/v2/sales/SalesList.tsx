"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { deleteSale as removeSale } from "@/lib/services/sales";

import SearchBar from "@/components/v2/ui/SearchBar";
import FilterChips from "@/components/v2/ui/FilterChips";

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

function formatDate(date: string | null) {
  if (!date) return "–";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatMoney(amount: number | null) {
  return `₦${Number(amount ?? 0).toLocaleString()}`;
}

export default function SalesList() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

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

  try {
    await removeSale(id);

    toast.success("Sale deleted successfully");

    loadSales();
  } catch (error: any) {
    toast.error(error.message || "Unable to delete sale");
  }
}
  const filteredSales = sales.filter((sale) => {
  const matchesSearch = (sale.customer ?? "")
    .toLowerCase()
    .includes(search.toLowerCase());

  switch (filter) {
    case "Paid":
      return matchesSearch && sale.payment_status === "Paid";

    case "Owing":
      return matchesSearch && sale.payment_status !== "Paid";

    default:
      return matchesSearch;
  }
});

  if (loading) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">
      Loading sales...
    </div>
  );
}


  return (

    <>
    <div className="mb-6 space-y-4">
  <SearchBar
    value={search}
    onChange={setSearch}
    placeholder="Search customer..."
  />

  <FilterChips
    active={filter}
    onChange={setFilter}
    options={["All", "Paid", "Owing"]}
  />
</div>
  <div className="space-y-4 md:hidden">
  {filteredSales.map((sale) => (
      <div
        key={sale.id}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Date</p>
            <p className="font-semibold">
              {sale.date ?? "-"}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              sale.payment_status === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {sale.payment_status ?? "Pending"}
          </span>
        </div>

        <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-slate-500">
  Customer
</span>

            <span className="font-medium">
              {sale.customer ?? "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Crates
            </span>

            <span>{sale.crates ?? 0}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Total
            </span>

            <span className="text-lg font-bold text-slate-900">
              ₦{(sale.total_amount ?? 0).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Paid
            </span>

            <span>
              ₦{(sale.amount_paid ?? 0).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Balance
            </span>

            <span className="text-lg font-bold text-red-600">
              ₦{(sale.balance ?? 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-6 border-t pt-4">
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
      </div>
    ))}
  </div>
    {/* Desktop View */}
  <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
    <table className="min-w-[1050px] w-full">
      <thead className="border-b border-slate-200 bg-slate-50">
        <tr>
          <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Date</th>
          <th className="min-w-48 px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Customer</th>
          <th className="whitespace-nowrap px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">Crates</th>
          <th className="whitespace-nowrap px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">Total</th>
          <th className="whitespace-nowrap px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">Paid</th>
          <th className="whitespace-nowrap px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">Balance</th>
          <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
          <th className="whitespace-nowrap px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">Actions</th>
        </tr>
      </thead>

      <tbody>
  {filteredSales.map((sale) => (
  <tr
    key={sale.id}
    className="border-b border-slate-100 last:border-0 transition hover:bg-green-50/40"
  >
    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
      {formatDate(sale.date)}
    </td>

    <td className="px-6 py-4 font-semibold text-slate-900">
      {sale.customer ?? "Unnamed customer"}
    </td>

    <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-700">
      {sale.crates ?? 0}
    </td>

    <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-900">
      {formatMoney(sale.total_amount)}
    </td>

    <td className="whitespace-nowrap px-6 py-4 text-right text-slate-700">
      {formatMoney(sale.amount_paid)}
    </td>

    <td className={`whitespace-nowrap px-6 py-4 text-right font-bold ${(sale.balance ?? 0) > 0 ? "text-orange-700" : "text-slate-700"}`}>
      {formatMoney(sale.balance)}
    </td>

    <td className="whitespace-nowrap px-6 py-4">
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          sale.payment_status === "Paid"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {sale.payment_status ?? "Pending"}
      </span>
    </td>

    <td className="whitespace-nowrap px-6 py-4">
  <div className="flex justify-end gap-2">
    <Link
      href={`/dashboard-v2/sales/edit/${sale.id}`}
      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
    >
      <Pencil
        size={15}
      />
      Edit
    </Link>

    <button
      onClick={() => deleteSale(sale.id)}
      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
    >
      <Trash2
        size={15}
      />
      Delete
    </button>
  </div>
</td>

</tr>
))}

{filteredSales.length === 0 && (
  <tr>
    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
      No sales match this filter.
    </td>
  </tr>
)}

</tbody>
</table>
</div>

</>
);
}
