import { format, addDays } from "date-fns";
import { DateInfo, Route } from "@/types";

export const generateDates = (startDate: Date, count: number): DateInfo[] => {
  const dates: DateInfo[] = [];
  for (let i = 0; i < count; i++) {
    const currentDate = addDays(startDate, i);
    dates.push({
      day: format(currentDate, "EEE"),
      date: format(currentDate, "d MMM"),
      fullDate: currentDate,
    });
  }
  return dates;
};

export interface LocationOption {
  value: string;
  label: string;
}

export function extractUniqueLocations(routes: Route[]): LocationOption[] {
  // Create a Set to store unique location names
  const uniqueLocations = new Set<string>();

  // Iterate through all routes and add origins and destinations to the Set
  routes.forEach((route) => {
    uniqueLocations.add(route.origin);
    uniqueLocations.add(route.destination);
  });

  // Convert the Set to an array of location objects with value and label
  const locationOptions: LocationOption[] = Array.from(uniqueLocations)
    .map((location) => ({
      value: location.toLowerCase(),
      label: location, // Preserving original case for the label
    }))
    .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

  return locationOptions;
}
