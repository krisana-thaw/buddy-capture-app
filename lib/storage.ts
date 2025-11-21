import { AppState } from "@/types";

const STORAGE_KEY = "buddy-capture-data";

export function saveToLocalStorage(data: AppState): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function loadFromLocalStorage(): AppState | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as AppState;
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function clearLocalStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
