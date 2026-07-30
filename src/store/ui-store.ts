"use client";

import { create } from "zustand";

type UiState = {
  dashboardMenuOpen: boolean;
  setDashboardMenuOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  dashboardMenuOpen: false,
  setDashboardMenuOpen: (dashboardMenuOpen) => set({ dashboardMenuOpen }),
}));
