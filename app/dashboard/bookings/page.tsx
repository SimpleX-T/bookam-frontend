"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { BookingDetails } from "@/types";

// Dummy data
const bookings: BookingDetails[] = [
  {
    bookingId: "BK-001-2024",
    busId: "BUS-001",
    routeId: "RT-LAG-ABJ-001",
    userId: "USR-001",
    seatNumber: "A1",
    completed: true,
    checkedIn: true,
    createdAt: "2024-04-01T10:00:00Z",
  },
  {
    bookingId: "BK-002-2024",
    busId: "BUS-003",
    routeId: "RT-LAG-IBD-002",
    userId: "USR-015",
    seatNumber: "B3",
    completed: false,
    checkedIn: false,
    createdAt: "2024-04-02T11:30:00Z",
  },
  // Add more dummy bookings...
];

export default function BookingsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Bookings Management
        </h1>
      </div>
      <DataTable columns={columns} data={bookings} />
    </div>
  );
}
