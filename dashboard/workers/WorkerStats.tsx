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
      color: "text-green-400",
    },
    {
      title: "Active Workers",
      value: activeWorkers,
      color: "text-emerald-400",
    },
    {
      title: "Inactive Workers",
      value: inactiveWorkers,
      color: "text-red-400",
    },
    {
      title: "Monthly Payroll",
      value: `₦${totalSalary.toLocaleString()}`,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl transition hover:border-slate-700 hover:shadow-2xl"
        >
          <p className="text-sm text-slate-400">
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