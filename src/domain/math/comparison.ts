export function compareNumbers(left: number, right: number): -1 | 0 | 1 {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new RangeError('Values must be finite numbers.');
  }
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}
