"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2 } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import PassengerForm from "@/components/multi-passenger/passenger-form"

export default function MultiPassengerPageClient() {
  // In a real app, this would come from the route or context
  const journeyDetails = {
    from: "Lagos",
    to: "Abuja",
    date: "May 15, 2025",
    time: "10:30 AM",
    busType: "Executive",
    price: 12500,
    selectedSeats: ["A3", "A4"],
  }

  return (
    <div className="container max-w-7xl py-6 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight">Passenger Details</h1>
        <p className="text-muted-foreground mt-2">
          Enter details for all passengers traveling from {journeyDetails.from} to {journeyDetails.to}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="bg-muted/50">
              <CardTitle>Passenger 1 (Lead Passenger)</CardTitle>
              <CardDescription>
                Seat {journeyDetails.selectedSeats[0]} • Lead passenger details will be used for booking confirmation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <PassengerForm isLead={true} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Passenger 2</CardTitle>
                <CardDescription>Seat {journeyDetails.selectedSeats[1]}</CardDescription>
              </div>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <PassengerForm isLead={false} />
            </CardContent>
          </Card>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" className="w-full" disabled>
              <Plus className="mr-2 h-4 w-4" />
              Add Another Passenger
              <span className="ml-2 text-xs text-muted-foreground">(No more seats selected)</span>
            </Button>
          </motion.div>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your booking details</CardDescription>
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
                  <span className="font-medium">{journeyDetails.selectedSeats.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Passengers</span>
                  <span className="font-medium">{journeyDetails.selectedSeats.length}</span>
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
                <span>₦{(journeyDetails.price * journeyDetails.selectedSeats.length + 500).toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button asChild className="w-full">
                <Link href={`/booking/steps/payment`}>
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/booking/steps/seat-selection`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Seat Selection
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
