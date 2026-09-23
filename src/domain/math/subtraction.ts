export type PlaceName = 'satuan' | 'puluhan' | 'ratusan' | 'ribuan';

export interface BorrowTransfer {
  from: PlaceName;
  to: PlaceName;
  digits: number[];
}

export interface SubtractionColumnStep {
  place: PlaceName;
  topDigit: number;
  bottomDigit: number;
  resultDigit: number;
  digitsAfterBorrow: number[];
  borrowTransfers: BorrowTransfer[];
}

export interface SubtractionExplanation {
  minuend: number;
  subtrahend: number;
  result: number;
  initialDigits: number[];
  steps: SubtractionColumnStep[];
}

const PLACES_LOW_TO_HIGH: PlaceName[] = ['satuan', 'puluhan', 'ratusan', 'ribuan'];

function getDigitsLowToHigh(value: number): number[] {
  return [value % 10, Math.floor(value / 10) % 10, Math.floor(value / 100) % 10, Math.floor(value / 1000) % 10];
}

function getDigitsHighToLow(digits: number[]): number[] {
  return [...digits].reverse();
}

function validateNumber(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value < 0 || value > 9999) {
    throw new RangeError(`${label} must be a whole number between 0 and 9,999.`);
  }
}

/** Builds the written borrowing steps from ones to thousands without negative digits. */
export function explainSubtraction(minuend: number, subtrahend: number): SubtractionExplanation {
  validateNumber(minuend, 'Minuend');
  validateNumber(subtrahend, 'Subtrahend');
  if (minuend < subtrahend) {
    throw new RangeError('Minuend must be greater than or equal to subtrahend.');
  }

  const working = getDigitsLowToHigh(minuend);
  const bottom = getDigitsLowToHigh(subtrahend);
  const initialDigits = getDigitsHighToLow(working);
  const steps: SubtractionColumnStep[] = [];

  for (let column = 0; column < PLACES_LOW_TO_HIGH.length; column += 1) {
    const borrowTransfers: BorrowTransfer[] = [];

    if (working[column] < bottom[column]) {
      let donor = column + 1;
      while (donor < working.length && working[donor] === 0) donor += 1;
      if (donor >= working.length) {
        throw new Error(`No non-zero digit is available to lend to the ${PLACES_LOW_TO_HIGH[column]} column.`);
      }

      working[donor] -= 1;
      working[donor - 1] += 10;
      borrowTransfers.push({
        from: PLACES_LOW_TO_HIGH[donor],
        to: PLACES_LOW_TO_HIGH[donor - 1],
        digits: getDigitsHighToLow(working),
      });

      for (let position = donor - 1; position > column; position -= 1) {
        working[position] -= 1;
        working[position - 1] += 10;
        borrowTransfers.push({
          from: PLACES_LOW_TO_HIGH[position],
          to: PLACES_LOW_TO_HIGH[position - 1],
          digits: getDigitsHighToLow(working),
        });
      }
    }

    const topDigit = working[column];
    steps.push({
      place: PLACES_LOW_TO_HIGH[column],
      topDigit,
      bottomDigit: bottom[column],
      resultDigit: topDigit - bottom[column],
      digitsAfterBorrow: getDigitsHighToLow(working),
      borrowTransfers,
    });
  }

  return {
    minuend,
    subtrahend,
    result: minuend - subtrahend,
    initialDigits,
    steps,
  };
}
