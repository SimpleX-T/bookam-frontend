import type { Metadata } from "next"
import MultiPassengerPageClient from "./MultiPassengerPageClient"

export const metadata: Metadata = {
  title: "Passenger Details | N-Journey",
  description: "Enter details for all passengers",
}

export default function MultiPassengerPage() {
  return <MultiPassengerPageClient />
}
