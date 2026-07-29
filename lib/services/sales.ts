import { supabase } from "@/lib/supabase";
import {
  sellEggs,
  reverseSale,
} from "./inventory";

export type SaleInput = {
  date: string;
  customer: string;
  crates: number;
  pricePerCrate: number;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  paymentStatus: string;
  paymentMethod: string;
  notes: string;
};

export async function createSale(
  sale: SaleInput
) {
  // Deduct inventory first
  await sellEggs(
    sale.crates,
    0,
    sale.customer
  );

  const { data, error } = await supabase
    .from("egg_sales")
    .insert({
      date: sale.date,
      customer: sale.customer,
      crates: sale.crates,
      price_per_crate: sale.pricePerCrate,
      total_amount: sale.totalAmount,
      amount_paid: sale.amountPaid,
      balance: sale.balance,
      payment_status: sale.paymentStatus,
      payment_method: sale.paymentMethod,
      notes: sale.notes,
    })
    .select()
    .single();

  if (error) {
    // Roll back inventory
    await reverseSale(
      sale.crates,
      0
    );

    throw error;
  }

  return data;
}

export async function deleteSale(
  id: number
) {
  const { data, error } = await supabase
    .from("egg_sales")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  // Restore inventory
  await reverseSale(
    data.crates,
    0
  );

  // Remove inventory activity
  await supabase
    .from("inventory_activity")
    .delete()
    .match({
      type: "Sale",
      crates: -data.crates,
      pieces: 0,
      reference: data.customer,
    });

  const { error: deleteError } =
    await supabase
      .from("egg_sales")
      .delete()
      .eq("id", id);

  if (deleteError) throw deleteError;
}