function validateOperand(value: number): void {
  if (!Number.isSafeInteger(value) || value < 0 || value > 9999) {
    throw new RangeError('Operands must be whole numbers between 0 and 9,999.');
  }
}

export function addNumbers(left: number, right: number): number {
  validateOperand(left);
  validateOperand(right);
  return left + right;
}
