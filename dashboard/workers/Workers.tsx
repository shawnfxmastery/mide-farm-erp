"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import WorkerStats from "./WorkerStats";
import WorkerForm from "./WorkerForm";
import WorkerList from "./WorkerList";
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

  const [editingWorker, setEditingWorker] =
    useState<Worker | null>(null);

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    const { data } = await supabase
      .from("workers")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setWorkers(data);
    }
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
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold sm:text-4xl">
          👷 Workers Management
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Manage your farm employees and payroll.
        </p>

      </div>

      <WorkerStats
        totalWorkers={totalWorkers}
        activeWorkers={activeWorkers}
        inactiveWorkers={inactiveWorkers}
        totalSalary={totalSalary}
      />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        <WorkerForm
          fullName={fullName}
          setFullName={setFullName}
          phone={phone}
          setPhone={setPhone}
          position={position}
          setPosition={setPosition}
          salary={salary}
          setSalary={setSalary}
          address={address}
          setAddress={setAddress}
          status={status}
          setStatus={setStatus}
          onSave={saveWorker}
        />

        <WorkerList
          workers={workers}
          search={search}
          setSearch={setSearch}
          onEdit={setEditingWorker}
          onDelete={deleteWorker}
        />

      </div>

      <EditWorkerModal
        worker={editingWorker}
        onClose={() => setEditingWorker(null)}
        onSaved={loadWorkers}
      />

    </div>
  );
}