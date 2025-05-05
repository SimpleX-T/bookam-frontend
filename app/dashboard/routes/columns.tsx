"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Route } from "@/types"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import Image from "next/image"

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "routeId",
    header: "Route ID",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(price)
      return formatted
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "distance",
    header: "Distance",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="relative h-10 w-16">
          <Image
            src={row.getValue("image")}
            alt={`${row.getValue("origin")} to ${row.getValue("destination")}`}
            fill
            className="object-cover rounded"
          />
        </div>
      )
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
      )
    },
  },
]