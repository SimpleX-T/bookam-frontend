"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Bus,
  Calendar,
  Download,
  Mail,
  Printer,
  Share2,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { TicketDisplay } from "@/components/tickets/ticket-display";
import { fetchBookingDetails } from "@/lib/api/bookings";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generatePDF } from "@/lib/pdf-generator";

export default function BookingCompletePage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;
  const [activeTab, setActiveTab] = useState("ticket");

  // Fetch booking details
  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => fetchBookingDetails(bookingId),
    // Use dummy data for now
    initialData: {
      id: bookingId,
      reference: "NJ-" + Math.floor(10000000 + Math.random() * 90000000),
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: "card",
      totalAmount: 14850,
      journey: {
        id: "j-" + Math.floor(1000 + Math.random() * 9000),
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
      },
      passengers: [
        {
          id: "p1",
          title: "Mr",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+234 800 123 4567",
          seat: "5A",
          ticketNumber: "NJ-TKT-" + Math.floor(10000 + Math.random() * 90000),
        },
      ],
      checkIn: {
        date: "16th May 2025",
        time: "21:20",
        status: "available",
      },
    },
  });

  const handlePrintTicket = () => {
    window.open(`/print-ticket/${bookingId}`, "_blank");
  };

  const handleViewMobileTicket = () => {
    router.push(`/mobile-ticket/${bookingId}`);
  };

  const handleEmailTicket = () => {
    // In a real app, this would call an API to email the ticket
    alert("Ticket has been emailed to " + booking.passengers[0].email);
  };

  const handleDownloadPDF = async () => {
    if (booking) {
      await generatePDF(booking);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My bookAM Ticket",
          text: `My journey from ${booking.journey.from.city} to ${booking.journey.to.city} on ${booking.journey.date}. Booking reference: ${booking.reference}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported in your browser");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-muted/30 py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-4 w-full max-w-md mb-8" />
              <Card>
                <CardHeader>
                  <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-48 mx-auto mb-2" />
                  <Skeleton className="h-4 w-64 mx-auto" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-24 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-muted/30 py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was a problem loading your booking details. Please try
                  again or contact customer support.
                </AlertDescription>
              </Alert>
              <Button onClick={() => router.push("/")}>Return to Home</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-8 text-center">
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
              <h1 className="text-2xl font-bold">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Your journey has been booked and confirmed. Your booking
                reference is{" "}
                <span className="font-medium">{booking.reference}</span>
              </p>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ticket">Ticket</TabsTrigger>
                <TabsTrigger value="details">Journey Details</TabsTrigger>
              </TabsList>
              <TabsContent value="ticket" className="pt-4">
                <TicketDisplay booking={booking} />
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Journey Details</CardTitle>
                    <CardDescription>
                      Complete information about your journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                        <span className="font-medium text-primary">
                          {booking.journey.logo}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">
                          {booking.journey.company}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {booking.journey.journeyNumber}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold">
                          {booking.journey.from.time}
                        </div>
                        <div className="font-medium">
                          {booking.journey.from.city}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.journey.from.terminal}
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <div className="text-sm text-muted-foreground mb-2">
                          {booking.journey.duration}
                        </div>
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
                        <div className="text-2xl font-bold">
                          {booking.journey.to.time}
                        </div>
                        <div className="font-medium">
                          {booking.journey.to.city}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.journey.to.terminal}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {booking.journey.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bus className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {booking.journey.bus.type}
                          </span>
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
                            <rect
                              x="14"
                              y="18"
                              width="8"
                              height="4"
                              rx="1"
                              ry="1"
                            />
                          </svg>
                          <span className="text-sm">
                            {booking.journey.luggage}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {booking.passengers[0].title}{" "}
                            {booking.passengers[0].firstName}{" "}
                            {booking.passengers[0].lastName}
                          </span>
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
                          <span className="text-sm">
                            {booking.passengers[0].email}
                          </span>
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
                          <span className="text-sm">
                            {booking.passengers[0].phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-medium">
                      <span>Total Paid</span>
                      <span className="text-lg">
                        ₦{booking.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    {booking.journey.stops.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Stops</h3>
                        <div className="space-y-3">
                          {booking.journey.stops.map((stop, index) => (
                            <div
                              key={index}
                              className="bg-muted/50 rounded-lg p-4"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{stop.city}</span>
                                <span className="text-sm text-muted-foreground">
                                  Stop {index + 1}
                                </span>
                              </div>
                              <div className="text-sm">{stop.terminal}</div>
                              <div className="flex justify-between mt-2 text-sm">
                                <span>
                                  Arrival:{" "}
                                  <span className="font-medium">
                                    {stop.arrivalTime}
                                  </span>
                                </span>
                                <span>
                                  Departure:{" "}
                                  <span className="font-medium">
                                    {stop.departureTime}
                                  </span>
                                </span>
                                <span>
                                  Duration:{" "}
                                  <span className="font-medium">
                                    {stop.duration}
                                  </span>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-medium mb-2">
                        Important Information
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>
                            Please arrive at the terminal at least 30 minutes
                            before departure.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>
                            Have your booking reference and ID ready for
                            verification.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>
                            For any changes or cancellations, please contact our
                            customer service at least 24 hours before departure.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Button className="w-full" onClick={handleViewMobileTicket}>
                <User className="mr-2 h-4 w-4" />
                View Mobile Ticket
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePrintTicket}
              >
                <Printer className="mr-2 h-4 w-4" />
                Print Ticket
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDownloadPDF}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleEmailTicket}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Ticket
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Itinerary
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push("/")}
              >
                Book Another Journey
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
