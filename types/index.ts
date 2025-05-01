export interface Route {
  id: number;
  from: string;
  to: string;
  price: number;
  duration: string;
  departureTime: string;
  transportType: string;
  stops: string[];
  availableSeats: number;
  image: string;
}

// Define types for the data models from API
export interface Bus {
  busId: number;
  routeId: number;
  busNumber: string | null;
  capacity: number;
  departureTime: string; // ISO datetime string
  arrivalTime: string; // ISO datetime string
}

// Define search parameters for routes
export interface RouteSearchParams {
  origin?: string;
  destination?: string;
}
