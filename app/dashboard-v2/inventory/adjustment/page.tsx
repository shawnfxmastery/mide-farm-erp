"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createEggAdjustment } from "@/lib/services/eggAdjustments";
import { getTodayNigeria } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EggAdjustmentPage() {
  const router = useRouter();
  const [date, setDate] = useState(getTodayNigeria());
  const [crates, setCrates] = useState("");
  const [pieces, setPieces] = useState("");
  const [reason, setReason] = useState("Customer replacement / broken eggs");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveAdjustment() {
    const cratesRemoved = Number(crates) || 0;
    const piecesRemoved = Number(pieces) || 0;

    if (!Number.isInteger(cratesRemoved) || cratesRemoved < 0) {
      toast.error("Crates must be a whole number of zero or more.");
      return;
    }

    if (
      !Number.isInteger(piecesRemoved) ||
      piecesRemoved < 0 ||
      piecesRemoved >= 30
    ) {
      toast.error("Pieces must be a whole number from 0 to 29.");
      return;
    }

    if (cratesRemoved === 0 && piecesRemoved === 0) {
      toast.error("Enter the crates or pieces removed.");
      return;
    }

    if (!reason.trim()) {
      toast.error("Please state the reason for this adjustment.");
      return;
    }

    setSaving(true);

    try {
      await createEggAdjustment({
        date,
        crates: cratesRemoved,
        pieces: piecesRemoved,
        reason: reason.trim(),
        notes: notes.trim(),
      });

      toast.success("Egg adjustment recorded. Inventory updated.");
      router.push("/dashboard-v2/inventory");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Unable to record egg adjustment.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Egg Adjustment
        </h1>
        <p className="mt-2 text-slate-500">
          Record broken eggs, customer replacements, or other eggs removed from farm stock.
        </p>
      </div>

      <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div>
          <Label className="mb-2 block">Adjustment Date</Label>
          <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label className="mb-2 block">Crates Removed</Label>
            <Input type="number" min="0" step="1" placeholder="0" value={crates} onChange={(event) => setCrates(event.target.value)} />
          </div>
          <div>
            <Label className="mb-2 block">Pieces Removed</Label>
            <Input type="number" min="0" max="29" step="1" placeholder="15" value={pieces} onChange={(event) => setPieces(event.target.value)} />
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Reason</Label>
          <Input value={reason} onChange={(event) => setReason(event.target.value)} />
        </div>

        <div>
          <Label className="mb-2 block">Notes (optional)</Label>
          <Textarea placeholder="For example: 15 pieces given to the driver to replace broken eggs for a customer." value={notes} onChange={(event) => setNotes(event.target.value)} />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()} disabled={saving}>Cancel</Button>
          <Button onClick={saveAdjustment} disabled={saving} className="bg-amber-600 hover:bg-amber-700">
            {saving ? "Saving..." : "Record Adjustment"}
          </Button>
        </div>
      </div>
    </div>
  );
}
