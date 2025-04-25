import type { Metadata } from "next"
import SeatSelectionClientPage from "./SeatSelectionClientPage"

export const metadata: Metadata = {
  title: "Seat Selection | N-Journey",
  description: "Select your preferred seats for your journey",
}

export default function SeatSelectionPage() {
  return <SeatSelectionClientPage />
}
