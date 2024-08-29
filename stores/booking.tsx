import { StateCreator } from "zustand";
import { BookingSlice } from "@/stores/types";

export const createBookingSlice: StateCreator<BookingSlice> = (set) => ({
  totalPrice: 0,
  selectedDays: 0,
  pickupLocation: null,
  setPickupLocation: (value) => set(() => ({ pickupLocation: value })),
  dropoffLocation: null,
  setDropOffLocation: (value) => set(() => ({ dropoffLocation: value })),
  vehicleType: null,
  setVehicleType: (value) => set(() => ({ vehicleType: value })),
  pickupDate: null,
  setPickupDate: (value) => set(() => ({ pickupDate: value })),
  pickupTime: null,
  setPickupTime: (value) => set(() => ({ pickupTime: value })),
  dropoffDate: null,
  setDropOffDate: (value) => set(() => ({ dropoffDate: value })),
  dropoffTime: null,
  setDropOffTime: (value) => set(() => ({ dropoffTime: value })),
  selectedVehicle: null,
  setSelectedVehicle: (value) => set(() => ({ selectedVehicle: value })),
  selectedInsurance: null,
  setSelectedInsurance: (value) => set(() => ({ selectedInsurance: value })),
  selectedAddons: [],
  addAddon: (value) =>
    set((state) => ({ selectedAddons: [...state.selectedAddons, value] })),
  deleteAddon: (value) =>
    set((state) => ({
      selectedAddons: state.selectedAddons.filter(
        (addon) => addon.id !== value.id,
      ),
    })),
  setSelectedAddons: (value) => set(() => ({ selectedAddons: value })),
  setSelectedDays: (value) => set(() => ({ selectedDays: value })),
  calculatePrice: () =>
    set((state) => {
      const {
        pickupDate,
        dropoffDate,
        selectedVehicle,
        selectedAddons,
        selectedInsurance,
      } = state;

      if (!pickupDate || !dropoffDate || !selectedVehicle) {
        return { totalPrice: 0 };
      }

      const addonsPrice = selectedAddons.reduce(
        (total, addon) => total + addon.price,
        0,
      );
      const vehiclePrice = selectedVehicle.price * state.selectedDays;
      const insurancePrice = selectedInsurance ? selectedInsurance.price : 0;
      const totalAddonPrice = addonsPrice * state.selectedDays;

      const totalPrice = vehiclePrice + insurancePrice + totalAddonPrice;

      return { totalPrice };
    }),
});
