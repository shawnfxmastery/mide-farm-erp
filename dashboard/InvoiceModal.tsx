"use client";

type Sale = {
  id: number;
  date: string;
  customer: string;
  crates: number;
  price_per_crate: number;
  total_amount: number;
  payment_status: string;
};

type Props = {
  sale: Sale | null;
  onClose: () => void;
};

export default function InvoiceModal({
  sale,
  onClose,
}: Props) {
  if (!sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-black">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            🧾 Invoice
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl bg-red-600 px-4 py-2 text-white"
          >
            ✕ Close
          </button>

        </div>

        <hr className="my-6" />

        <div className="flex items-center justify-between">

  <div>

    <h1 className="text-4xl font-extrabold text-green-700">
      🐔 MIDE FARM & POULTRY
    </h1>

    <p className="mt-2 text-gray-600">
      Fresh Eggs • Quality Poultry
    </p>

    <p className="text-gray-600">
      Ogun State, Nigeria
    </p>

    <p className="text-gray-600">
      +234 911 888 1885
    </p>

  </div>

  <div className="text-right">

    <h2 className="text-2xl font-bold">
      INVOICE
    </h2>

    <p className="mt-2">
      <strong>No:</strong>{" "}
      INV-{String(sale.id).padStart(6, "0")}
    </p>

    <p>
      <strong>Date:</strong> {sale.date}
    </p>

  </div>

</div>

        <div className="mt-10">

  <div className="mb-6">
    <p className="text-gray-500">Bill To</p>

    <h3 className="text-2xl font-bold">
      {sale.customer}
    </h3>
  </div>

  <table className="w-full border-collapse border">

    <thead>
      <tr className="bg-green-700 text-white">
        <th className="border p-3 text-left">Description</th>
        <th className="border p-3">Qty</th>
        <th className="border p-3">Unit Price</th>
        <th className="border p-3">Amount</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td className="border p-3">Fresh Eggs</td>
        <td className="border p-3 text-center">
          {sale.crates} Crates
        </td>
        <td className="border p-3 text-right">
          ₦{sale.price_per_crate.toLocaleString()}
        </td>
        <td className="border p-3 text-right font-bold">
          ₦{sale.total_amount.toLocaleString()}
        </td>
      </tr>
    </tbody>

  </table>

  <div className="mt-8 flex justify-end">

    <div className="w-80 rounded-xl bg-slate-100 p-6">

      <div className="flex justify-between">
        <span>Status</span>
        <span
  className={`rounded-full px-4 py-1 text-sm font-bold ${
    sale.payment_status === "Paid"
      ? "bg-green-600 text-white"
      : "bg-yellow-500 text-white"
  }`}
>
  {sale.payment_status}
</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-2xl font-bold">
        <span>Total</span>
        <span>
          ₦{sale.total_amount.toLocaleString()}
        </span>
      </div>

    </div>

  </div>

</div>

<div className="mt-10 border-t pt-6 text-center text-gray-600">

  <p className="text-lg font-semibold">
    Thank you for your business!
  </p>

  <p className="mt-2">
    We appreciate your patronage and look forward to serving you again.
  </p>

</div>

<div className="mt-12 flex justify-end">

  <div className="text-center">

    <div className="w-56 border-b border-black"></div>

    <p className="mt-2 font-semibold">
      Authorized Signature
    </p>

  </div>

</div>

<div className="mt-8 flex justify-end gap-4">

  <button
    onClick={() => window.print()}
    className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
  >
    🖨 Print Invoice
  </button>

</div>

        </div>

      </div>

  );
}