type WorkerFormProps = {
  fullName: string;
  setFullName: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  position: string;
  setPosition: (value: string) => void;

  salary: string;
  setSalary: (value: string) => void;

  address: string;
  setAddress: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  onSave: () => void;
};

export default function WorkerForm({
  fullName,
  setFullName,
  phone,
  setPhone,
  position,
  setPosition,
  salary,
  setSalary,
  address,
  setAddress,
  status,
  setStatus,
  onSave,
}: WorkerFormProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-6 lg:p-8">

      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        Add Worker
      </h2>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Full Name
          </label>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Phone Number
          </label>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Position
          </label>

          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Farm Manager"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Monthly Salary
          </label>

          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="80000"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Address
          </label>

          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Worker address..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 focus:border-green-500 focus:outline-none"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <button
          onClick={onSave}
          className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-green-500"
        >
          Save Worker
        </button>

      </div>

    </div>
  );
}