import { supabase } from "@/lib/supabase";
import { recalculateInventory } from "./recalculateInventory";

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
  const { data, error } = await supabase
    .from("egg_sales")
    .insert({
      date: sale.date,
      customer: sale.customer,
      crates: sale.crates,
      pieces: 0,
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

  if (error) throw error;

  await recalculateInventory();

  return data;
}

export async function updateSale(
  id: number,
  sale: SaleInput
) {
  const { error } = await supabase
    .from("egg_sales")
    .update({
      date: sale.date,
      customer: sale.customer,
      crates: sale.crates,
      pieces: 0,
      price_per_crate: sale.pricePerCrate,
      total_amount: sale.totalAmount,
      amount_paid: sale.amountPaid,
      balance: sale.balance,
      payment_status: sale.paymentStatus,
      payment_method: sale.paymentMethod,
      notes: sale.notes,
    })
    .eq("id", id);

  if (error) throw error;

  await recalculateInventory();
}

export async function deleteSale(
  id: number
) {
  const { error } = await supabase
    .from("egg_sales")
    .delete()
    .eq("id", id);

  if (error) throw error;

  await recalculateInventory();
}