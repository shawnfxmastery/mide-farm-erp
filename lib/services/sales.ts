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
  // Only the additional quantity needs checking. The original sale is
  // already included in current inventory, so reducing it always adds stock back.
  const { data: existingSale, error: existingSaleError } =
    await supabase
      .from("egg_sales")
      .select("crates,pieces")
      .eq("id", id)
      .single();

  if (existingSaleError) throw existingSaleError;

  const existingEggs =
    Number(existingSale.crates ?? 0) * 30 +
    Number(existingSale.pieces ?? 0);
  const newEggs = sale.crates * 30;
  const additionalEggs = newEggs - existingEggs;

  if (additionalEggs > 0) {
    await checkInventory(0, additionalEggs);
  }

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
