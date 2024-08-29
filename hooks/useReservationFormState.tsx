import { useState } from "react";

export function useReservationFormState() {
  const [isPCalendarOpen, setIsPCalendarOpen] = useState(false);
  const [isDCalendarOpen, setIsDCalendarOpen] = useState(false);
  const [isDLocationOpen, setIsDLocationOpen] = useState(false);
  const [isPtimeOpen, setIsPtimeOpen] = useState(false);
  const [isDtimeOpen, setIsDtimeOpen] = useState(false);
  const [isNewLocation, setIsNewLocation] = useState(false);

  const togglePCalendarOpen = () => setIsPCalendarOpen((prev) => !prev);
  const toggleDCalendarOpen = () => setIsDCalendarOpen((prev) => !prev);
  const toggleDLocationOpen = () => setIsDLocationOpen((prev) => !prev);
  const togglePtimeOpen = () => setIsPtimeOpen((prev) => !prev);
  const toggleDtimeOpen = () => setIsDtimeOpen((prev) => !prev);
  const toggleNewLocation = () => setIsNewLocation((prev) => !prev);

  return {
    isPCalendarOpen,
    isDCalendarOpen,
    isDLocationOpen,
    isPtimeOpen,
    isDtimeOpen,
    isNewLocation,
    togglePCalendarOpen,
    toggleDCalendarOpen,
    toggleDLocationOpen,
    togglePtimeOpen,
    toggleDtimeOpen,
    toggleNewLocation,
  };
}
