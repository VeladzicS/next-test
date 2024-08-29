import { CarCardDataType } from "@/components/home-page/featured-vehicles";
import { InsuranceData } from "@/components/reservation-steps/step-two/insurance-swiper";
import { Addon } from "@/components/reservation-steps/step-two/single-addon";

type InnsuranceItem = {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
};

export type GeneralSlice = {
  isMobileMenuOpen: boolean;
  toggleIsMobileMenuOpen: () => void;
  isReservationWidgetOpen: boolean;
  toggleIsReservationWidgetOpen: () => void;
  setIsMobileMenuOpen: (value: boolean) => void;
  setIsReservationWidgetOpen: (value: boolean) => void;
  selectedCurrency: string;
  setSelectedCurrency: (value: string) => void;
};

export type BookingSlice = {
  pickupLocation: string | null;
  setPickupLocation: (value: string) => void;
  dropoffLocation: string | null;
  setDropOffLocation: (value: string) => void;
  vehicleType: string | null;
  setVehicleType: (value: string) => void;
  pickupDate: Date | null;
  setPickupDate: (value: Date) => void;
  pickupTime: string | null;
  setPickupTime: (value: string) => void;
  dropoffDate: Date | null;
  setDropOffDate: (value: Date) => void;
  dropoffTime: string | null;
  setDropOffTime: (value: string) => void;
  selectedVehicle: CarCardDataType | null;
  setSelectedVehicle: (value: CarCardDataType) => void;
  selectedInsurance: InnsuranceItem | null;
  setSelectedInsurance: (value: InnsuranceItem) => void;
  selectedAddons: Addon[];
  addAddon: (value: Addon) => void;
  deleteAddon: (value: Addon) => void;
  setSelectedAddons: (value: Addon[]) => void;
  totalPrice: number;
  selectedDays: number;
  setSelectedDays: (value: number) => void;
  calculatePrice: () => void;
};
