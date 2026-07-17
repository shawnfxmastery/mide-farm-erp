"use client";

export default function RecentActivity() {
  const activities = [
    {
      icon: "🥚",
      title: "Egg Production Recorded",
      time: "Today",
    },
    {
      icon: "💰",
      title: "Sale Recorded",
      time: "Today",
    },
    {
      icon: "🌽",
      title: "Feed Updated",
      time: "Yesterday",
    },
    {
      icon: "💸",
      title: "Expense Added",
      time: "Yesterday",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          📝 Recent Activity
        </h2>

        <span className="text-green-400 text-sm">
          Live
        </span>

      </div>

      <div className="mt-8 space-y-4">

        {activities.map((item, index) => (

          <div
            key={index}
            className="flex items-center justify-between rounded-2xl bg-slate-800 p-4 transition hover:bg-slate-700"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-2xl">
                {item.icon}
              </div>

              <div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {item.time}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}