"use client";
import React from "react";
import { JourneyPlanner } from "@/components/route-planner/route-planner";
import { useRouter } from "next/navigation";
import { Route } from "@/types";
import { useApp } from "@/contexts/app-context";
import { sampleRoutes } from "@/lib/constants";

export default function Routes() {
  const router = useRouter();

  const { routes: busRoutes } = useApp();

  function handleContinue(route: Route) {
    router.push(
      `/search?from=${route.origin.toLowerCase()}&to=${route.destination.toLowerCase()}`
    );
  }
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Available Routes</h2>
          </div>
          <JourneyPlanner
            onContinue={handleContinue}
            routes={busRoutes.length ? busRoutes : sampleRoutes}
          />
        </div>
      </section>
    </main>
  );
}
