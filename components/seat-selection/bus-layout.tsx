"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type SeatStatus = "available" | "occupied" | "selected"

interface Seat {
  id: string
  status: SeatStatus
  price: number
}

export default function BusLayout() {
  // Generate dummy seat data
  const generateSeats = (): Record<string, Seat> => {
    const seats: Record<string, Seat> = {}

    // Generate seats for rows A-K (excluding I) and columns 1-4
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"]

    rows.forEach((row) => {
      for (let col = 1; col <= 4; col++) {
        const id = `${row}${col}`

        // Randomly mark some seats as occupied (about 30%)
        const randomStatus = Math.random() < 0.3 ? "occupied" : "available"

        seats[id] = {
          id,
          status: randomStatus,
          price: 12500, // Standard price
        }
      }
    })

    return seats
  }

  const [seats, setSeats] = useState<Record<string, Seat>>(generateSeats())

  const handleSeatClick = (seatId: string) => {
    const seat = seats[seatId]

    if (seat.status === "occupied") return

    setSeats({
      ...seats,
      [seatId]: {
        ...seat,
        status: seat.status === "available" ? "selected" : "available",
      },
    })
  }

  const getSeatColor = (status: SeatStatus) => {
    switch (status) {
      case "available":
        return "bg-green-500 hover:bg-green-600"
      case "occupied":
        return "bg-gray-400 cursor-not-allowed"
      case "selected":
        return "bg-primary hover:bg-primary/90"
    }
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Bus outline */}
      <div className="relative bg-muted rounded-3xl p-8 pb-16">
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
        <div className="grid grid-cols-4 gap-3 relative">
          {/* Left side seats (columns 1-2) */}
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {Object.values(seats)
              .filter((seat) => Number.parseInt(seat.id.slice(1)) <= 2)
              .map((seat) => (
                <motion.button
                  key={seat.id}
                  whileTap={{ scale: seat.status !== "occupied" ? 0.95 : 1 }}
                  className={cn(
                    "w-12 h-12 rounded-sm flex items-center justify-center text-white font-medium",
                    getSeatColor(seat.status),
                  )}
                  onClick={() => handleSeatClick(seat.id)}
                  disabled={seat.status === "occupied"}
                >
                  {seat.id}
                </motion.button>
              ))}
          </div>

          {/* Aisle */}
          <div className="col-span-4 h-6 flex items-center justify-center my-2">
            <div className="w-full h-1 border-t-2 border-dashed border-border"></div>
          </div>

          {/* Right side seats (columns 3-4) */}
          <div className="col-span-2"></div>
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {Object.values(seats)
              .filter((seat) => Number.parseInt(seat.id.slice(1)) >= 3)
              .map((seat) => (
                <motion.button
                  key={seat.id}
                  whileTap={{ scale: seat.status !== "occupied" ? 0.95 : 1 }}
                  className={cn(
                    "w-12 h-12 rounded-sm flex items-center justify-center text-white font-medium",
                    getSeatColor(seat.status),
                  )}
                  onClick={() => handleSeatClick(seat.id)}
                  disabled={seat.status === "occupied"}
                >
                  {seat.id}
                </motion.button>
              ))}
          </div>
        </div>
      </div>

      {/* Bus front */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-muted border-2 border-border rounded-b-full flex items-center justify-center">
        <span className="text-xs">Front</span>
      </div>
    </div>
  )
}
