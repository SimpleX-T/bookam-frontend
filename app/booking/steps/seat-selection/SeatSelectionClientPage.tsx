"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "motion/react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Info } from "lucide-react"
import BusLayout from "@/components/seat-selection/bus-layout"

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
}

// Seat types and their prices
const seatTypes = {
  standard: {
    name: "Standard",
    price: 0,
    color: "bg-blue-500",
  },
  premium: {
    name: "Premium",
    price: 2000,
    color: "bg-purple-500",
  },
  business: {
    name: "Business",
    price: 5000,
    color: "bg-amber-500",
  },
}

// Generate bus layout
const generateBusLayout = () => {
  // 44-seater bus with 11 rows, 4 seats per row (2-2 configuration)
  const rows = 11
  const seatsPerRow = 4
  const layout = []

  // Random occupied seats (about 30% of seats)
  const occupiedSeats = new Set()
  const totalSeats = rows * seatsPerRow
  const occupiedCount = Math.floor(totalSeats * 0.3)

  while (occupiedSeats.size < occupiedCount) {
    const randomRow = Math.floor(Math.random() * rows) + 1
    const randomSeat = String.fromCharCode(65 + Math.floor(Math.random() * seatsPerRow))
    occupiedSeats.add(`${randomRow}${randomSeat}`)
  }

  // Generate seat types
  const seatTypeMap = {}
  for (let row = 1; row <= rows; row++) {
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const seatLetter = String.fromCharCode(65 + seat)
      const seatId = `${row}${seatLetter}`

      // First 2 rows are business class
      if (row <= 2) {
        seatTypeMap[seatId] = "business"
      }
      // Next 3 rows are premium
      else if (row <= 5) {
        seatTypeMap[seatId] = "premium"
      }
      // Rest are standard
      else {
        seatTypeMap[seatId] = "standard"
      }
    }
  }

  // Create layout
  for (let row = 1; row <= rows; row++) {
    const rowSeats = []
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const seatLetter = String.fromCharCode(65 + seat)
      const seatId = `${row}${seatLetter}`

      rowSeats.push({
        id: seatId,
        row: row,
        seat: seatLetter,
        position: seat < seatsPerRow / 2 ? "left" : "right",
        occupied: occupiedSeats.has(seatId),
        type: seatTypeMap[seatId],
      })
    }
    layout.push(rowSeats)
  }

  return layout
}

export default function SeatSelectionClientPage() {
  // In a real app, this would come from the route or context
  const journeyId = "j123456"
  const journeyDetails = {
    from: "Lagos",
    to: "Abuja",
    date: "May 15, 2025",
    time: "10:30 AM",
    busType: "Executive",
    price: 12500,
  }
  const router = useRouter()
  const [busLayout, setBusLayout] = useState<any[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [passengerCount, setPassengerCount] = useState(1)
  const [deck, setDeck] = useState("lower")

  useEffect(() => {
    setBusLayout(generateBusLayout())
  }, [])

  const handleSeatClick = (seatId: string, occupied: boolean) => {
    if (occupied) return

    setSelectedSeats((prev) => {
      // If already selected, remove it
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId)
      }

      // If we already have enough seats selected, remove the first one
      if (prev.length >= passengerCount) {
        return [...prev.slice(1), seatId]
      }

      // Otherwise add it
      return [...prev, seatId]
    })
  }

  const getSeatPrice = (seatId: string) => {
    const seat = busLayout.flat().find((s) => s.id === seatId)
    if (!seat) return 0
    return seatTypes[seat.type].price
  }

  const getTotalPrice = () => {
    const baseFare = journeyData.totalPrice
    const extraFees = selectedSeats.reduce((total, seatId) => {
      return total + getSeatPrice(seatId)
    }, 0)
    return baseFare + extraFees
  }

  const getSeatType = (seatId: string) => {
    const seat = busLayout.flat().find((s) => s.id === seatId)
    if (!seat) return null
    return seatTypes[seat.type]
  }

  return (
    <div className="container max-w-7xl py-6 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight">Seat Selection</h1>
        <p className="text-muted-foreground mt-2">
          Select your preferred seat(s) for your journey from {journeyDetails.from} to {journeyDetails.to}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center justify-between">
                <span>Select Your Seat</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="w-80">
                      <p>Click on an available seat to select it. You can select multiple seats for group bookings.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription>Bus layout may vary slightly from the actual vehicle</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm bg-green-500 mr-2"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm bg-gray-400 mr-2"></div>
                  <span className="text-sm">Occupied</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm bg-primary mr-2"></div>
                  <span className="text-sm">Selected</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <BusLayout />
              </motion.div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Journey Summary</CardTitle>
              <CardDescription>Review your journey details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From</span>
                  <span className="font-medium">{journeyDetails.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To</span>
                  <span className="font-medium">{journeyDetails.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{journeyDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{journeyDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bus Type</span>
                  <span className="font-medium">{journeyDetails.busType}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Selected Seats</span>
                  <span className="font-medium">2 (A3, A4)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per seat</span>
                  <span className="font-medium">₦{journeyDetails.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking fee</span>
                  <span className="font-medium">₦500</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₦{(journeyDetails.price * 2 + 500).toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button asChild className="w-full">
                <Link href={`/booking/steps/multi-passenger`}>
                  Continue to Passenger Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/journey/${journeyId}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Journey Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
