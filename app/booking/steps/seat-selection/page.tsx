import type { Metadata } from "next";
import SeatSelectionClientPage from "./SeatSelectionClientPage";

export const metadata: Metadata = {
  title: "Seat Selection | bookAM",
  description: "Select your preferred seats for your journey",
};

export default function SeatSelectionPage() {
  return <SeatSelectionClientPage />;
}
