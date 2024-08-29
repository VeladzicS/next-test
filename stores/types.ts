

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
  selectedVehicle: any | null;
  setSelectedVehicle: (value: any) => void;
  selectedInsurance: InnsuranceItem | null;
  setSelectedInsurance: (value: InnsuranceItem) => void;
  selectedAddons: any[];
  addAddon: (value: any) => void;
  deleteAddon: (value: any) => void;
  setSelectedAddons: (value: any[]) => void;
  totalPrice: number;
  selectedDays: number;
  setSelectedDays: (value: number) => void;
  calculatePrice: () => void;
};
