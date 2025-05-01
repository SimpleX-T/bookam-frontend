"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Mail, Printer, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { fetchBookingDetails } from "@/lib/api/bookings";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TicketDisplay } from "@/components/tickets/ticket-display";
import { generatePDF } from "@/lib/pdf-generator";

export default function MobileTicketPage() {
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
    window.open(`/print-ticket/${bookingId}?print=true`, "_blank");
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
            <div className="mb-8">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="h-10 w-full max-w-md mb-4" />
              <Skeleton className="h-96 w-full max-w-md" />
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
            <div className="mb-8">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
            <div className="max-w-md mx-auto">
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was a problem loading your ticket. Please try again or
                  contact customer support.
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
        <div className="container py-6">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Mobile Ticket</h1>
            <p className="text-muted-foreground">
              Your journey from {booking.journey.from.city} to{" "}
              {booking.journey.to.city}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-md"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ticket">Ticket</TabsTrigger>
                <TabsTrigger value="details">Journey Details</TabsTrigger>
              </TabsList>

              <div className="w-full pt-4">
                <TabsContent value="ticket" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <TicketDisplay booking={booking} />

                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrintTicket}
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadPDF}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEmailTicket}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="details" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="bg-card rounded-lg border shadow-sm">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">
                            Journey Details
                          </h3>
                          <div className="text-sm font-medium">
                            Ref: {booking.reference}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-sm text-muted-foreground">
                                From
                              </div>
                              <div className="font-medium">
                                {booking.journey.from.city}
                              </div>
                              <div className="text-sm">
                                {booking.journey.from.terminal}
                              </div>
                              <div className="text-sm font-medium mt-1">
                                {booking.journey.from.time}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">
                                To
                              </div>
                              <div className="font-medium">
                                {booking.journey.to.city}
                              </div>
                              <div className="text-sm">
                                {booking.journey.to.terminal}
                              </div>
                              <div className="text-sm font-medium mt-1">
                                {booking.journey.to.time}
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Date
                                </div>
                                <div className="text-sm">
                                  {booking.journey.date}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Duration
                                </div>
                                <div className="text-sm">
                                  {booking.journey.duration}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Passenger
                                </div>
                                <div className="text-sm">
                                  {booking.passengers[0].title}{" "}
                                  {booking.passengers[0].firstName}{" "}
                                  {booking.passengers[0].lastName}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Seat
                                </div>
                                <div className="text-sm">
                                  {booking.passengers[0].seat}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Bus Type
                                </div>
                                <div className="text-sm">
                                  {booking.journey.bus.type}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Seating
                                </div>
                                <div className="text-sm">
                                  {booking.journey.bus.seating}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Check-in
                                </div>
                                <div className="text-sm">
                                  {booking.checkIn.date} at{" "}
                                  {booking.checkIn.time}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Ticket Number
                                </div>
                                <div className="text-sm">
                                  {booking.passengers[0].ticketNumber}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrintTicket}
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadPDF}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEmailTicket}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
