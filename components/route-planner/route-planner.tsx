"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Clock, MapIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});
import { Route } from "@/types";

interface JourneyPlannerProps {
  routes?: Route[];
  onContinue: (selectedRoute: Route) => void;
  max?: number;
}

export function JourneyPlanner({
  routes = [],
  onContinue,
  max,
}: JourneyPlannerProps) {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelect = (route: Route) => {
    setIsMapLoading(true);
    setSelectedRoute(route);
    // Simulate map loading delay
    setTimeout(() => setIsMapLoading(false), 500);
  };

  const handleContinue = () => {
    if (onContinue && selectedRoute) {
      onContinue(selectedRoute);
    }
  };

  const handleRouteChange = (routeId: string) => {
    const route = routes.find((r) => r.routeId === routeId);
    if (route) {
      handleSelect(route);
      setIsSidebarOpen(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const viewRoute = (route: Route, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedRoute(route);
    setIsSidebarOpen(true);
  };

  return (
    <div className="relative flex flex-col w-full min-h-fit">
      {/* Main content area */}
      <div
        className={`w-full h-full overflow-y-auto ${
          isSidebarOpen ? "lg:pr-1/2" : ""
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            {selectedRoute && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden"
                aria-label="Toggle map sidebar"
              >
                <MapIcon className="h-5 w-5" />
              </Button>
            )}
          </div>

          <Select
            value={selectedRoute?.routeId}
            onValueChange={handleRouteChange}
          >
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Select a route" />
            </SelectTrigger>
            <SelectContent>
              {routes.map((route) => (
                <SelectItem key={route.routeId} value={route.routeId}>
                  {route.origin} to {route.destination} - ₦
                  {route.price.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {routes.slice(0, max || routes.length).map((route) => (
              <Card
                key={route.routeId}
                className={`overflow-hidden cursor-pointer transition-all shadow-md ${
                  selectedRoute?.routeId === route.routeId
                    ? "ring-2 ring-primary"
                    : "hover:shadow-xl"
                }`}
                onClick={() => handleSelect(route)}
              >
                <div className="relative h-32">
                  <Image
                    src={route.image || "/placeholder.svg"}
                    alt={`${route.origin} to ${route.destination}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-sm">
                      {route.origin} <ArrowRight className="inline h-3 w-3" />{" "}
                      {route.destination}
                    </div>
                    <Badge variant="outline" className="text-primary text-xs">
                      ₦{route.price.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Clock className="mr-1 h-3 w-3" />
                    {route.duration}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 text-xs h-8"
                      variant={
                        selectedRoute?.routeId === route.routeId
                          ? "default"
                          : "outline"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(route);
                      }}
                    >
                      {selectedRoute?.routeId === route.routeId
                        ? "Selected"
                        : "Select"}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={(e) => viewRoute(route, e)}
                    >
                      Route
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop sidebar - only visible when a route is selected */}
      <div
        className={`hidden lg:block fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isSidebarOpen && selectedRoute
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />
      <div
        className={`hidden lg:block fixed right-0 top-0 bottom-0 w-1/2 border-l border-border bg-background dark:bg-background overflow-y-auto transition-transform duration-300 ease-in-out transform z-50 ${
          isSidebarOpen && selectedRoute ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedRoute && (
          <div className="h-full flex flex-col">
            {/* Sidebar Header with Close Button */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/90 backdrop-blur-sm border-b">
              <h2 className="font-bold text-lg">Journey Details</h2>
              <Button variant="ghost" size="icon" onClick={closeSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Map Area */}
            <div className="relative h-1/2 min-h-[300px]">
              {isMapLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <div className="h-8 w-8 mx-auto mb-2 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-muted-foreground">
                      Loading map...
                    </p>
                  </div>
                </div>
              ) : (
                <MapView
                  origin={selectedRoute.origin}
                  destination={selectedRoute.destination}
                  className="h-full z-50"
                />
              )}
            </div>

            {/* Journey Details */}
            <div className="p-6 flex-1">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{selectedRoute.origin}</p>
                    {/* <p className="text-sm">{selectedRoute.departureTime}</p> */}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium">{selectedRoute.destination}</p>
                    {/* <p className="text-sm">{selectedRoute.arrivalTime}</p> */}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card dark:bg-card p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{selectedRoute.duration}</p>
                  </div>
                  <div className="bg-card dark:bg-card p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{selectedRoute.distance}</p>
                  </div>
                  <div className="bg-card dark:bg-card p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">
                      ₦{selectedRoute.price.toLocaleString()}
                    </p>
                  </div>
                  {/* <div className="bg-card dark:bg-card p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Stops</p>
                    <p className="font-medium">
                      {selectedRoute.stops.length || "Direct"}
                    </p>
                  </div> */}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Description
                  </p>
                  <p>{selectedRoute.description}</p>
                </div>

                {/* {selectedRoute.stops.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Stops</p>
                    <ul className="list-disc pl-5">
                      {selectedRoute.stops.map((stop, index) => (
                        <li key={index}>{stop}</li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>

              <div className="mt-8">
                <Button className="w-full" size="lg" onClick={handleContinue}>
                  Continue with this Journey
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile sidebar - slides in when toggled */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      <div
        className={`fixed top-0 bottom-0 right-0 w-full sm:w-3/4 md:w-2/3 z-50 border-l border-border bg-background dark:bg-background overflow-y-auto transition-transform duration-300 ease-in-out transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/90 backdrop-blur-sm border-b">
          <h2 className="font-bold text-lg">Journey Details</h2>
          <Button variant="ghost" size="icon" onClick={closeSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {selectedRoute && (
          <div className="flex flex-col">
            {/* Map Area */}
            <div className="relative h-[40vh]">
              {isMapLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <div className="h-8 w-8 mx-auto mb-2 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-muted-foreground">
                      Loading map...
                    </p>
                  </div>
                </div>
              ) : (
                <MapView
                  origin={selectedRoute.origin}
                  destination={selectedRoute.destination}
                  className="h-full"
                />
              )}
            </div>

            {/* Journey Details */}
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{selectedRoute.origin}</p>
                    {/* <p className="text-sm">{selectedRoute.departureTime}</p> */}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium">{selectedRoute.destination}</p>
                    {/* <p className="text-sm">{selectedRoute.arrivalTime}</p> */}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card dark:bg-card p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{selectedRoute.duration}</p>
                  </div>
                  <div className="bg-card dark:bg-card p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{selectedRoute.distance}</p>
                  </div>
                  <div className="bg-card dark:bg-card p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">
                      ₦{selectedRoute.price.toLocaleString()}
                    </p>
                  </div>
                  {/* <div className="bg-card dark:bg-card p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Stops</p>
                    <p className="font-medium">
                      {selectedRoute.stops.length || "Direct"}
                    </p>
                  </div> */}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Description
                  </p>
                  <p>{selectedRoute.description}</p>
                </div>

                {/* {selectedRoute.stops.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Stops</p>
                    <ul className="list-disc pl-5">
                      {selectedRoute.stops.map((stop, index) => (
                        <li key={index}>{stop}</li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>

              <div className="mt-8 pb-8">
                <Button className="w-full" size="lg" onClick={handleContinue}>
                  Continue with this Journey
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating button to open sidebar on mobile when closed */}
      {selectedRoute && (
        <Button
          variant="default"
          size="icon"
          className={`fixed bottom-4 right-4 rounded-full shadow-lg z-30 lg:hidden ${
            isSidebarOpen ? "hidden" : "flex"
          }`}
          onClick={toggleSidebar}
        >
          <MapIcon className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
