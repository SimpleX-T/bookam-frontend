"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BookingDetails } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const columns: ColumnDef<BookingDetails>[] = [
  {
    accessorKey: "bookingId",
    header: "Booking ID",
  },
  {
    accessorKey: "busId",
    header: "Bus ID",
  },
  {
    accessorKey: "routeId",
    header: "Route",
  },
  {
    accessorKey: "seatNumber",
    header: "Seat",
  },
  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row }) => {
      const completed = row.getValue("completed");
      const checkedIn = row.original.checkedIn;

      return (
        <div className="flex w-[100px] items-center">
          {completed ? (
            <Badge className="bg-green-500">Completed</Badge>
          ) : checkedIn ? (
            <Badge className="bg-blue-500">Checked In</Badge>
          ) : (
            <Badge variant="outline">Pending</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Booking Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return format(date, "PPp");
    },
  },
];
