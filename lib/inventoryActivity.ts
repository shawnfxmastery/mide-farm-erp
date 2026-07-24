import { supabase } from "@/lib/supabase";

export async function logInventoryActivity(
  type: "Production" | "Sale",
  crates: number,
  pieces: number = 0,
  reference?: string
) {
  const { data, error } = await supabase
    .from("inventory_activity")
    .insert({
      type,
      crates,
      pieces,
      reference,
    })
    .select();

  console.log("Inventory Activity Result:", { data, error });

  if (error) throw error;

  return data;
}