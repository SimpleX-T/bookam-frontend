"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Bus } from "@/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export const columns: ColumnDef<Bus>[] = [
  {
    accessorKey: "busId",
    header: "Bus ID",
  },
  {
    accessorKey: "busNumber",
    header: "Bus Number",
  },
  {
    accessorKey: "routeId",
    header: "Route ID",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "departureTime",
    header: "Departure",
    cell: ({ row }) => {
      return format(new Date(row.getValue("departureTime")), "HH:mm");
    },
  },
  {
    accessorKey: "arrivalTime",
    header: "Arrival",
    cell: ({ row }) => {
      return format(new Date(row.getValue("arrivalTime")), "HH:mm");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
