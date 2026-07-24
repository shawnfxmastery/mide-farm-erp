"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { logInventoryActivity } from "@/lib/inventoryActivity";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  checkInventory,
  deductInventory,
} from "@/lib/inventory";

export default function NewSaleForm() {
  const router = useRouter();

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [customer, setCustomer] = useState("");
  const [crates, setCrates] = useState("");
  const [pricePerCrate, setPricePerCrate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const totalAmount = useMemo(() => {
    return (
      (Number(crates) || 0) *
      (Number(pricePerCrate) || 0)
    );
  }, [crates, pricePerCrate]);

  const balance = useMemo(() => {
    return totalAmount - (Number(amountPaid) || 0);
  }, [totalAmount, amountPaid]);

  const paymentStatus =
    balance <= 0 ? "Paid" : "Owing";

  async function saveSale() {
  if (!customer) {
    toast.error("Customer is required");
    return;
  }

  if (!crates || Number(crates) <= 0) {
    toast.error("Enter crates sold");
    return;
  }

  if (!pricePerCrate) {
    toast.error("Enter price per crate");
    return;
  }

  setSaving(true);

  try {
    const cratesSold = Number(crates);

    // Check inventory first
    await checkInventory(cratesSold);

    // Save sale
    const { error } = await supabase
      .from("egg_sales")
      .insert({
        date,
        customer,
        crates: cratesSold,
        price_per_crate: Number(pricePerCrate),
        total_amount: totalAmount,
        amount_paid: Number(amountPaid) || 0,
        balance,
        payment_status: paymentStatus,
        payment_method: paymentMethod,
        notes,
      });

    if (error) throw error;

    // Deduct inventory
    await deductInventory(cratesSold);

    // Log inventory movement
    await logInventoryActivity(
      "Sale",
      -cratesSold,
      0,
      customer
    );

    toast.success("Sale recorded successfully");

    router.push("/dashboard-v2/sales");
    router.refresh();
  } catch (error: any) {
    toast.error(error.message || "Unable to save sale");
  } finally {
    setSaving(false);
  }
}

  return (
    <div className="space-y-8">

      <div className="grid gap-7 md:grid-cols-2">

        <div>
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Sale Date
          </Label>

          <Input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="h-12 rounded-2xl"
          />
        </div>

        <div>
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Customer
          </Label>

          <Input
            placeholder="Customer name"
            value={customer}
            onChange={(e) =>
              setCustomer(e.target.value)
            }
            className="h-12 rounded-2xl"
          />
        </div>

        <div>
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Crates Sold
          </Label>

          <Input
            type="number"
            placeholder="50"
            value={crates}
            onChange={(e) =>
              setCrates(e.target.value)
            }
            className="h-12 rounded-2xl"
          />
        </div>

        <div>
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Price Per Crate (₦)
          </Label>

          <Input
            type="number"
            placeholder="4500"
            value={pricePerCrate}
            onChange={(e) =>
              setPricePerCrate(e.target.value)
            }
            className="h-12 rounded-2xl"
          />
        </div>

        <div>
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Amount Paid (₦)
          </Label>

          <Input
            type="number"
            placeholder="225000"
            value={amountPaid}
            onChange={(e) =>
              setAmountPaid(e.target.value)
            }
            className="h-12 rounded-2xl"
          />
        </div>

        <div>
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Payment Method
          </Label>

          <Input
            placeholder="Cash / Transfer / POS"
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="h-12 rounded-2xl"
          />
        </div>

      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

        <h2 className="mb-5 text-lg font-semibold text-slate-800">
          Payment Summary
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <span className="text-slate-600">
              Total Amount
            </span>

            <strong className="text-lg">
              ₦{totalAmount.toLocaleString()}
            </strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">
              Amount Paid
            </span>

            <strong className="text-lg">
              ₦{Number(amountPaid || 0).toLocaleString()}
            </strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">
              Balance
            </span>

            <strong className="text-lg text-red-600">
              ₦{balance.toLocaleString()}
            </strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">
              Payment Status
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                paymentStatus === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {paymentStatus}
            </span>
          </div>

        </div>

      </div>

      <div>
        <Label className="mb-2 block text-sm font-semibold text-slate-700">
          Notes
        </Label>

        <Textarea
          rows={5}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Optional notes..."
          className="rounded-2xl"
        />
      </div>

      <Button
        onClick={saveSale}
        disabled={saving}
        className="h-12 w-full rounded-2xl bg-green-600 text-base font-semibold hover:bg-green-700"
      >
        {saving ? "Saving..." : "Save Sale"}
      </Button>

    </div>
  );
}