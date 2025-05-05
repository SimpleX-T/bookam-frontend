"use client";

import React, { useState, useEffect, JSX } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
// import { Seat } from "@/types";
import { useApp } from "@/contexts/app-context";
import { sampleRoutes } from "@/lib/constants";
import BookingTimeline from "@/components/booking/booking-timeline";
import { toast } from "sonner";

type SeatStatus = "available" | "occupied" | "selected";

type Seat = {
  id: string;
  status: SeatStatus;
  price: number;
};

type Stop = {
  city: string;
  terminal: string;
  arrivalTime: string;
  departureTime: string;
  duration: string;
};

type JourneyData = {
  id: string;
  company: string;
  logo: string;
  from: { city: string; terminal: string; time: string };
  to: { city: string; terminal: string; time: string };
  duration: string;
  journeyNumber: string;
  class: string;
  date: string;
  luggage: string;
  handLuggage: string;
  bus: { type: string; features: string };
  stops: Stop[];
  price: number;
  adultBasicFee: number;
  tax: string;
  regularTotalPrice: number;
  save: number;
  totalPrice: number;
};

// Simplified bus configuration - 32-seater horizontal layout
const BUS_CONFIG = {
  columns: 9,
  rows: 4,
  aisle: true, // We'll have an aisle
};

