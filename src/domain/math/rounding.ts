export type RoundingPlace = 10 | 100 | 1000;

export function roundToPlace(value: number, place: RoundingPlace): number {
  if (!Number.isSafeInteger(value) || value < 0 || value > 9999) {
    throw new RangeError('Value must be a whole number between 0 and 9,999.');
  }
  return Math.floor((value + place / 2) / place) * place;
}

export function getRoundingDigit(value: number, place: RoundingPlace): number {
  if (!Number.isSafeInteger(value) || value < 0 || value > 9999) {
    throw new RangeError('Value must be a whole number between 0 and 9,999.');
  }
  return Math.floor(value / (place / 10)) % 10;
}
