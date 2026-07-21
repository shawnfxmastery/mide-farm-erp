"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewSaleForm() {
  const router = useRouter();

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [customer, setCustomer] = useState("");

  const [crates, setCrates] = useState("");

  const [pricePerCrate, setPricePerCrate] =
    useState("");

  const [amountPaid, setAmountPaid] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

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

    const { error } = await supabase
      .from("egg_sales")
      .insert({
        date,
        customer,
        crates: Number(crates),
        price_per_crate: Number(pricePerCrate),
        total_amount: totalAmount,
        amount_paid: Number(amountPaid) || 0,
        balance,
        payment_status: paymentStatus,
        payment_method: paymentMethod,
        notes,
      });

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Sale recorded successfully");

    router.push("/dashboard-v2/sales");

    router.refresh();
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold">
        Record Egg Sale
      </h1>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <Label>Date</Label>

          <Input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />
        </div>

        <div>
          <Label>Customer</Label>

          <Input
            placeholder="Customer name"
            value={customer}
            onChange={(e) =>
              setCustomer(e.target.value)
            }
          />
        </div>

        <div>
          <Label>Crates Sold</Label>

          <Input
            type="number"
            value={crates}
            onChange={(e) =>
              setCrates(e.target.value)
            }
          />
        </div>

        <div>
          <Label>Price Per Crate</Label>

          <Input
            type="number"
            value={pricePerCrate}
            onChange={(e) =>
              setPricePerCrate(e.target.value)
            }
          />
        </div>

        <div>
          <Label>Amount Paid</Label>

          <Input
            type="number"
            value={amountPaid}
            onChange={(e) =>
              setAmountPaid(e.target.value)
            }
          />
        </div>

        <div>
          <Label>Payment Method</Label>

          <Input
            placeholder="Cash / Transfer / POS"
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
        </div>

      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-6">

        <div className="flex justify-between py-2">
          <span>Total Amount</span>

          <strong>
            ₦{totalAmount.toLocaleString()}
          </strong>
        </div>

        <div className="flex justify-between py-2">
          <span>Amount Paid</span>

          <strong>
            ₦{Number(amountPaid || 0).toLocaleString()}
          </strong>
        </div>

        <div className="flex justify-between py-2">
          <span>Balance</span>

          <strong>
            ₦{balance.toLocaleString()}
          </strong>
        </div>

        <div className="flex justify-between py-2">
          <span>Status</span>

          <strong>{paymentStatus}</strong>
        </div>

      </div>

      <div className="mt-8">
        <Label>Notes</Label>

        <Textarea
          rows={4}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={saveSale}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Sale"}
        </Button>
      </div>
    </Card>
  );
}