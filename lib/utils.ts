import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function getOrdinalDay(day: number): string {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export function formatDateString(dateString: string): string {
  const parsedDate = parseISO(dateString);
  const dayWithSuffix = getOrdinalDay(parsedDate.getDate());
  const month = format(parsedDate, "MMMM");
  const time = format(parsedDate, "hh:mm a");
  return `${dayWithSuffix} ${month} - ${time}`;
}

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function formatDateToDayHourMinute(isoString: string): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

export function capitalizeText(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function extractNumberFromKey(key: string): number | null {
  const match = key.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function generateRouteId(
  origin: string,
  destination: string,
  date: string
): string {
  const originCode = origin.slice(0, 3).toUpperCase();
  const destCode = destination.slice(0, 3).toUpperCase();
  const dateCode = new Date(date).getTime().toString().slice(-4);
  return `RT-${originCode}-${destCode}-${dateCode}`;
}

export function generateBusNumber(
  routeId: string,
  busModel: string,
  departureTime: string
): string {
  const modelCode = busModel.split(" ")[0].slice(0, 3).toUpperCase();
  const timeCode = new Date(departureTime).getTime().toString().slice(-4);
  return `${modelCode}-${timeCode}`;
}
