import { supabase } from "@/lib/supabase";
import {
  receiveProduction,
  reverseProduction,
} from "./inventory";

export type ProductionInput = {
  date: string;
  birds: number;
  crates: number;
  pieces: number;
  brokenEggs: number;
  mortality: number;
  note?: string;
};

export async function createProduction(
  production: ProductionInput
) {
  const { data, error } = await supabase
    .from("egg_production")
    .insert({
      date: production.date,
      birds: production.birds,
      crates: production.crates,
      pieces: production.pieces,
      broken_eggs: production.brokenEggs,
      mortality: production.mortality,
      note: production.note,
    })
    .select()
    .single();

  if (error) throw error;

  await receiveProduction(
    production.crates,
    production.pieces
  );

  return data;
}

export async function deleteProduction(
  id: number
) {
  const { data, error } = await supabase
    .from("egg_production")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  await reverseProduction(
    data.crates,
    data.pieces
  );

  await supabase
    .from("inventory_activity")
    .delete()
    .match({
      type: "Production",
      crates: data.crates,
      pieces: data.pieces,
    });

  const { error: deleteError } = await supabase
    .from("egg_production")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;
}

export async function updateProduction(
  id: number,
  production: ProductionInput
) {
  const { data: oldRecord, error } = await supabase
    .from("egg_production")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  // Reverse previous inventory
  await reverseProduction(
    oldRecord.crates,
    oldRecord.pieces
  );

  // Save new values
  const { error: updateError } = await supabase
    .from("egg_production")
    .update({
      date: production.date,
      birds: production.birds,
      crates: production.crates,
      pieces: production.pieces,
      broken_eggs: production.brokenEggs,
      mortality: production.mortality,
      note: production.note,
    })
    .eq("id", id);

  if (updateError) throw updateError;

  // Apply new inventory
  await receiveProduction(
    production.crates,
    production.pieces
  );
}