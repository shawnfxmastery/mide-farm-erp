export default function SalesHeader() {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Egg Sales
        </h1>

        <p className="mt-2 text-slate-500">
          Manage egg sales, customer payments, and revenue.
        </p>
      </div>
    </div>
  );
}