export default function ProductionHistoryCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        Recent Production
      </h2>

      <div className="mt-5 space-y-4">

        {[56,55,54,57,53].map((item,index)=>(
          <div
            key={index}
            className="flex items-center justify-between border-b pb-3 last:border-none"
          >
            <div>
              <p className="font-medium">
                Production Record
              </p>

              <p className="text-sm text-slate-500">
                July {20-index}, 2026
              </p>
            </div>

            <span className="font-bold text-green-700">
              {item} Crates
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}