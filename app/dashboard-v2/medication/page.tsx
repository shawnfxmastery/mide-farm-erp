"use client";

import { useEffect, useState } from "react";
import { Plus, Syringe } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { getTodayNigeria } from "@/lib/date";

type Medication = { id: number; date: string; medication_name: string; purpose: string; dosage: string | null; quantity: string | null; cost: number | null; notes: string | null };

export default function MedicationPage() {
  const [records, setRecords] = useState<Medication[]>([]);
  const [date, setDate] = useState(getTodayNigeria());
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [dosage, setDosage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadRecords(); }, []);
  async function loadRecords() {
    const { data, error } = await supabase.from("medication_records").select("*").order("date", { ascending: false });
    if (error) { toast.error(error.message); return; }
    setRecords((data as Medication[]) ?? []);
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !purpose.trim()) { toast.error("Medication name and purpose are required."); return; }
    setSaving(true);
    try {
      const { error } = await supabase.from("medication_records").insert({ date, medication_name: name.trim(), purpose: purpose.trim(), dosage: dosage.trim() || null, quantity: quantity.trim() || null, cost: Number(cost) || 0, notes: notes.trim() || null });
      if (error) throw error;
      toast.success("Medication record saved.");
      setName(""); setPurpose(""); setDosage(""); setQuantity(""); setCost(""); setNotes("");
      await loadRecords();
    } catch (error: any) { toast.error(error.message || "Unable to save medication record."); }
    finally { setSaving(false); }
  }
  return <div className="mx-auto max-w-5xl space-y-6">
    <div><h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900"><Syringe className="text-green-600" /> Medication</h1><p className="mt-2 text-slate-500">Record treatments, vaccines, and other medication given to your flock.</p></div>
    <form onSubmit={save} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
      <Field label="Treatment Date"><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field" /></Field>
      <Field label="Medication Name *"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Antibiotic" className="field" /></Field>
      <Field label="Purpose / Condition *"><input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Respiratory treatment" className="field" /></Field>
      <Field label="Dosage"><input value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g. 1ml per litre" className="field" /></Field>
      <Field label="Quantity Used"><input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g. 2 bottles" className="field" /></Field>
      <Field label="Cost (₦)"><input type="number" min="0" value={cost} onChange={(e) => setCost(e.target.value)} className="field" /></Field>
      <Field label="Notes" wide><textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="field min-h-20" placeholder="Optional notes" /></Field>
      <button disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 md:col-span-2"><Plus size={18} />{saving ? "Saving..." : "Record Medication"}</button>
    </form>
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 p-5"><h2 className="font-bold text-slate-900">Medication History</h2></div>{records.length === 0 ? <p className="p-8 text-center text-slate-500">No medication records yet.</p> : <div className="divide-y">{records.map((record) => <div key={record.id} className="p-5"><div className="flex flex-wrap justify-between gap-3"><div><p className="font-semibold text-slate-900">{record.medication_name}</p><p className="text-sm text-slate-500">{record.date} · {record.purpose}</p></div><p className="font-semibold text-green-700">₦{Number(record.cost ?? 0).toLocaleString()}</p></div><p className="mt-2 text-sm text-slate-600">{[record.dosage, record.quantity, record.notes].filter(Boolean).join(" · ")}</p></div>)}</div>}</section>
  </div>;
}
function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) { return <label className={wide ? "md:col-span-2" : ""}><span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>{children}</label>; }
