export function formatEggQuantity(
  crates: number,
  pieces: number,
  eggsPerCrate = 30
) {
  const extraCrates = Math.floor(pieces / eggsPerCrate);
  const remainingPieces = pieces % eggsPerCrate;

  const totalCrates = crates + extraCrates;

  return {
    crates: totalCrates,
    pieces: remainingPieces,
    display:
      remainingPieces > 0
        ? `${totalCrates.toLocaleString()} Crates + ${remainingPieces.toLocaleString()} Pieces`
        : `${totalCrates.toLocaleString()} Crates`,
  };
}