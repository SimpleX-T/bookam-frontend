"use client";

import { useRef, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer } from "lucide-react";
import { motion } from "motion/react";
import { fetchBookingDetails } from "@/lib/api/bookings";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PrintTicketPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const printRef = useRef<HTMLDivElement>(null);
  const bookingId = params.id as string;
  const autoPrint = searchParams.get("print") === "true";

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

  const handlePrint = () => {
    window.print();
  };

  // Auto-print when the page loads in print mode
  useEffect(() => {
    if (autoPrint) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [autoPrint]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="print:hidden"></div>
        <main className="flex-1 bg-muted/30 print:bg-white">
          <div className="container py-6 print:py-0">
            <div className="mb-8 print:hidden">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-8 w-64 mx-auto mb-4" />
              <Skeleton className="h-4 w-48 mx-auto mb-8" />
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-full mb-6" />
                  <Skeleton className="h-32 w-full mb-6" />
                  <Skeleton className="h-24 w-full mb-6" />
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer className="print:hidden" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="print:hidden"></div>
        <main className="flex-1 bg-muted/30 print:bg-white">
          <div className="container py-6 print:py-0">
            <div className="mb-8 print:hidden">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
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
        <Footer className="print:hidden" />
      </div>
    );
  }

  const passenger = booking.passengers[0];
  const journey = booking.journey;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="print:hidden"></div>
      <main className="flex-1 bg-muted/30 print:bg-white">
        <div className="container py-6 print:py-0">
          <div className="mb-8 print:hidden">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Print Ticket</h1>
              <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
            ref={printRef}
          >
            <div className="print:py-10">
              <div className="text-center mb-8 print:mb-6">
                <h1 className="text-3xl font-bold text-primary">bookAM</h1>
                <p className="text-muted-foreground">
                  E-Ticket / Boarding Pass
                </p>
              </div>

              <Card className="mb-6 print:shadow-none print:border-none">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-md">
                        <span className="font-medium text-primary text-lg">
                          {journey.logo}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {journey.company}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {journey.journeyNumber}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Booking Reference
                      </div>
                      <div className="font-bold">{booking.reference}</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        From
                      </div>
                      <div className="font-bold text-xl">
                        {journey.from.city}
                      </div>
                      <div className="text-sm">{journey.from.terminal}</div>
                      <div className="text-lg font-bold mt-2">
                        {journey.from.time}
                      </div>
                      <div className="text-sm">{journey.date}</div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <div className="text-sm text-muted-foreground mb-1">
                        Duration
                      </div>
                      <div className="font-bold">{journey.duration}</div>
                      <div className="w-full h-0.5 bg-dashed my-2 relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                          {journey.stops.length}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {journey.stops.length} stop
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        To
                      </div>
                      <div className="font-bold text-xl">{journey.to.city}</div>
                      <div className="text-sm">{journey.to.terminal}</div>
                      <div className="text-lg font-bold mt-2">
                        {journey.to.time}
                      </div>
                      <div className="text-sm">{journey.date}</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Passenger
                      </div>
                      <div className="font-bold">
                        {passenger.title} {passenger.firstName}{" "}
                        {passenger.lastName}
                      </div>
                      <div className="text-sm">Seat {passenger.seat}</div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Bus Type
                      </div>
                      <div className="font-bold">{journey.bus.type}</div>
                      <div className="text-sm">{journey.bus.seating}</div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Luggage
                      </div>
                      <div className="font-bold">{journey.luggage}</div>
                      <div className="text-sm">
                        Hand luggage: {journey.handLuggage}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Check-in
                      </div>
                      <div className="font-bold">
                        {booking.checkIn.date} at {booking.checkIn.time}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Please arrive at least 30 minutes before departure
                      </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                      <div className="h-32 w-64 bg-white border flex items-center justify-center">
                        <svg
                          width="200"
                          height="100"
                          viewBox="0 0 200 100"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="200" height="100" fill="white" />
                          <rect
                            x="10"
                            y="10"
                            width="2"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="15"
                            y="10"
                            width="1"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="18"
                            y="10"
                            width="2"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="22"
                            y="10"
                            width="3"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="27"
                            y="10"
                            width="1"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="30"
                            y="10"
                            width="2"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="35"
                            y="10"
                            width="3"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="40"
                            y="10"
                            width="1"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="43"
                            y="10"
                            width="2"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="48"
                            y="10"
                            width="1"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="51"
                            y="10"
                            width="3"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="56"
                            y="10"
                            width="2"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="60"
                            y="10"
                            width="1"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="63"
                            y="10"
                            width="3"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="68"
                            y="10"
                            width="2"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="72"
                            y="10"
                            width="1"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="75"
                            y="10"
                            width="2"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="80"
                            y="10"
                            width="3"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="85"
                            y="10"
                            width="1"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="88"
                            y="10"
                            width="2"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="93"
                            y="10"
                            width="3"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="98"
                            y="10"
                            width="1"
                            height="80"
                            fill="black"
                          />
                          <rect
                            x="101"
                            y="10"
                            width="2"
                            height="80"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t pt-4">
                    <h3 className="font-medium mb-2">Important Information</h3>
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

              <div className="text-center text-sm text-muted-foreground print:mt-8">
                <p>
                  This e-ticket is valid only with a photo ID. Please keep it
                  safe.
                </p>
                <p className="mt-1">
                  © {new Date().getFullYear()} bookAM. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer className="print:hidden" />
    </div>
  );
}
