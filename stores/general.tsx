import { StateCreator } from "zustand";
import { GeneralSlice } from "@/stores/types";

export const createGeneralSlice: StateCreator<GeneralSlice> = (set) => ({
  isMobileMenuOpen: false,
  toggleIsMobileMenuOpen: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setIsMobileMenuOpen: (value) => set(() => ({ isMobileMenuOpen: value })),
  isReservationWidgetOpen: false,
  toggleIsReservationWidgetOpen: () =>
    set((state) => ({
      isReservationWidgetOpen: !state.isReservationWidgetOpen,
    })),
  setIsReservationWidgetOpen: (value) =>
    set(() => ({ isReservationWidgetOpen: value })),
  selectedCurrency: "EUR",
  setSelectedCurrency: (value) => set(() => ({ selectedCurrency: value })),
});
