"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Bus, Calendar, Download, Share2, User } from "lucide-react"
import * as motion from "motion/react"
import Link from "next/link"

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
  bookingReference: "NJ78945612",
  passenger: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 800 123 4567",
  },
}

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
                <CardDescription>
                  Your journey has been booked successfully. Your booking reference is{" "}
                  <span className="font-medium">{journeyData.bookingReference}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                    <span className="font-medium text-primary">{journeyData.logo}</span>
                  </div>
                  <div>
                    <div className="font-medium">{journeyData.company}</div>
                    <div className="text-sm text-muted-foreground">{journeyData.journeyNumber}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{journeyData.from.time}</div>
                    <div className="font-medium">{journeyData.from.city}</div>
                    <div className="text-sm text-muted-foreground">{journeyData.from.terminal}</div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="text-sm text-muted-foreground mb-2">{journeyData.duration}</div>
                    <div className="relative w-24 md:w-32">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-dashed"></span>
                      </div>
                      <div className="relative flex justify-center">
                        <ArrowRight className="bg-background w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{journeyData.to.time}</div>
                    <div className="font-medium">{journeyData.to.city}</div>
                    <div className="text-sm text-muted-foreground">{journeyData.to.terminal}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{journeyData.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{journeyData.bus.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M14.5 22H18a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.5" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M9 18h.01" />
                        <path d="M6 18h.01" />
                        <path d="M12 18h.01" />
                        <path d="M9 14h.01" />
                        <path d="M6 14h.01" />
                        <path d="M12 14h.01" />
                        <path d="M9 10h.01" />
                        <path d="M6 10h.01" />
                        <path d="M12 10h.01" />
                        <rect x="14" y="18" width="8" height="4" rx="1" ry="1" />
                      </svg>
                      <span className="text-sm">{journeyData.luggage}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{journeyData.passenger.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className="text-sm">{journeyData.passenger.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="text-sm">{journeyData.passenger.phone}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total Paid</span>
                  <span className="text-lg">₦{journeyData.price.toLocaleString()}</span>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Important Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>Please arrive at the terminal at least 30 minutes before departure.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>Have your booking reference and ID ready for verification.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>
                        For any changes or cancellations, please contact our customer service at least 24 hours before
                        departure.
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full sm:w-auto" asChild>
                  <Link href="/profile/bookings">
                    <User className="mr-2 h-4 w-4" />
                    View My Bookings
                  </Link>
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download Ticket
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Itinerary
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
