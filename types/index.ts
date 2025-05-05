export interface Route {
  routeId: string;
  origin: string;
  destination: string;
  price: number;
  duration: string;
  image: string;
  description: string;
  distance: string;
  buses: Bus[];
}

// Define types for the data models from API
export interface Bus {
  busId: string;
  routeId: string | number;
  routes: Route[];
  busNumber: string | null;
  busModel: string;
  capacity: number;
  seatsRemaining: number;
  bookedSeats: number[];
  availableSeats: number[];
  departureTime: string;
  arrivalTime: string;
}

export interface BookingDetails {
  bookingId: string;
  busId: string;
  routeId: string;
  userId: string;
  seatNumber: string;
  completed: boolean;
  checkedIn: boolean;
  createdAt: string;
}

// Define search parameters for routes
export interface RouteSearchParams {
  origin?: string;
  destination?: string;
}

export interface BusRoute {
  id: string;
  company: string;
  logo: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  available_seats: number;
  originCity: string;
  destinationCity: string;
}

export interface DateInfo {
  day: string;
  date: string;
  fullDate: Date;
}

export interface AppliedFilters {
  price: number[];
  stops: number[];
  sortBy: "lowest" | "highest" | null;
}

export type SeatStatus = "available" | "occupied" | "selected";

export interface Seat {
  id: string;
  status: SeatStatus;
  price: number;
  type: "standard" | "premium" | "business";
}

export interface BookingFormData {
  from: string;
  to: string;
  date: Date | undefined;
  returnDate: Date | undefined;
  passengers: number;
  name: string;
  email: string;
  phone: string;
  organization: string;
  specialRequests: string;
}

export interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {
  preventDefault: () => void;
}
