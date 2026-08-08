import { supabase } from "@/lib/supabase";
import { recalculateInventory } from "./recalculateInventory";
import { checkInventory } from "@/lib/inventory";

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
  // Check inventory BEFORE creating the sale.
  // This prevents selling eggs that have not
  // been recorded as production yet.
  await checkInventory(sale.crates);

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

  // Recalculate inventory after the sale.
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

  // Recalculate inventory after editing the sale.
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

  // Recalculate inventory after deleting the sale.
  // The deleted crates will therefore become available again.
  await recalculateInventory();
}