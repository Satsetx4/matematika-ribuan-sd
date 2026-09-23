export type Place = 'thousands' | 'hundreds' | 'tens' | 'ones';

const PLACE_FACTORS: Record<Place, number> = {
  thousands: 1000,
  hundreds: 100,
  tens: 10,
  ones: 1,
};

export function getDigitAtPlace(value: number, place: Place): number {
  if (!Number.isSafeInteger(value) || value < 0 || value > 9999) {
    throw new RangeError('Value must be a whole number between 0 and 9,999.');
  }
  return Math.floor(value / PLACE_FACTORS[place]) % 10;
}

export function getPlaceValue(value: number, place: Place): number {
  return getDigitAtPlace(value, place) * PLACE_FACTORS[place];
}
