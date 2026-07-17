"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EditWorkerModal from "./EditWorkerModal";

type Worker = {
  id: number;
  full_name: string;
  phone: string;
  position: string;
  salary: number;
  address: string;
  status: string;
};

export default function Workers() {
  const [workers, setWorkers] = useState<Worker[]>([]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    const { data } = await supabase
      .from("workers")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setWorkers(data);
  }

  async function saveWorker() {

  if (
    !fullName ||
    !phone ||
    !position ||
    !salary ||
    !address
  ) {
    alert("Please complete all fields.");
    return;
  }

  const { error } = await supabase
    .from("workers")
    .insert([
      {
        full_name: fullName,
        phone,
        position,
        salary: Number(salary),
        address,
        status,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Worker added successfully!");

  setFullName("");
  setPhone("");
  setPosition("");
  setSalary("");
  setAddress("");
  setStatus("Active");

  loadWorkers();
}

  async function deleteWorker(id: number) {
  const confirmDelete = confirm(
    "Delete this worker?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("workers")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadWorkers();
}

  const totalWorkers = workers.length;

const activeWorkers = workers.filter(
  (worker) => worker.status === "Active"
).length;

const inactiveWorkers = workers.filter(
  (worker) => worker.status === "Inactive"
).length;

const totalSalary = workers.reduce(
  (sum, worker) => sum + worker.salary,
  0
);

  return (
    <div className="p-8 text-white">

      <div className="mb-8">

  <h1 className="text-4xl font-bold">
    👷 Workers Management
  </h1>

  <p className="mt-2 text-slate-400">
    Manage your farm employees and payroll.
  </p>

</div>

<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-2xl bg-slate-900 p-6">
    <p className="text-slate-400">Total Workers</p>
    <h2 className="mt-3 text-4xl font-bold text-green-400">
      {totalWorkers}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-900 p-6">
    <p className="text-slate-400">Active</p>
    <h2 className="mt-3 text-4xl font-bold text-green-500">
      {activeWorkers}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-900 p-6">
    <p className="text-slate-400">Inactive</p>
    <h2 className="mt-3 text-4xl font-bold text-red-500">
      {inactiveWorkers}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-900 p-6">
    <p className="text-slate-400">Monthly Payroll</p>
    <h2 className="mt-3 text-3xl font-bold text-yellow-400">
      ₦{totalSalary.toLocaleString()}
    </h2>
  </div>

</div>

<div className="mb-8">
  <input
    type="text"
    placeholder="🔍 Search by worker name or position..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-2xl bg-slate-900 p-4 text-white placeholder-slate-500"
  />
</div>

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

  <div className="rounded-2xl bg-slate-900 p-6 space-y-4">

    <h2 className="text-2xl font-bold">Add Worker</h2>

    <input
      placeholder="Full Name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="w-full rounded-xl bg-slate-800 p-3"
    />

    <input
      placeholder="Phone Number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-full rounded-xl bg-slate-800 p-3"
    />

    <input
      placeholder="Position"
      value={position}
      onChange={(e) => setPosition(e.target.value)}
      className="w-full rounded-xl bg-slate-800 p-3"
    />

    <input
      type="number"
      placeholder="Salary"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      className="w-full rounded-xl bg-slate-800 p-3"
    />

    <textarea
      placeholder="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="w-full rounded-xl bg-slate-800 p-3"
    />

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="w-full rounded-xl bg-slate-800 p-3"
    >
      <option>Active</option>
      <option>Inactive</option>
    </select>

    <button
      onClick={saveWorker}
      className="w-full rounded-xl bg-green-600 py-3 font-bold hover:bg-green-500"
    >
      Save Worker
    </button>

  </div>

  <div className="rounded-2xl bg-slate-900 p-6">

    <h2 className="mb-4 text-2xl font-bold">
      Workers List
    </h2>

    <div className="space-y-3">

      {workers
  .filter((worker) => {
    const text = search.toLowerCase();

    return (
      worker.full_name.toLowerCase().includes(text) ||
      worker.position.toLowerCase().includes(text)
    );
  })
  .map((worker) => (

        <div
          key={worker.id}
          className="rounded-xl border border-slate-700 p-4"
        >
          <h3 className="font-bold text-lg">
            {worker.full_name}
          </h3>

          <p className="mt-2 text-slate-400">
  {worker.position}
</p>

<p className="text-slate-400">
  📞 {worker.phone}
</p>

<p className="font-semibold text-green-400">
  ₦{worker.salary.toLocaleString()}
</p>

<span
  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
    worker.status === "Active"
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400"
  }`}
>
  {worker.status}
</span>

<div className="mt-4 flex gap-3">

  <button
  onClick={() => setEditingWorker(worker)}
  className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-400"
>
  ✏ Edit
</button>

  <button
    onClick={() => deleteWorker(worker.id)}
    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500"
  >
    🗑 Delete
  </button>

</div>

        </div>

      ))}

        </div>

  </div>

</div>

<EditWorkerModal
  worker={editingWorker}
  onClose={() => setEditingWorker(null)}
  onSaved={loadWorkers}
/>

    </div>

  );

}