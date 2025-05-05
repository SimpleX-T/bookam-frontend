"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { BookingDetails } from "@/types";
import { useApp } from "@/contexts/app-context";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingsPage() {
  const { bookings, bookingsLoading } = useApp();

  if (bookingsLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Bookings Management
        </h1>
      </div>
      <DataTable
        columns={columns}
        data={bookings}
        // searchColumn="bookingId"
        // searchPlaceholder="Search by booking ID..."
      />
    </div>
  );
}
