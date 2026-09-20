// Utility for safe defensive localStorage operations (survives Safari Private, Sandboxed iframes, etc.)

export const STORAGE_KEYS = {
  THEME: 'math_theme',
  STARS: 'math_stars',
  ACTIVE_TAB: 'math_active_tab',
} as const;

export function safeGetItem(key: string, fallback: string | null = null): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const value = window.localStorage.getItem(key);
    return value !== null ? value : fallback;
  } catch (err) {
    console.warn(`[Storage] Failed to read key "${key}":`, err);
    return fallback;
  }
}

export function safeSetItem(key: string, value: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[Storage] Failed to write key "${key}":`, err);
    return false;
  }
}

export function safeRemoveItem(key: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.warn(`[Storage] Failed to remove key "${key}":`, err);
    return false;
  }
}

export function clearAllAppData(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.removeItem(STORAGE_KEYS.STARS);
    window.localStorage.removeItem(STORAGE_KEYS.ACTIVE_TAB);
    // Note: We deliberately preserve user's theme preference unless they want dark reset
    return true;
  } catch (err) {
    console.warn('[Storage] Failed to clear app data:', err);
    return false;
  }
}
