import WorkerCard from "./WorkerCard";

type Worker = {
  id: number;
  full_name: string;
  phone: string;
  position: string;
  salary: number;
  address: string;
  status: string;
};

type WorkerListProps = {
  workers: Worker[];
  search: string;
  setSearch: (value: string) => void;
  onEdit: (worker: Worker) => void;
  onDelete: (id: number) => void;
};

export default function WorkerList({
  workers,
  search,
  setSearch,
  onEdit,
  onDelete,
}: WorkerListProps) {
  const filteredWorkers = workers.filter((worker) => {
    const text = search.toLowerCase();

    return (
      worker.full_name.toLowerCase().includes(text) ||
      worker.position.toLowerCase().includes(text)
    );
  });

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-6">

      <div className="mb-6">

        <input
          type="text"
          placeholder="🔍 Search by worker name or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none"
        />

      </div>

      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        Workers List
      </h2>

      <div className="space-y-4">

        {filteredWorkers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center text-slate-400">
            No workers found.
          </div>
        ) : (
          filteredWorkers.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}

      </div>

    </div>
  );
}