"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Seat types
type SeatStatus = "available" | "occupied" | "selected";
type SeatType = "standard" | "premium" | "business";

interface Seat {
  id: string;
  status: SeatStatus;
  type: SeatType;
  price: number;
}

interface BusLayoutProps {
  seats: Record<string, Seat>;
  selectedSeats: string[];
  onSeatClick: (seatId: string) => void;
  busType?: "standard" | "luxury" | "executive";
  showLegend?: boolean;
}

export default function BusLayout({
  seats,
  selectedSeats,
  onSeatClick,
  busType = "luxury",
  showLegend = true,
}: BusLayoutProps) {
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

  // Generate rows and columns based on bus type
  const getLayoutConfig = () => {
    switch (busType) {
      case "executive":
        return { rows: 8, seatsPerRow: 3, aisleAfter: 1 }; // 1-2 configuration
      case "standard":
        return { rows: 12, seatsPerRow: 4, aisleAfter: 2 }; // 2-2 configuration
      case "luxury":
      default:
        return { rows: 10, seatsPerRow: 5, aisleAfter: 2 }; // 2-3 configuration
    }
  };

  const { rows, seatsPerRow, aisleAfter } = getLayoutConfig();

  return (
    <div className="space-y-6">
      {showLegend && (
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
      )}

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
        <div className={`grid grid-cols-${seatsPerRow} gap-3`}>
          {/* Column labels */}
          <div
            className={`col-span-${seatsPerRow} grid grid-cols-${seatsPerRow} gap-3 mb-2`}
          >
            {Array.from({ length: seatsPerRow }, (_, i) => (
              <div key={`col-${i}`} className="flex justify-center">
                <span className="text-xs font-medium">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
            ))}
          </div>

          {/* Seats */}
          {Array.from({ length: rows }, (_, row) => (
            <React.Fragment key={`row-${row + 1}`}>
              {/* Row with seats */}
              <div
                className={`col-span-${seatsPerRow} grid grid-cols-${seatsPerRow} gap-3`}
              >
                {Array.from({ length: seatsPerRow }, (_, col) => {
                  // Add aisle gap
                  if (col === aisleAfter) {
                    return (
                      <div
                        key={`aisle-${row}-${col}`}
                        className="flex justify-center items-center"
                      >
                        <div className="w-2 h-10 border-l border-dashed border-border"></div>
                      </div>
                    );
                  }

                  const seatId = `${row + 1}${String.fromCharCode(65 + col)}`;
                  const seat = seats[seatId];

                  return seat ? (
                    <motion.button
                      key={seatId}
                      whileTap={{
                        scale: seat.status !== "occupied" ? 0.95 : 1,
                      }}
                      className={cn(
                        "w-10 h-10 rounded-sm flex items-center justify-center text-white font-medium text-xs",
                        getSeatColor(seat)
                      )}
                      onClick={() => onSeatClick(seatId)}
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
              {(row + 1) % 2 === 0 && row < rows - 1 && (
                <div
                  className={`col-span-${seatsPerRow} h-2 flex items-center justify-center my-1`}
                >
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
    </div>
  );
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}
