export interface Route {
  id: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  image: string;
  description: string;
  distance: string;
  departureTime: string;
  arrivalTime: string;
  stops: string[];
  fromLocation: string;
  toLocation: string;
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
