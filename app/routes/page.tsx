"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { routes } from "@/lib/constants";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { JourneyPlanner } from "@/components/route-planner/route-planner";
import { useRouter } from "next/navigation";
import { Route } from "@/types";

type RouteOption = {
  operator: string;
  price: number;
  duration: string;
  stops: string[];
};
const routeOptions: {
  [key: string]: RouteOption[];
} = {
  "abakpa-gariki": [
    {
      operator: "Peace Mass",
      price: 800,
      duration: "8h 10m",
      stops: ["Stop A", "Stop B"],
    },
  ],
  "enugu-nsukka": [
    {
      operator: "Royal Express",
      price: 2500,
      duration: "2h 30m",
      stops: ["Stop A", "Stop B"],
    },
  ],
};
export type TransportOption = {
  operator: string; // e.g. "Peace Mass"
  price: number; // e.g. 2500
  duration: string; // e.g. "2h 30m"
  departureTime?: string; // optional: "08:30 AM"
  mapUrl?: string; // optional: link to the route on a map service
};

export default function Routes() {
  const router = useRouter();
  function handleContinue(route: Route) {
    router.push(
      `/search?from=${route.from.toLowerCase()}&to=${route.to.toLowerCase()}`
    );
  }
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Available Routes</h2>
          </div>
          <JourneyPlanner onContinue={handleContinue} />
        </div>
      </section>
    </main>
  );
}