// Dummy journey data
const journeyData: JourneyData = {
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
    features: "Comfortable seating",
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

// --- Component ---

export default function SeatSelectionClientPage(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // State with explicit types
  const { routes } = useApp();
  const journeyDetails = routes.length
    ? routes.find((route) => route.routeId === searchParams.get("journey"))
    : sampleRoutes.find(
        (route) => route.routeId === searchParams.get("journey")
      );
  console.log(routes, journeyDetails);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<Record<string, Seat>>({});

  let currentStep = 0;

  // Determine current step based on pathname
  if (pathname === "/booking/steps/seat-selection") {
    currentStep = 0;
  } else if (pathname === "/booking/steps/passenger-details") {
    currentStep = 1;
  } else if (pathname === "/booking/steps/payment") {
    currentStep = 2;
  }

  // Generate seat data
  const [passengerCount, setPassengerCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(journeyDetails?.price || 0);

  // Generate dummy seat data
  useEffect(() => {
    const generateSeats = (): Record<string, Seat> => {
      const newSeats: Record<string, Seat> = {};

      for (let row = 1; row <= BUS_CONFIG.rows; row++) {
        for (let col = 1; col <= BUS_CONFIG.columns; col++) {
          const colLetter = String.fromCharCode(64 + col); // A = 65
          const id = `${colLetter}${row}`;

          const randomStatus: SeatStatus =
            Math.random() < 0.3 ? "occupied" : "available";
          const price = journeyData.price;

          newSeats[id] = {
            id,
            status: randomStatus,
            price,
          };
        }
      }

      return newSeats;
    };
    setSeats(generateSeats());
    setSelectedSeats([]);

    const passengersParam = searchParams.get("passengers");
    if (passengersParam) {
      const count = parseInt(passengersParam, 10);
      if (!isNaN(count) && count > 0) {
        setPassengerCount(count);
      }
    }
  }, [searchParams]);

  // Calculate total price based on selected seats
  useEffect(() => {
    let calculatedPrice = 0;
    selectedSeats.forEach((seatId) => {
      if (seats[seatId]) {
        calculatedPrice += seats[seatId].price;
      }
    });
    setTotalPrice(calculatedPrice);
  }, [selectedSeats, seats]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats[seatId];

    if (!seat || seat.status === "occupied") return;

    if (seat.status === "selected") {
      // Deselect seat
      setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
      setSeats((prevSeats) => ({
        ...prevSeats,
        [seatId]: { ...seat, status: "available" },
      }));
    } else if (seat.status === "available") {
      // Check if maximum number of seats already selected
      if (selectedSeats.length >= passengerCount) {
        toast.error("Too many seats selected", {
          description: `You can only select ${passengerCount} seat(s). Deselect one to proceed.`,
          className: "text-base", // Optional for root element styling
          descriptionClassName: "text-lg font-medium text-red-700", // Customize text size & color
        });
        return;
      }

      setSelectedSeats((prev) => [...prev, seatId]);
      setSeats((prevSeats) => ({
        ...prevSeats,
        [seatId]: { ...seat, status: "selected" },
      }));
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length !== passengerCount) {
      alert(`Please select exactly ${passengerCount} seat(s) to continue.`);
      return;
    }

    const params = new URLSearchParams({
      journey: journeyDetails?.routeId || "",
      seats: selectedSeats.join(","),
      price: totalPrice.toString(),
      passengers: passengerCount.toString(),
    });

    router.push(`/booking/steps/passenger?${params.toString()}`);
  };

  const getSeatColor = (seat: Seat | undefined): string => {
    if (seat?.status === "occupied") return "text-red-500";
    if (seat?.status === "selected") return "text-green-500";
    return "text-gray-300";
  };

  const renderSeat = (seatId: string, seat: Seat | undefined): JSX.Element => {
    let seatClass = getSeatColor(seat);

    return (
      <div
        className={cn(
          "relative w-16 h-16 flex items-center justify-center transition-all duration-200",
          seatClass,
          seat?.status !== "occupied" && "cursor-pointer hover:scale-105"
        )}
        onClick={() => handleSeatClick(seatId)}
        aria-label={`Seat ${seatId} ${seat ? `(${seat.status})` : "(Unknown)"}`}
        role="button"
        tabIndex={seat?.status === "occupied" || !seat ? -1 : 0}
      >
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <title>Bus Seat</title>
          <path
            className="cls-ra"
            d="M36,17.3H80.4a8.88,8.88,0,0,1,6.72-7.25A5.77,5.77,0,0,0,81.57,6H36a5.72,5.72,0,0,0-5.76,5.66A5.71,5.71,0,0,0,36,17.3Z"
          />
          <path
            className="cls-ra"
            d="M80.29,82.79H36A5.66,5.66,0,1,0,36,94.1H81.47a6.13,6.13,0,0,0,5.44-3.41A8.77,8.77,0,0,1,80.29,82.79Z"
          />
          <path
            className="cls-ra"
            d="M80.08,79.7V20.5H35.92A8.85,8.85,0,0,1,27.17,13h-18a4,4,0,0,0-4.06,4V82.79a4,4,0,0,0,4.06,3.95H27.28a8.65,8.65,0,0,1,8.75-7Z"
          />
          <path
            className="cls-ra"
            d="M89.15,12.93a5.71,5.71,0,0,0-5.76,5.65V82.15a5.76,5.76,0,0,0,11.52,0V18.58A5.71,5.71,0,0,0,89.15,12.93Z"
          />
          <path
            className="cls-ra"
            d="M90.21,9.94a8.93,8.93,0,0,0-8.74-7H36a8.94,8.94,0,0,0-8.75,6.93H9.15A7.22,7.22,0,0,0,2,17V82.79a7.06,7.06,0,0,0,7.15,7h18a8.85,8.85,0,0,0,8.75,7.26H81.47A8.91,8.91,0,0,0,90,90.9a8.81,8.81,0,0,0,8-8.75V18.58A8.84,8.84,0,0,0,90.21,9.94ZM36,6H81.57a5.77,5.77,0,0,1,5.55,4.06A8.88,8.88,0,0,0,80.4,17.3H36a5.71,5.71,0,0,1-5.76-5.65A5.72,5.72,0,0,1,36,6ZM27.28,86.74H9.15a4,4,0,0,1-4.06-3.95V17a4,4,0,0,1,4.06-4h18a8.85,8.85,0,0,0,8.75,7.47H80.08V79.7H36A8.65,8.65,0,0,0,27.28,86.74ZM81.47,94.1H36a5.66,5.66,0,1,1,0-11.31H80.29a8.77,8.77,0,0,0,6.62,7.9A6.13,6.13,0,0,1,81.47,94.1ZM94.91,82.15a5.76,5.76,0,0,1-11.52,0V18.58a5.76,5.76,0,0,1,11.52,0Z"
          />
        </svg>

        {seat && (
          <span className="absolute text-md font-medium text-center select-none text-black">
            {seatId}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
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

            <BookingTimeline />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 scrollbar-none">
            {/* Left Side: Seat Selection Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span>Bus Seat Layout</span>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-center mb-8">
                    <div className="inline-flex flex-wrap gap-x-6 gap-y-3 bg-muted/50 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-sm bg-primary"
                          aria-hidden="true"
                        ></div>
                        <span className="text-sm">Selected</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-sm bg-red-400"
                          aria-hidden="true"
                        ></div>
                        <span className="text-sm">Occupied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-sm bg-gray-400"
                          aria-hidden="true"
                        ></div>
                        <span className="text-sm">Free</span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Bus layout with border */}
                  <div className="relative rounded-lg w-11/12 mx-auto overflow-x-auto ">
                    {/* Bus body with border */}
                    <div className="border-4 border-gray-500 rounded-xl bg-muted/30 py-4 pr-4">
                      <span className="absolute -bottom-7 left-16 transform -rotate-90 -translate-x-1/2 -translate-y-1/2 pointer-events-none p-2 rounded-full">
                        <img src="/images/wheel.png" className="w-16 h-16" />
                      </span>
                      <div className="flex flex-col gap-4 items-end">
                        {Array.from(
                          { length: BUS_CONFIG.rows },
                          (_, rowIndex) => {
                            const rowNum = rowIndex + 1;
                            return (
                              <div
                                key={`row-${rowNum}`}
                                className="flex justify-center"
                              >
                                <div className="flex gap-3">
                                  {Array.from({
                                    length: BUS_CONFIG.columns,
                                  }).map((_, colIndex: number) => {
                                    const colLetter = String.fromCharCode(
                                      64 + colIndex
                                    );
                                    const seatId = `${colLetter}${rowNum}`;
                                    const seat = seats[seatId];
                                    return renderSeat(seatId, seat);
                                  })}
                                </div>
                                {rowNum === 2 && <div className="h-24" />}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Selection Info & Continue Button */}
                  <div className="mt-8 text-center">
                    <p
                      className="text-sm text-muted-foreground mb-4"
                      aria-live="polite"
                    >
                      Please select {passengerCount - selectedSeats.length} more
                      seat(s). ({selectedSeats.length} / {passengerCount}{" "}
                      selected)
                    </p>

                    {/* Display Selected Seats */}
                    {selectedSeats.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {selectedSeats.map((seatId) => {
                          const seat = seats[seatId];
                          return seat ? (
                            <Badge
                              key={seatId}
                              variant="outline"
                              className="border-primary text-primary"
                            >
                              Seat {seatId} - ₦{seat.price.toLocaleString()}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    )}

                    {/* Continue Button */}
                    <Button
                      onClick={handleContinue}
                      disabled={selectedSeats.length !== passengerCount}
                      className="w-full md:w-auto mt-2"
                      aria-disabled={selectedSeats.length !== passengerCount}
                    >
                      Continue to Passenger Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Side: Journey Summary Card */}
            <div>
              <Card className="sticky top-6">
                {/* Card Header with Company Info */}
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                      <span className="font-medium text-primary">
                        {journeyData.logo}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {journeyData.company}
                      </CardTitle>
                      <CardDescription>
                        {journeyData.journeyNumber}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Quick Info Box */}
                  <div className="p-3 rounded-lg bg-muted/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">{journeyData.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4 text-primary" />
                      <span className="text-sm">{journeyData.bus.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        {passengerCount} Passenger(s)
                      </span>
                    </div>
                  </div>

                  {/* Route Timeline */}
                  <div className="relative">
                    {/* Vertical line */}
                    <div
                      className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"
                      aria-hidden="true"
                    ></div>
                    {/* From */}
                    <div className="flex mb-6">
                      <div className="mr-4 relative">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {journeyData.from.terminal}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {journeyData.from.time} (Departure)
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Stops */}
                    {journeyData.stops.map((stop, i) => (
                      <div key={`stop-${i}`} className="flex mb-6">
                        <div className="mr-4 relative">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {stop.terminal}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {stop.arrivalTime} - {stop.departureTime} (
                              {stop.duration} stop)
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* To */}
                    <div className="flex">
                      <div className="mr-4 relative">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {journeyData.to.terminal}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {journeyData.to.time} (Est. Arrival)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Selected Seats Summary */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">
                      Selected Seats ({selectedSeats.length})
                    </h3>
                    {selectedSeats.length > 0 ? (
                      <div className="space-y-1 p-3 rounded-lg bg-muted/30 max-h-32 overflow-y-auto">
                        {selectedSeats.map((seatId) => {
                          const seat = seats[seatId];
                          return seat ? (
                            <div
                              key={seatId}
                              className="flex justify-between text-sm"
                            >
                              <span>Seat {seatId}</span>
                              <span className="font-medium">
                                ₦{seat.price.toLocaleString()}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground p-3 rounded-lg bg-muted/30">
                        No seats selected yet
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Total Price */}
                  <div className="flex justify-between items-center bg-primary/5 p-3 rounded-lg">
                    <span className="font-medium">Total Price</span>
                    <span className="text-lg font-bold text-primary">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Continue Button (in summary card) */}
                  <Button
                    onClick={handleContinue}
                    disabled={selectedSeats.length !== passengerCount}
                    className="w-full mt-4"
                    aria-disabled={selectedSeats.length !== passengerCount}
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
