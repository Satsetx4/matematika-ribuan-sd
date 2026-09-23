import { describe, expect, it } from 'vitest';
import { addNumbers } from './addition';
import { compareNumbers } from './comparison';
import { getDigitAtPlace, getPlaceValue } from './placeValue';
import { getRoundingDigit, roundToPlace } from './rounding';
import { explainSubtraction } from './subtraction';
import { validateBoundedIntegerInput } from './numericInput';

describe('place value', () => {
  it('reads each digit and its value from a four-digit number', () => {
    expect(getDigitAtPlace(4782, 'thousands')).toBe(4);
    expect(getPlaceValue(4782, 'hundreds')).toBe(700);
    expect(getPlaceValue(4782, 'tens')).toBe(80);
    expect(getPlaceValue(4782, 'ones')).toBe(2);
  });
});

describe('comparison', () => {
  it('returns the correct ordering', () => {
    expect(compareNumbers(1978, 3250)).toBe(-1);
    expect(compareNumbers(2470, 2470)).toBe(0);
    expect(compareNumbers(4005, 2750)).toBe(1);
  });
});

describe('rounding', () => {
  it('rounds to tens, hundreds, and thousands with 4 down and 5 up', () => {
    expect(roundToPlace(1234, 10)).toBe(1230);
    expect(roundToPlace(1235, 10)).toBe(1240);
    expect(roundToPlace(1249, 100)).toBe(1200);
    expect(roundToPlace(1250, 100)).toBe(1300);
    expect(getRoundingDigit(4449, 1000)).toBe(4);
    expect(getRoundingDigit(4500, 1000)).toBe(5);
    expect(roundToPlace(4449, 1000)).toBe(4000);
    expect(roundToPlace(4500, 1000)).toBe(5000);
  });
});

describe('addition and subtraction', () => {
  it('adds numbers within the lesson range', () => {
    expect(addNumbers(2346, 1527)).toBe(3873);
  });

  it('subtracts without borrowing and with one-column borrowing', () => {
    expect(explainSubtraction(7642, 3211).result).toBe(4431);
    const oneBorrow = explainSubtraction(2345, 1228);
    expect(oneBorrow.result).toBe(1117);
    expect(oneBorrow.steps[0].borrowTransfers).toHaveLength(1);
  });

  it('shows each non-negative digit transformation when borrowing crosses zero columns', () => {
    const example8500 = explainSubtraction(8500, 1375);
    expect(example8500.result).toBe(7125);
    expect(example8500.steps[0].borrowTransfers.map((transfer) => transfer.digits)).toEqual([
      [8, 4, 10, 0],
      [8, 4, 9, 10],
    ]);

    const example5000 = explainSubtraction(5000, 2786);
    expect(example5000.result).toBe(2214);
    expect(example5000.steps[0].digitsAfterBorrow).toEqual([4, 9, 9, 10]);

    const example7002 = explainSubtraction(7002, 1548);
    expect(example7002.result).toBe(5454);
    expect(example7002.steps[0].digitsAfterBorrow).toEqual([6, 9, 9, 12]);
    expect(example7002.steps.every((step) => step.topDigit >= step.bottomDigit)).toBe(true);
  });
});

describe('numeric input validation', () => {
  it('keeps blank drafts empty and gives clear errors for invalid or out-of-range values', () => {
    expect(validateBoundedIntegerInput('', 1000, 9999)).toMatchObject({ valid: false });
    expect(validateBoundedIntegerInput('12.5', 1000, 9999)).toMatchObject({ valid: false });
    expect(validateBoundedIntegerInput('999', 1000, 9999)).toMatchObject({ valid: false });
    expect(validateBoundedIntegerInput('2500', 1000, 9999)).toEqual({ valid: true, value: 2500 });
  });
});
