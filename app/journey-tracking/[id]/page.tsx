"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Bus,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { motion } from "motion/react";

// Dummy journey data
const journeyData = {
  id: "1",
  journeyNumber: "CT-6018",
  company: "Cloudy Transit",
  driver: {
    name: "Emmanuel Okonkwo",
    phone: "+234 812 345 6789",
    experience: "8 years",
    rating: 4.8,
  },
  bus: {
    type: "Luxury Coach",
    model: "Mercedes-Benz Travego",
    regNumber: "LND-234-XY",
    capacity: "44 seats",
  },
  from: {
    city: "Lagos",
    terminal: "Jibowu Terminal",
    time: "23:15",
    coordinates: { lat: 6.5244, lng: 3.3792 },
  },
  to: {
    city: "Abuja",
    terminal: "Utako Terminal",
    time: "07:25",
    coordinates: { lat: 9.0765, lng: 7.3986 },
  },
  stops: [
    {
      city: "Ibadan",
      terminal: "Challenge Terminal",
      arrivalTime: "01:25",
      departureTime: "01:45",
      coordinates: { lat: 7.3775, lng: 3.947 },
      status: "completed",
    },
    {
      city: "Ilorin",
      terminal: "Offa Garage Terminal",
      arrivalTime: "03:30",
      departureTime: "03:50",
      coordinates: { lat: 8.4799, lng: 4.5418 },
      status: "completed",
    },
    {
      city: "Minna",
      terminal: "Central Terminal",
      arrivalTime: "05:45",
      departureTime: "06:05",
      coordinates: { lat: 9.6139, lng: 6.5569 },
      status: "current",
    },
  ],
  currentLocation: {
    coordinates: { lat: 9.1139, lng: 6.8569 },
    lastUpdated: "06:35",
    speed: "85 km/h",
    estimatedArrival: "07:25",
  },
  status: "on-time",
  progress: 75,
  updates: [
    {
      time: "23:15",
      message: "Bus departed from Lagos Jibowu Terminal",
      type: "info",
    },
    {
      time: "01:25",
      message: "Bus arrived at Ibadan Challenge Terminal",
      type: "info",
    },
    {
      time: "01:45",
      message: "Bus departed from Ibadan Challenge Terminal",
      type: "info",
    },
    {
      time: "03:30",
      message: "Bus arrived at Ilorin Offa Garage Terminal",
      type: "info",
    },
    {
      time: "03:50",
      message: "Bus departed from Ilorin Offa Garage Terminal",
      type: "info",
    },
    {
      time: "04:15",
      message:
        "Slight delay due to road construction. Expected delay: 10 minutes",
      type: "warning",
    },
    {
      time: "05:45",
      message: "Bus arrived at Minna Central Terminal",
      type: "info",
    },
    {
      time: "06:05",
      message: "Bus departed from Minna Central Terminal",
      type: "info",
    },
    {
      time: "06:35",
      message: "Journey is progressing well. Expected to arrive on time",
      type: "success",
    },
  ],
};

export default function JourneyTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const journeyId = params.id as string;
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-500";
      case "delayed":
        return "bg-amber-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Journey Tracking</h1>
                <p className="text-muted-foreground">
                  Journey {journeyData.journeyNumber} • {journeyData.from.city}{" "}
                  to {journeyData.to.city}
                </p>
              </div>
              <Badge
                className={`${getStatusColor(
                  journeyData.status
                )} text-white px-3 py-1 text-xs uppercase font-medium`}
              >
                {journeyData.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Live Tracking</CardTitle>
                    <CardDescription>
                      Real-time location of your bus
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative rounded-lg overflow-hidden bg-muted h-[400px] flex items-center justify-center">
                      {!mapLoaded ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                          <p className="text-muted-foreground">
                            Loading map...
                          </p>
                        </div>
                      ) : (
                        <>
                          {/* This would be replaced with an actual map component */}
                          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-50"></div>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="bg-background p-4 rounded-lg shadow-lg max-w-md w-full">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <Bus className="h-5 w-5 text-primary mr-2" />
                                  <span className="font-medium">
                                    {journeyData.bus.regNumber}
                                  </span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {journeyData.currentLocation.speed}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">
                                Currently between {journeyData.stops[1].city}{" "}
                                and {journeyData.stops[2].city}
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>
                                    Last updated:{" "}
                                    {journeyData.currentLocation.lastUpdated}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">
                                    ETA:{" "}
                                  </span>
                                  <span>
                                    {
                                      journeyData.currentLocation
                                        .estimatedArrival
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-sm">
                            {journeyData.from.city}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm">{journeyData.to.city}</span>
                          <MapPin className="h-4 w-4 text-muted-foreground ml-1" />
                        </div>
                      </div>
                      <Progress value={journeyData.progress} className="h-2" />
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>{journeyData.from.time}</span>
                        <span>Journey Progress: {journeyData.progress}%</span>
                        <span>{journeyData.to.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Journey Updates</CardTitle>
                    <CardDescription>
                      Latest updates for your journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {journeyData.updates.map((update, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-muted">
                              {getUpdateIcon(update.type)}
                            </div>
                            {index < journeyData.updates.length - 1 && (
                              <div className="w-px h-full bg-muted-foreground/20 my-1"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{update.message}</p>
                              <span className="text-xs text-muted-foreground">
                                {update.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Journey Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Route Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            From
                          </span>
                          <span className="text-sm">
                            {journeyData.from.terminal}, {journeyData.from.city}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            To
                          </span>
                          <span className="text-sm">
                            {journeyData.to.terminal}, {journeyData.to.city}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Journey Number
                          </span>
                          <span className="text-sm">
                            {journeyData.journeyNumber}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Company
                          </span>
                          <span className="text-sm">{journeyData.company}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Bus Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Bus Type
                          </span>
                          <span className="text-sm">
                            {journeyData.bus.type}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Model
                          </span>
                          <span className="text-sm">
                            {journeyData.bus.model}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Registration
                          </span>
                          <span className="text-sm">
                            {journeyData.bus.regNumber}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Capacity
                          </span>
                          <span className="text-sm">
                            {journeyData.bus.capacity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Driver Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Name
                          </span>
                          <span className="text-sm">
                            {journeyData.driver.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Experience
                          </span>
                          <span className="text-sm">
                            {journeyData.driver.experience}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Rating
                          </span>
                          <span className="text-sm">
                            {journeyData.driver.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Driver</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Need to contact the driver? You can call or message them
                      directly.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>Driver phone: {journeyData.driver.phone}</p>
                      <p className="mt-1">
                        Note: Calls and messages are routed through our system
                        for your privacy and security.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stops</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {journeyData.stops.map((stop, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                stop.status === "completed"
                                  ? "bg-green-500"
                                  : stop.status === "current"
                                  ? "bg-blue-500"
                                  : "bg-muted"
                              }`}
                            ></div>
                            {index < journeyData.stops.length - 1 && (
                              <div className="w-px h-full bg-muted-foreground/20 my-1"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{stop.city}</p>
                              <Badge
                                variant="outline"
                                className={
                                  stop.status === "completed"
                                    ? "text-green-500"
                                    : stop.status === "current"
                                    ? "text-blue-500"
                                    : ""
                                }
                              >
                                {stop.status === "completed"
                                  ? "Completed"
                                  : stop.status === "current"
                                  ? "Current"
                                  : "Upcoming"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {stop.terminal}
                            </p>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Arrival: {stop.arrivalTime}</span>
                              <span>Departure: {stop.departureTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
