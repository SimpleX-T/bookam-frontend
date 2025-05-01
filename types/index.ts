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
