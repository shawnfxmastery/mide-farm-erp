"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Supplier = {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  category: string;
  status: string;
};

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("Feed");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers() {
    const { data } = await supabase
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setSuppliers(data);
  }

  async function saveSupplier() {

  if (!name || !phone || !category) {
    alert("Please complete all required fields.");
    return;
  }

  const { error } = await supabase
    .from("suppliers")
    .insert([
      {
        name,
        company,
        phone,
        email,
        address,
        category,
        status,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Supplier added successfully!");

  setName("");
  setCompany("");
  setPhone("");
  setEmail("");
  setAddress("");
  setCategory("Feed");
  setStatus("Active");

  loadSuppliers();
}

  return (
  <div className="space-y-8">

    <div>
      <h1 className="text-4xl font-bold">
        📦 Suppliers
      </h1>

      <p className="mt-2 text-slate-400">
        Manage all suppliers for your farm.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl bg-slate-900 p-6">
        <p className="text-slate-400">Total Suppliers</p>
        <h2 className="mt-3 text-4xl font-bold text-green-400">
          {suppliers.length}
        </h2>
      </div>

      <div className="rounded-2xl bg-slate-900 p-6">
        <p className="text-slate-400">Feed Suppliers</p>
        <h2 className="mt-3 text-4xl font-bold text-yellow-400">
          {suppliers.filter((s) => s.category === "Feed").length}
        </h2>
      </div>

      <div className="rounded-2xl bg-slate-900 p-6">
        <p className="text-slate-400">Active</p>
        <h2 className="mt-3 text-4xl font-bold text-green-500">
          {suppliers.filter((s) => s.status === "Active").length}
        </h2>
      </div>

      <div className="rounded-2xl bg-slate-900 p-6">
        <p className="text-slate-400">Inactive</p>
        <h2 className="mt-3 text-4xl font-bold text-red-500">
          {suppliers.filter((s) => s.status === "Inactive").length}
        </h2>
      </div>

    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

      <div className="rounded-2xl bg-slate-900 p-6 space-y-4">

        <h2 className="text-2xl font-bold">
          Add Supplier
        </h2>

        <input
          placeholder="Supplier Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3"
        />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3"
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3"
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3"
        >
          <option>Feed</option>
          <option>Vaccine</option>
          <option>Equipment</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button
          onClick={saveSupplier}
          className="w-full rounded-xl bg-green-600 py-3 font-bold hover:bg-green-500"
        >
          Save Supplier
        </button>

      </div>

      <div className="rounded-2xl bg-slate-900 p-6">

  <h2 className="mb-4 text-2xl font-bold">
    Suppliers List
  </h2>

  <input
    type="text"
    placeholder="🔍 Search supplier..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mb-6 w-full rounded-xl bg-slate-800 p-3"
  />

  <div className="space-y-4">

    {suppliers
      .filter((supplier) => {
        const text = search.toLowerCase();

        return (
          supplier.name.toLowerCase().includes(text) ||
          supplier.company.toLowerCase().includes(text) ||
          supplier.category.toLowerCase().includes(text)
        );
      })
      .map((supplier) => (

        <div
          key={supplier.id}
          className="rounded-xl border border-slate-700 p-4"
        >

          <h3 className="text-lg font-bold">
            {supplier.name}
          </h3>

          <p className="text-slate-400">
            {supplier.company}
          </p>

          <p className="text-slate-400">
            📞 {supplier.phone}
          </p>

          <p className="text-slate-400">
            📧 {supplier.email}
          </p>

          <p className="text-slate-400">
            📍 {supplier.address}
          </p>

          <div className="mt-3 flex items-center justify-between">

            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400">
              {supplier.category}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm ${
                supplier.status === "Active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {supplier.status}
            </span>

          </div>

        </div>

      ))}

    </div>

</div>

    </div>

  </div>
);
}