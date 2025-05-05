import { clsx, type ClassValue } from "clsx";
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

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
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