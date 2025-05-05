"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Booking } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { SeatIcon } from "@/components/icons/seat-icon";
import { renderStatusBadge } from "@/lib/statusBadge";

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "bookingId",
    header: "ID",
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user[0];
      return (
        <div className="flex flex-col">
          <span className="font-medium">{user.userName}</span>
          {user.phone && (
            <span className="text-xs text-muted-foreground">{user.phone}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "bus",
    header: "Bus Details",
    cell: ({ row }) => {
      const bus = row.original.bus[0];
      return (
        <div className="flex flex-col">
          <span className="font-medium">{bus.busNumber}</span>
          {bus.busModel && (
            <span className="text-xs text-muted-foreground">
              {bus.busModel}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "routes",
    header: "Route Details",
    cell: ({ row }) => {
      const route = row.original.routes[0];
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {route.origin} → {route.destination}
          </span>
          <span className="text-xs text-muted-foreground">
            {route.duration} • {route.description}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "seatNumber",
    header: "Seat",
    cell: ({ row }) => (
      <SeatIcon className="h-8 w-8 text-primary/70">
        {row.original.seatNumber}
      </SeatIcon>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const completed = row.original.completed;
      const checkedIn = row.original.checkedIn;

      return (
        <div className="flex w-[100px] items-center">
          {completed
            ? renderStatusBadge("completed")
            : checkedIn
            ? renderStatusBadge("checked-in")
            : renderStatusBadge("pending")}
        </div>
      );
    },
  },
  {
    accessorKey: "bookingDate",
    header: "Booking Date",
    cell: ({ row }) => {
      const date = new Date(row.original.bookingDate);
      return format(date, "PPp");
    },
  },
];
