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
  await deductInventory(crates, pieces);

  await logInventoryActivity(
    "Sale",
    -crates,
    -pieces,
    customer
  );
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
  throw new Error("clearInventory is not implemented.");
}

export async function currentInventory() {
  return await getInventory();
}