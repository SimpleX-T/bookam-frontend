"use client";
import React from "react";
import { JourneyPlanner } from "@/components/route-planner/route-planner";
import { useRouter } from "next/navigation";
import { Route } from "@/types";
import { useApp } from "@/contexts/app-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import EmptyState from "@/components/search/states/empty";

export default function Routes() {
  const router = useRouter();

  const { routes: busRoutes } = useApp();

  function handleContinue(route: Route) {
    router.push(
      `/search?from=${route.origin.toLowerCase()}&to=${route.destination.toLowerCase()}`
    );
  }
  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30">
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Available Routes</h2>
            </div>
            {busRoutes.length ? (
              <JourneyPlanner
                onContinue={handleContinue}
                routes={busRoutes}
              />
            ) : (
              <EmptyState title="routes" hasFilters={false} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
