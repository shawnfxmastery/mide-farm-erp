type Worker = {
  id: number;
  full_name: string;
  phone: string;
  position: string;
  salary: number;
  address: string;
  status: string;
};

type WorkerCardProps = {
  worker: Worker;
  onEdit: (worker: Worker) => void;
  onDelete: (id: number) => void;
};

export default function WorkerCard({
  worker,
  onEdit,
  onDelete,
}: WorkerCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 transition hover:border-slate-600 hover:shadow-xl">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex-1">

          <h3 className="text-lg font-bold text-white">
            {worker.full_name}
          </h3>

          <p className="mt-2 text-slate-400">
            💼 {worker.position}
          </p>

          <p className="mt-1 text-slate-400">
            📞 {worker.phone}
          </p>

          <p className="mt-2 text-lg font-semibold text-green-400">
            ₦{worker.salary.toLocaleString()}
          </p>

        </div>

        <span
          className={`self-start rounded-full px-3 py-1 text-sm font-semibold ${
            worker.status === "Active"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {worker.status}
        </span>

      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">

        <button
          onClick={() => onEdit(worker)}
          className="flex-1 rounded-xl bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => onDelete(worker.id)}
          className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}