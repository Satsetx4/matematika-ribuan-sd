import { afterEach, describe, expect, it, vi } from 'vitest';
import { safeParseJson } from './storage';

afterEach(() => vi.restoreAllMocks());

describe('safe JSON storage parsing', () => {
  it('returns parsed data for valid JSON', () => {
    expect(safeParseJson('{"stars":2}', { stars: 0 })).toEqual({ stars: 2 });
  });

  it('uses the fallback for corrupted JSON without throwing', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    expect(safeParseJson('{not valid', { stars: 0 })).toEqual({ stars: 0 });
  });
});
