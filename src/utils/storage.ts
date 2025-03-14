import type { MetaScanUIState } from "~/types";

const STORAGE_KEY = "meta-scan-ui-state";

export function readUIState(): MetaScanUIState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveUIState(state: MetaScanUIState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...state,
        extractedAt: new Date().toISOString(),
      })
    );
  } catch {}
}

export function removeUIState(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function initUIState(defaultState: MetaScanUIState): MetaScanUIState {
  const savedState = readUIState();
  return savedState || defaultState;
}
