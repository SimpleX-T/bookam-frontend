"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/contexts/app-context";
// import CreateRoutePage from "./create/page";
import { useState } from "react";

export default function RoutesPage() {
  const { routes } = useApp();
  // const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Route Management</h1>
        <Link href="/dashboard/routes/create">
          <Button
          // onClick={() => setShowForm(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Route
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={routes} />

      {/* {showForm && (
        <CreateRoutePage onClose={() => setShowForm(false)} isModal={true} />
      )} */}
    </div>
  );
}
