"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Phone, Plus, Search, Truck } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Supplier = {
  id: number;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  category: string | null;
  status: string | null;
};

const categories = ["Feed", "Vaccine", "Equipment", "Transport", "Other"];

export default function SuppliersManager() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("Feed");

  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers() {
    const { data, error } = await supabase
      .from("suppliers")
      .select("id, name, company, phone, email, address, category, status")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message || "Unable to load suppliers.");
      return;
    }

    setSuppliers((data as Supplier[]) ?? []);
  }

  async function saveSupplier(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error("Supplier name and phone number are required.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.from("suppliers").insert({
        name: name.trim(),
        company: company.trim() || null,
        phone: phone.trim(),
        email: email.trim() || null,
        address: address.trim() || null,
        category,
        status: "Active",
      });

      if (error) throw error;

      toast.success("Supplier added successfully.");
      setName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setAddress("");
      setCategory("Feed");
      await loadSuppliers();
    } catch (error: any) {
      toast.error(error.message || "Unable to save supplier.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(supplier: Supplier) {
    const newStatus = supplier.status === "Active" ? "Inactive" : "Active";

    try {
      const { error } = await supabase
        .from("suppliers")
        .update({ status: newStatus })
        .eq("id", supplier.id);

      if (error) throw error;

      toast.success(`${supplier.name} is now ${newStatus.toLowerCase()}.`);
      await loadSuppliers();
    } catch (error: any) {
      toast.error(error.message || "Unable to update supplier.");
    }
  }

  const filteredSuppliers = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return suppliers;

    return suppliers.filter((supplier) =>
      [supplier.name, supplier.company, supplier.phone, supplier.category]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term))
    );
  }, [search, suppliers]);

  const activeSuppliers = suppliers.filter((supplier) => supplier.status === "Active").length;
  const feedSuppliers = suppliers.filter((supplier) => supplier.category === "Feed").length;

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Suppliers</h1>
          <p className="mt-2 text-slate-500">Keep your feed, vaccine, equipment, and transport suppliers in one place.</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Total suppliers" value={suppliers.length} icon={<Building2 size={20} />} color="bg-blue-100 text-blue-700" />
        <SummaryCard label="Active suppliers" value={activeSuppliers} icon={<Truck size={20} />} color="bg-green-100 text-green-700" />
        <SummaryCard label="Feed suppliers" value={feedSuppliers} icon={<Truck size={20} />} color="bg-amber-100 text-amber-700" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        <form onSubmit={saveSupplier} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-700"><Plus size={22} /></div>
            <div><h2 className="font-bold text-slate-900">Add Supplier</h2><p className="text-sm text-slate-500">Add a supplier once, then choose them when recording feed purchases.</p></div>
          </div>

          <FormField label="Supplier Name *"><Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Supplier or contact name" /></FormField>
          <FormField label="Company"><Input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Business name" /></FormField>
          <FormField label="Phone Number *"><Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="080..." /></FormField>
          <FormField label="Email"><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Optional" /></FormField>
          <FormField label="Category">
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </FormField>
          <FormField label="Address"><Textarea value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Optional" /></FormField>

          <Button type="submit" disabled={saving} className="w-full bg-green-600 hover:bg-green-700">{saving ? "Saving..." : "Save Supplier"}</Button>
        </form>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div><h2 className="font-bold text-slate-900">Supplier Directory</h2><p className="text-sm text-slate-500">Deactivate a supplier instead of deleting their history.</p></div>
            <div className="relative w-full sm:w-64"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9" placeholder="Search suppliers" /></div>
          </div>

          <div className="space-y-3">
            {filteredSuppliers.length === 0 ? <p className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">No suppliers found.</p> : filteredSuppliers.map((supplier) => (
              <article key={supplier.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div><h3 className="font-bold text-slate-900">{supplier.name}</h3>{supplier.company && <p className="text-sm text-slate-500">{supplier.company}</p>}</div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${supplier.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>{supplier.status || "Active"}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5"><Phone size={15} />{supplier.phone || "No phone"}</span>
                  <span>{supplier.category || "Other"}</span>
                  {supplier.email && <span>{supplier.email}</span>}
                </div>
                <div className="mt-4"><Button type="button" variant="outline" size="sm" onClick={() => toggleStatus(supplier)}>{supplier.status === "Active" ? "Deactivate" : "Make Active"}</Button></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><Label className="mb-2 block">{label}</Label>{children}</div>;
}

function SummaryCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`mb-3 inline-flex rounded-xl p-2.5 ${color}`}>{icon}</div><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-bold text-slate-900">{value}</p></div>;
}
