"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Route } from "@/types";
import { useApp } from "@/contexts/app-context";

// const routes: Route[] = [
//   {
//     routeId: "RT-LAG-ABJ-001",
//     origin: "Lagos",
//     destination: "Abuja",
//     price: 25000,
//     duration: "8h 30m",
//     image: "/routes/lagos-abuja.jpg",
//     description: "Direct route from Lagos to Abuja via expressway",
//     distance: "750km",
//   },
//   {
//     routeId: "RT-LAG-IBD-002",
//     origin: "Lagos",
//     destination: "Ibadan",
//     price: 5000,
//     duration: "2h 30m",
//     image: "/routes/lagos-ibadan.jpg",
//     description: "Express route from Lagos to Ibadan",
//     distance: "120km",
//   },
//   {
//     routeId: "RT-ABJ-KAN-003",
//     origin: "Abuja",
//     destination: "Kano",
//     price: 15000,
//     duration: "6h 00m",
//     image: "/routes/abuja-kano.jpg",
//     description: "Route from Abuja to Kano with comfort stops",
//     distance: "440km",
//   },
// ];

export default function RoutesPage() {
   const { routes } = useApp();
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Route Management</h1>
        <Link href="/dashboard/routes/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Route
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={routes} />
    </div>
  );
}
