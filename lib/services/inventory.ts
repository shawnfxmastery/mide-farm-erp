import {
  addInventory,
  deductInventory,
  getInventory,
} from "@/lib/inventory";

import { logInventoryActivity } from "@/lib/inventoryActivity";

export async function receiveProduction(
  crates: number,
  pieces: number
) {
  await addInventory(crates, pieces);

  await logInventoryActivity(
    "Production",
    crates,
    pieces
  );
}

export async function sellEggs(
  crates: number,
  pieces: number,
  customer?: string
) {
  const inventory = await getInventory();

  const totalAvailable =
    inventory.crates * 30 + inventory.pieces;

  const totalRequested =
    crates * 30 + pieces;

  if (totalRequested > totalAvailable) {
    throw new Error(
      "Not enough eggs available in inventory."
    );
  }

  await deductInventory(crates, pieces);

  await logInventoryActivity(
    "Sale",
    -crates,
    -pieces,
    customer
  );

  const updatedInventory = await getInventory();

  if (updatedInventory.crates < 20) {
    console.warn(
      "⚠ Low egg inventory. Remaining:",
      updatedInventory.crates,
      "crates"
    );
  }
}

export async function reverseProduction(
  crates: number,
  pieces: number
) {
  await deductInventory(crates, pieces);
}

export async function reverseSale(
  crates: number,
  pieces: number
) {
  await addInventory(crates, pieces);
}

export async function clearInventory() {
  throw new Error(
    "clearInventory is not implemented yet."
  );
}

export async function currentInventory() {
  return await getInventory();
}

export async function inventoryHealth() {
  const inventory = await getInventory();

  return {
    crates: inventory.crates,
    pieces: inventory.pieces,
    totalEggs:
      inventory.crates * 30 + inventory.pieces,
    lowStock: inventory.crates < 20,
    outOfStock:
      inventory.crates === 0 &&
      inventory.pieces === 0,
  };
}