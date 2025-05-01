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
