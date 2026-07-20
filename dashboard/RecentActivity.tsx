"use client";

export default function RecentActivity() {
  const activities = [
    {
      icon: "🥚",
      title: "Egg Production Recorded",
      time: "Today",
      color: "bg-green-500/15",
    },
    {
      icon: "💰",
      title: "Sale Recorded",
      time: "Today",
      color: "bg-blue-500/15",
    },
    {
      icon: "🌽",
      title: "Feed Updated",
      time: "Yesterday",
      color: "bg-yellow-500/15",
    },
    {
      icon: "💸",
      title: "Expense Added",
      time: "Yesterday",
      color: "bg-red-500/15",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">

        <div>
          <h2 className="text-lg font-bold text-white sm:text-2xl">
            📝 Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest activities on your farm
          </p>
        </div>

        <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
          ● Live
        </span>

      </div>

      {/* Activity List */}
      <div className="mt-6 space-y-3">

        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl bg-slate-800 p-4 transition-all duration-300 hover:bg-slate-700"
          >
            <div className="flex min-w-0 items-center gap-4">

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${item.color}`}
              >
                {item.icon}
              </div>

              <div className="min-w-0">

                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  {item.time}
                </p>

              </div>

            </div>

            <div className="ml-3 h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
          </div>
        ))}

      </div>

    </div>
  );
}