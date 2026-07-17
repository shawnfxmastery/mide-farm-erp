"use client";

import type { BirdBatch } from "@/types/bird";

type Props = {
  bird: BirdBatch | null;
  onClose: () => void;
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">
        {value ?? "N/A"}
      </p>
    </div>
  );
}

export default function BirdDetailsModal({
  bird,
  onClose,
}: Props) {
  if (!bird) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-4xl rounded-3xl bg-slate-900 p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            🐔 Bird Batch Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            ✕ Close
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <DetailRow
            label="Batch Number"
            value={bird.batch_number}
          />

          <DetailRow
            label="Breed"
            value={bird.breed}
          />

          <DetailRow
            label="Arrival Date"
            value={bird.arrival_date}
          />

          <DetailRow
            label="Quantity"
            value={bird.quantity}
          />

          <DetailRow
            label="Birds Alive"
            value={bird.alive}
          />

          <DetailRow
            label="Mortality"
            value={bird.mortality}
          />

          <DetailRow
            label="Mortality %"
            value={`${bird.mortality_percentage ?? 0}%`}
          />

          <DetailRow
            label="Age"
            value={`${bird.age_weeks ?? 0} Weeks`}
          />

          <DetailRow
            label="Stage"
            value={bird.stage}
          />

          <DetailRow
            label="Supplier"
            value={bird.supplier}
          />

          <DetailRow
            label="Vaccination"
            value={bird.vaccination_status}
          />

          <DetailRow
            label="Health"
            value={bird.health_status}
          />

        </div>

      </div>
    </div>
  );
}