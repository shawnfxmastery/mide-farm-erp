type WorkerStatsProps = {
  totalWorkers: number;
  activeWorkers: number;
  inactiveWorkers: number;
  totalSalary: number;
};

export default function WorkerStats({
  totalWorkers,
  activeWorkers,
  inactiveWorkers,
  totalSalary,
}: WorkerStatsProps) {
  const stats = [
    {
      title: "Total Workers",
      value: totalWorkers,
      color: "text-green-600",
    },
    {
      title: "Active Workers",
      value: activeWorkers,
      color: "text-emerald-600",
    },
    {
      title: "Inactive Workers",
      value: inactiveWorkers,
      color: "text-red-600",
    },
    {
      title: "Monthly Payroll",
      value: `₦${totalSalary.toLocaleString()}`,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <p className="text-sm text-slate-500">
            {stat.title}
          </p>

          <h2
            className={`mt-3 break-words text-2xl font-bold sm:text-3xl ${stat.color}`}
          >
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
