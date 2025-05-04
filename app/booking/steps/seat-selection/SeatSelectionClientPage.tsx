"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Calendar,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { Info } from "lucide-react";
// import BusLayout from "@/components/seat-selection/bus-layout";
import { Badge } from "@/components/ui/badge";
import { Seat } from "@/types";
import { useApp } from "@/contexts/app-context";
import { sampleRoutes } from "@/lib/constants";

// Dummy journey data
const journeyData = {
  id: "1",
  company: "Cloudy Transit",
  logo: "CT",
  from: {
    city: "Lagos",
    terminal: "Jibowu Terminal, Lagos",
    time: "23:15",
  },
  to: {
    city: "Abuja",
    terminal: "Utako Terminal, Abuja",
    time: "07:25",
  },
  duration: "8h 10m",
  journeyNumber: "CT-6018",
  class: "Economy",
  date: "May 16, 2025",
  luggage: "2 x 23 kg",
  handLuggage: "1 x 7 kg",
  bus: {
    type: "Luxury Coach",
    seating: "3-2 seat layout",
    features: "29 inches Seat pitch (standard)",
  },
  stops: [
    {
      city: "Ibadan",
      terminal: "Challenge Terminal, Ibadan",
      arrivalTime: "01:25",
      departureTime: "01:45",
      duration: "20 min",
    },
  ],
  price: 14850,
  adultBasicFee: 15000,
  tax: "Included",
  regularTotalPrice: 15000,
  save: 150,
  totalPrice: 14850,
};

