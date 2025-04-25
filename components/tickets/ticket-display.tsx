"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TicketDisplayProps {
  booking: any;
  className?: string;
  compact?: boolean;
}

export function TicketDisplay({
  booking,
  className,
  compact = false,
}: TicketDisplayProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const passenger = booking.passengers[0];
  const journey = booking.journey;

  return (
    <div className={cn("perspective-1000", className)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
        }}
      >
        {/* Front of ticket */}
        <Card
          className={cn(
            "backface-hidden cursor-pointer",
            compact ? "p-3" : "p-0",
            isFlipped ? "invisible" : "visible"
          )}
          onClick={handleFlip}
        >
          <CardContent className={cn(compact ? "p-0" : "p-0")}>
            <div className="bg-primary text-primary-foreground p-4 text-center rounded-t-lg">
              <h2 className={cn("font-bold", compact ? "text-lg" : "text-xl")}>
                N-Journey
              </h2>
              <p
                className={cn(
                  "text-primary-foreground/80",
                  compact ? "text-xs" : "text-sm"
                )}
              >
                E-Ticket
              </p>
            </div>

            <div className={cn("space-y-4", compact ? "p-3" : "p-6")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex items-center justify-center bg-primary/10 rounded-md",
                      compact ? "w-8 h-8" : "w-10 h-10"
                    )}
                  >
                    <span className="font-medium text-primary">
                      {journey.logo}
                    </span>
                  </div>
                  <div>
                    <div
                      className={cn(
                        "font-medium",
                        compact ? "text-sm" : "text-base"
                      )}
                    >
                      {journey.company}
                    </div>
                    <div
                      className={cn(
                        "text-muted-foreground",
                        compact ? "text-xs" : "text-sm"
                      )}
                    >
                      {journey.journeyNumber}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={compact ? "text-xs" : "text-sm"}
                >
                  {passenger.seat}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div
                    className={cn(
                      "font-bold",
                      compact ? "text-lg" : "text-2xl"
                    )}
                  >
                    {journey.from.time}
                  </div>
                  <div
                    className={cn(
                      "font-medium",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    {journey.from.city}
                  </div>
                </div>
                <div className="flex flex-col items-center px-4">
                  <div
                    className={cn(
                      "text-muted-foreground mb-1",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    {journey.duration}
                  </div>
                  <div className={cn("relative", compact ? "w-12" : "w-16")}>
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-dashed"></span>
                    </div>
                    <div className="relative flex justify-center">
                      <ArrowRight
                        className={cn(
                          "bg-background",
                          compact ? "w-3 h-3" : "w-4 h-4"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={cn(
                      "font-bold",
                      compact ? "text-lg" : "text-2xl"
                    )}
                  >
                    {journey.to.time}
                  </div>
                  <div
                    className={cn(
                      "font-medium",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    {journey.to.city}
                  </div>
                </div>
              </div>

              <div
                className={cn("text-center", compact ? "text-xs" : "text-sm")}
              >
                <div className="font-medium">{journey.date}</div>
                <div className="text-muted-foreground">
                  Check-in: {booking.checkIn.date} at {booking.checkIn.time}
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <div
                  className={cn(
                    "font-medium mb-1",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  Passenger
                </div>
                <div
                  className={cn("font-bold", compact ? "text-sm" : "text-lg")}
                >
                  {passenger.title} {passenger.firstName} {passenger.lastName}
                </div>
              </div>

              <div className="flex justify-center">
                <div
                  className={cn(
                    "bg-white flex items-center justify-center",
                    compact ? "h-24" : "h-32 w-full"
                  )}
                >
                  <div className="relative h-full w-full max-w-[200px] flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className={cn(
                        "border border-border",
                        compact ? "h-20 w-20" : "h-24 w-24"
                      )}
                    >
                      <rect x="5" y="5" width="90" height="90" fill="white" />
                      <rect x="10" y="10" width="2" height="80" fill="black" />
                      <rect x="15" y="10" width="1" height="80" fill="black" />
                      <rect x="18" y="10" width="2" height="80" fill="black" />
                      <rect x="22" y="10" width="3" height="80" fill="black" />
                      <rect x="27" y="10" width="1" height="80" fill="black" />
                      <rect x="30" y="10" width="2" height="80" fill="black" />
                      <rect x="35" y="10" width="3" height="80" fill="black" />
                      <rect x="40" y="10" width="1" height="80" fill="black" />
                      <rect x="43" y="10" width="2" height="80" fill="black" />
                      <rect x="48" y="10" width="1" height="80" fill="black" />
                      <rect x="51" y="10" width="3" height="80" fill="black" />
                      <rect x="56" y="10" width="2" height="80" fill="black" />
                      <rect x="60" y="10" width="1" height="80" fill="black" />
                      <rect x="63" y="10" width="3" height="80" fill="black" />
                      <rect x="68" y="10" width="2" height="80" fill="black" />
                      <rect x="72" y="10" width="1" height="80" fill="black" />
                      <rect x="75" y="10" width="2" height="80" fill="black" />
                      <rect x="80" y="10" width="3" height="80" fill="black" />
                      <rect x="85" y="10" width="1" height="80" fill="black" />
                      <rect x="88" y="10" width="2" height="80" fill="black" />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className={cn("text-center", compact ? "text-xs" : "text-sm")}
              >
                <div className="font-medium">
                  Booking ID: {booking.reference}
                </div>
                <div className="text-muted-foreground">
                  Ticket: {passenger.ticketNumber}
                </div>
              </div>

              {!compact && (
                <div className="text-center text-xs text-muted-foreground mt-2">
                  Tap to view more details
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back of ticket */}
        <Card
          className={cn(
            "backface-hidden cursor-pointer absolute top-0 w-full",
            compact ? "p-3" : "p-0",
            isFlipped ? "visible" : "invisible"
          )}
          style={{ transform: "rotateY(180deg)" }}
          onClick={handleFlip}
        >
          <CardContent className={cn(compact ? "p-0" : "p-0")}>
            <div className="bg-primary text-primary-foreground p-4 text-center rounded-t-lg">
              <h2 className={cn("font-bold", compact ? "text-lg" : "text-xl")}>
                Journey Details
              </h2>
              <p
                className={cn(
                  "text-primary-foreground/80",
                  compact ? "text-xs" : "text-sm"
                )}
              >
                Ticket Information
              </p>
            </div>

            <div className={cn("space-y-3", compact ? "p-3" : "p-6")}>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    From
                  </span>
                  <span
                    className={cn(
                      "font-medium",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    {journey.from.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Terminal
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {journey.from.terminal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Departure
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {journey.date}, {journey.from.time}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    To
                  </span>
                  <span
                    className={cn(
                      "font-medium",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    {journey.to.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Terminal
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {journey.to.terminal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Arrival
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {journey.date}, {journey.to.time}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Journey Number
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {journey.journeyNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Bus Type
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {journey.bus.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Seating
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {journey.bus.seating}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Passenger
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {passenger.title} {passenger.firstName} {passenger.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Seat
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {passenger.seat}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Luggage
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {journey.luggage}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Booking ID
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {booking.reference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-muted-foreground",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    Ticket Number
                  </span>
                  <span className={cn(compact ? "text-xs" : "text-sm")}>
                    {passenger.ticketNumber}
                  </span>
                </div>
              </div>

              {!compact && (
                <div className="text-center text-xs text-muted-foreground mt-2">
                  Tap to view ticket
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
