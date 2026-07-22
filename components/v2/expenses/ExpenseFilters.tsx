"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  month: string;
  setMonth: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
};

export default function ExpenseFilters({
  search,
  setSearch,
  category,
  setCategory,
  month,
  setMonth,
  sort,
  setSort,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow space-y-4">

      <input
        type="text"
        placeholder="🔍 Search vendor, description or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-xl border p-3"
      >
        <option value="">All Categories</option>

        <option value="Feed">Feed</option>
        <option value="Medication">Medication</option>
        <option value="Vaccination">Vaccination</option>
        <option value="Salary">Salary</option>
        <option value="Fuel">Fuel</option>
        <option value="Transport">Transport</option>
        <option value="Electricity">Electricity</option>
        <option value="Water">Water</option>
        <option value="Equipment">Equipment</option>
        <option value="Repairs">Repairs</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Packaging">Packaging</option>
        <option value="Security">Security</option>
        <option value="Office Supplies">Office Supplies</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full rounded-xl border p-3"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest">Highest Amount</option>
        <option value="lowest">Lowest Amount</option>
      </select>

    </div>
  );
}