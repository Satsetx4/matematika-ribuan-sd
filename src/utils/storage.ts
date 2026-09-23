// Utility for safe defensive localStorage operations (survives Safari Private, Sandboxed iframes, etc.)

export const STORAGE_KEYS = {
  THEME: 'math_theme',
  SOUND: 'math_sound',
  STARS: 'math_stars',
  ACTIVE_TAB: 'math_active_tab',
  PROGRESS: 'math_progress',
  QUIZ_SESSION: 'math_quiz_session',
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

export function safeGetJson<T>(key: string, fallback: T): T {
  const raw = safeGetItem(key);
  if (raw === null) return fallback;
  return safeParseJson(raw, fallback, key);
}

export function safeParseJson<T>(raw: string, fallback: T, context = 'stored data'): T {
  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[Storage] Failed to parse ${context}:`, err);
    return fallback;
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

export function clearLearningData(): boolean {
  const keys = [STORAGE_KEYS.STARS, STORAGE_KEYS.ACTIVE_TAB, STORAGE_KEYS.PROGRESS, STORAGE_KEYS.QUIZ_SESSION];
  return keys.map(safeRemoveItem).every(Boolean);
}
