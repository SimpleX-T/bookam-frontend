"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/contexts/app-context";

// Dummy data
// const buses = [
//   {
//     busId: "BUS-001",
//     routeid: "RT-LAG-ABJ-001",
//     busNumber: "LG-234-KJA",
//     capacity: 32,
//     departureTime: "2024-04-01T08:00:00Z",
//     arrivalTime: "2024-04-01T16:00:00Z",
//   },
//   {
//     busId: "BUS-002",
//     routeid: "RT-LAG-IBD-002",
//     busNumber: "KD-567-ABC",
//     capacity: 32,
//     departureTime: "2024-04-01T09:00:00Z",
//     arrivalTime: "2024-04-01T14:00:00Z",
//   },
//   {
//     busId: "BUS-003",
//     routeid: "RT-ABJ-KAN-003",
//     busNumber: "AB-890-XYZ",
//     capacity: 32,
//     departureTime: "2024-04-01T07:30:00Z",
//     arrivalTime: "2024-04-01T15:30:00Z",
//   },
// ];

export default function BusesPage() {
  const { buses } = useApp();
  // console.log(buses);
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Bus Management</h1>
        <Link href="/dashboard/buses/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Bus
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={buses} />
    </div>
  );
}
