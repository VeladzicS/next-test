import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import en from "date-fns/locale/en-US";
import hr from "date-fns/locale/hr";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const localeMap: { [key: string]: any } = {
  en: en,
  hr: hr,
};

export const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push(timeString);
    }
  }
  return times;
};

export const formatPrice = (price: number, locale: string = "en-US") => {
  return new Intl.NumberFormat(locale, {
    // style: "currency",
    // currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// utils/dateFormatter.js

export function formatDateIntl(
  date: string | number | Date | null,
  formatter: any,
): string {
  if (!date) return "";

  const formattedDate = formatter.dateTime(new Date(date), {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return formattedDate.replace(/\s+/g, "");
}