export default function SeatSelectionClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { routes } = useApp();
  const journeyDetails = routes.length
    ? routes.find((route) => route.routeId === searchParams.get("journey"))
    : sampleRoutes.find(
        (route) => route.routeId === searchParams.get("journey")
      );
  console.log(routes, journeyDetails);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<Record<string, Seat>>({});
  const [passengerCount, setPassengerCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(journeyDetails?.price || 0);

  // Generate dummy seat data
  useEffect(() => {
    const generateSeats = (): Record<string, Seat> => {
      const seats: Record<string, Seat> = {};

      // Generate seats for rows 1-10 and columns A-E
      const rows = Array.from({ length: 10 }, (_, i) => i + 1);
      const columns = ["A", "B", "C", "D", "E"];

      rows.forEach((row) => {
        columns.forEach((col) => {
          const id = `${row}${col}`;

          // Randomly mark some seats as occupied (about 30%)
          const randomStatus = Math.random() < 0.3 ? "occupied" : "available";

          // Determine seat type based on position
          let type: "standard" | "premium" | "business" = "standard";
          let price = (journeyDetails && journeyDetails.price) || 0;

          if (row <= 2) {
            type = "business";
            price = (journeyDetails && journeyDetails.price * 1.5) || 0;
          } else if (row <= 5) {
            type = "premium";
            price = (journeyDetails && journeyDetails.price * 1.2) || 0;
          }

          seats[id] = {
            id,
            status: randomStatus,
            price,
            type,
          };
        });
      });

      return seats;
    };

    setSeats(generateSeats());

    // Get passenger count from URL
    const passengers = searchParams.get("passengers");
    if (passengers) {
      setPassengerCount(parseInt(passengers, 10));
    }
  }, [searchParams]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats[seatId];

    if (seat.status === "occupied") return;

    if (seat.status === "selected") {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      setSeats({
        ...seats,
        [seatId]: {
          ...seat,
          status: "available",
        },
      });
    } else {
      // Check if we've already selected the maximum number of seats
      if (
        selectedSeats.length >= passengerCount &&
        seat.status === "available"
      ) {
        alert(
          `You can only select ${passengerCount} seat(s) for this booking.`
        );
        return;
      }

      // Select seat
      setSelectedSeats([...selectedSeats, seatId]);
      setSeats({
        ...seats,
        [seatId]: {
          ...seat,
          status: "selected",
        },
      });
    }
  };

  // Calculate total price based on selected seats
  useEffect(() => {
    let price = 0;
    selectedSeats.forEach((seatId) => {
      price += seats[seatId]?.price || 0;
    });
    setTotalPrice(price);
  }, [selectedSeats, seats]);

  const handleContinue = () => {
    if (selectedSeats.length < passengerCount) {
      alert(`Please select ${passengerCount} seat(s) to continue.`);
      return;
    }

    // Construct query params with selected seats
    const params = new URLSearchParams({
      journey: journeyDetails?.routeId || "",
      seats: selectedSeats.join(","),
      price: totalPrice.toString(),
    });

    router.push(`/booking/steps/passenger?${params.toString()}`);
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === "occupied") return "bg-gray-400 cursor-not-allowed";
    if (seat.status === "selected") return "bg-primary hover:bg-primary/90";

    // Available seats with different types
    switch (seat.type) {
      case "business":
        return "bg-purple-500 hover:bg-purple-600";
      case "premium":
        return "bg-amber-500 hover:bg-amber-600";
      default:
        return "bg-green-500 hover:bg-green-600";
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search Results
            </Button>
            <h1 className="text-2xl font-bold mb-4">Select Your Seat</h1>
            <div className="relative flex items-center justify-between max-w-md mb-6">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  1
                </div>
                <span className="text-sm mt-1 text-primary">
                  Seat Selection
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  2
                </div>
                <span className="text-sm mt-1 text-muted-foreground">
                  Passenger Details
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  3
                </div>
                <span className="text-sm mt-1 text-muted-foreground">
                  Payment
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Bus Seat Layout</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-6">
                    <div className="flex gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-green-500"></div>
                        <span className="text-sm">Standard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-amber-500"></div>
                        <span className="text-sm">Premium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-purple-500"></div>
                        <span className="text-sm">Business</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-primary"></div>
                        <span className="text-sm">Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-gray-400"></div>
                        <span className="text-sm">Occupied</span>
                      </div>
                    </div>
                  </div>

                  {/* Bus layout */}
                  <div className="relative bg-muted rounded-3xl p-8 pb-16 max-w-2xl mx-auto">
                    {/* Driver area */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-muted border-2 border-border rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-center">
                          Driver
                        </div>
                      </div>
                    </div>

                    {/* Entrance */}
                    <div className="absolute top-8 right-0 transform translate-x-1/2 w-6 h-16 bg-muted border-2 border-border rounded-r-lg flex items-center justify-center">
                      <span className="text-xs -rotate-90">Entrance</span>
                    </div>

                    {/* Seats layout */}
                    <div className="grid grid-cols-5 gap-3">
                      {/* Row numbers */}
                      <div className="col-span-5 grid grid-cols-5 gap-3 mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div key={`col-${i}`} className="flex justify-center">
                            <span className="text-xs font-medium">
                              {String.fromCharCode(65 + i)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Seats */}
                      {Array.from({ length: 10 }, (_, row) => (
                        <React.Fragment key={`row-${row + 1}`}>
                          {/* Row number */}
                          <div className="col-span-5 grid grid-cols-5 gap-3">
                            {Array.from({ length: 5 }, (_, col) => {
                              const seatId = `${row + 1}${String.fromCharCode(
                                65 + col
                              )}`;
                              const seat = seats[seatId];

                              return seat ? (
                                <motion.button
                                  key={seatId}
                                  whileTap={{
                                    scale:
                                      seat.status !== "occupied" ? 0.95 : 1,
                                  }}
                                  className={cn(
                                    "w-10 h-10 rounded-sm flex items-center justify-center text-white font-medium text-xs",
                                    getSeatColor(seat)
                                  )}
                                  onClick={() => handleSeatClick(seatId)}
                                  disabled={seat.status === "occupied"}
                                >
                                  {seatId}
                                </motion.button>
                              ) : (
                                <div
                                  key={`empty-${row}-${col}`}
                                  className="w-10 h-10"
                                ></div>
                              );
                            })}
                          </div>

                          {/* Add aisle after every 2 rows */}
                          {(row + 1) % 2 === 0 && row < 9 && (
                            <div className="col-span-5 h-2 flex items-center justify-center my-1">
                              <div className="w-full h-0.5 border-t border-dashed border-border"></div>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Bus front */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-muted border-2 border-border rounded-b-full flex items-center justify-center">
                      <span className="text-xs">Front</span>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Please select {passengerCount} seat(s) to continue. You
                      have selected {selectedSeats.length} seat(s).
                    </p>
                    {selectedSeats.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {selectedSeats.map((seatId) => (
                          <Badge
                            key={seatId}
                            variant="outline"
                            className="text-primary"
                          >
                            Seat {seatId}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button
                      onClick={handleContinue}
                      disabled={selectedSeats.length < passengerCount}
                      className="w-full md:w-auto"
                    >
                      Continue to Passenger Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                      <span className="font-medium text-primary">
                        {journeyData.logo}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{journeyData.company}</div>
                      <div className="text-sm text-muted-foreground">
                        {journeyData.journeyNumber}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{journeyData.date}</span>
                    </div>

                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {journeyData.from.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {journeyData.from.terminal}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {journeyData.to.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {journeyData.to.terminal}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{journeyData.bus.type}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {passengerCount} Passenger(s)
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Selected Seats</h3>
                    {selectedSeats.length > 0 ? (
                      <div className="space-y-2">
                        {selectedSeats.map((seatId) => (
                          <div
                            key={seatId}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              Seat {seatId} ({seats[seatId]?.type})
                            </span>
                            <span>
                              ₦{seats[seatId]?.price.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No seats selected yet
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <Button
                    onClick={handleContinue}
                    disabled={selectedSeats.length < passengerCount}
                    className="w-full"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
