// src/state/index.ts
import type { MetaScanUIState } from "../types";
import { logger } from "../utils/logger";

const STORAGE_KEY = "meta-scan-ui-state";

// Default state
const defaultState: MetaScanUIState = {
  position: "bottom-right",
  isOpen: false,
  theme: "auto",
  extractedAt: new Date().toISOString(),
};

// State management
class StateManager {
  private state: MetaScanUIState;
  private listeners: ((state: MetaScanUIState) => void)[] = [];

  constructor() {
    this.state = this.loadState() || defaultState;
  }

  private loadState(): MetaScanUIState | null {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      logger.error("Failed to load state:", err);
      return null;
    }
  }

  private saveState(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (err) {
      logger.error("Failed to save state:", err);
    }
  }

  getState(): MetaScanUIState {
    return { ...this.state };
  }

  updateState(updates: Partial<MetaScanUIState>): void {
    this.state = { ...this.state, ...updates };
    this.saveState();
    this.notifyListeners();
  }

  setEnableDisable(enabled: boolean): void {
    this.updateState({ lastEnableDisable: enabled });
  }

  getEnableDisable(): boolean {
    return this.state.lastEnableDisable ?? true;
  }

  subscribe(listener: (state: MetaScanUIState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.getState()));
  }
}

export const stateManager = new StateManager();
