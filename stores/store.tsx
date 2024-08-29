import { BookingSlice, GeneralSlice } from "@/stores/types";
import { create } from "zustand";
import { createGeneralSlice } from "@/stores/general";
import { createBookingSlice } from "@/stores/booking";
import { persist, createJSONStorage } from "zustand/middleware";
export interface AppState extends GeneralSlice, BookingSlice {}
export const useBoundStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createGeneralSlice(...a),
      ...createBookingSlice(...a),
    }),
    {
      name: "elatus-rent-next",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
