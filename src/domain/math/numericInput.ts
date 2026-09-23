export type NumericInputResult =
  | { valid: true; value: number }
  | { valid: false; message: string };

export function validateBoundedIntegerInput(rawValue: string, min: number, max: number): NumericInputResult {
  if (rawValue.trim() === '') {
    return { valid: false, message: 'Masukkan sebuah angka.' };
  }

  if (!/^\d+$/.test(rawValue.trim())) {
    return { valid: false, message: 'Gunakan angka bulat tanpa tanda atau koma.' };
  }

  const value = Number(rawValue);
  if (!Number.isSafeInteger(value)) {
    return { valid: false, message: 'Angka terlalu besar.' };
  }
  if (value < min || value > max) {
    return { valid: false, message: `Masukkan angka dari ${min.toLocaleString('id-ID')} sampai ${max.toLocaleString('id-ID')}.` };
  }

  return { valid: true, value };
}
