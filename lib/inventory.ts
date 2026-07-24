import { supabase } from "@/lib/supabase";

const EGGS_PER_CRATE = 30;

export async function getInventory() {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) throw error;

  if (!data) {
    throw new Error("Inventory row not found.");
  }

  return data;
}

export async function updateInventory(
  crates: number,
  pieces: number
) {
  const { error } = await supabase
    .from("inventory")
    .update({
      crates,
      pieces,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) throw error;
}

export async function checkInventory(
  cratesNeeded: number,
  piecesNeeded: number = 0
) {
  const inventory = await getInventory();

  const availablePieces =
    inventory.crates * EGGS_PER_CRATE +
    inventory.pieces;

  const requiredPieces =
    cratesNeeded * EGGS_PER_CRATE +
    piecesNeeded;

  if (requiredPieces > availablePieces) {
    throw new Error(
      `Not enough inventory. Available: ${inventory.crates} crate(s) and ${inventory.pieces} piece(s).`
    );
  }

  return inventory;
}

export async function deductInventory(
  cratesSold: number,
  piecesSold: number = 0
) {
  const inventory = await checkInventory(
    cratesSold,
    piecesSold
  );

  const availablePieces =
    inventory.crates * EGGS_PER_CRATE +
    inventory.pieces;

  const remainingPieces =
    availablePieces -
    (cratesSold * EGGS_PER_CRATE + piecesSold);

  const newCrates = Math.floor(
    remainingPieces / EGGS_PER_CRATE
  );

  const newPieces =
    remainingPieces % EGGS_PER_CRATE;

  await updateInventory(newCrates, newPieces);

  return {
    crates: newCrates,
    pieces: newPieces,
  };
}

export async function addInventory(
  cratesAdded: number,
  piecesAdded: number = 0
) {
  const inventory = await getInventory();

  const totalPieces =
    inventory.crates * EGGS_PER_CRATE +
    inventory.pieces +
    cratesAdded * EGGS_PER_CRATE +
    piecesAdded;

  const newCrates = Math.floor(
    totalPieces / EGGS_PER_CRATE
  );

  const newPieces =
    totalPieces % EGGS_PER_CRATE;

  await updateInventory(newCrates, newPieces);

  return {
    crates: newCrates,
    pieces: newPieces,
  };
}