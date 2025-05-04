"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Printer, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

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
  bookingId: "65980165",
  bookingCode: "CT-6018",
  passenger: {
    name: "ANNA ANDERSON",
    title: "Mrs",
    seat: "5A",
  },
  checkIn: {
    date: "16th May 2025",
    time: "21:20",
  },
};

export default function MobileTicketPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ticket");
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My bookAM Ticket",
          text: `My journey from ${journeyData.from.city} to ${journeyData.to.city} on ${journeyData.date}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported in your browser");
    }
  };

  const handleFlipTicket = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (ticketRef.current) {
      ticketRef.current.style.transform =
        activeTab === "ticket" ? "rotateY(180deg)" : "rotateY(0deg)";

      setTimeout(() => {
        setActiveTab(activeTab === "ticket" ? "details" : "ticket");
        setIsAnimating(false);
        if (ticketRef.current) {
          ticketRef.current.style.transform = "rotateY(0deg)";
        }
      }, 300);
    }
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
              Back
            </Button>
            <h1 className="text-2xl font-bold">Mobile Ticket</h1>
            <p className="text-muted-foreground">
              Your journey from {journeyData.from.city} to {journeyData.to.city}
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

              <div
                ref={ticketRef}
                className="w-full transition-transform duration-300"
                style={{ perspective: "1000px" }}
              >
                <TabsContent value="ticket" className="pt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="bg-primary text-primary-foreground p-4 text-center">
                          <h2 className="text-xl font-bold">bookAM</h2>
                          <p className="text-sm">E-Ticket</p>
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                                <span className="font-medium text-primary">
                                  {journeyData.logo}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">
                                  {journeyData.company}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {journeyData.journeyNumber}
                                </div>
                              </div>
                            </div>
                            <Badge>{journeyData.passenger.seat}</Badge>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {journeyData.from.time}
                              </div>
                              <div className="text-sm font-medium">
                                {journeyData.from.city}
                              </div>
                            </div>
                            <div className="flex flex-col items-center px-4">
                              <div className="text-xs text-muted-foreground mb-1">
                                {journeyData.duration}
                              </div>
                              <div className="relative w-16">
                                <div className="absolute inset-0 flex items-center">
                                  <span className="w-full border-t border-dashed"></span>
                                </div>
                                <div className="relative flex justify-center">
                                  <ArrowRight className="bg-background w-4 h-4" />
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {journeyData.to.time}
                              </div>
                              <div className="text-sm font-medium">
                                {journeyData.to.city}
                              </div>
                            </div>
                          </div>

                          <div className="text-center text-sm">
                            <div className="font-medium">
                              {journeyData.date}
                            </div>
                            <div className="text-muted-foreground">
                              Check-in: {journeyData.checkIn.date} at{" "}
                              {journeyData.checkIn.time}
                            </div>
                          </div>

                          <Separator />

                          <div className="text-center">
                            <div className="text-sm font-medium mb-1">
                              Passenger
                            </div>
                            <div className="text-lg font-bold">
                              {journeyData.passenger.name}
                            </div>
                          </div>

                          <div className="flex justify-center">
                            <div className="h-32 w-full bg-white flex items-center justify-center">
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
                                <rect
                                  x="106"
                                  y="10"
                                  width="1"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="109"
                                  y="10"
                                  width="2"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="114"
                                  y="10"
                                  width="3"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="119"
                                  y="10"
                                  width="1"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="122"
                                  y="10"
                                  width="2"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="127"
                                  y="10"
                                  width="3"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="132"
                                  y="10"
                                  width="1"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="135"
                                  y="10"
                                  width="2"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="140"
                                  y="10"
                                  width="1"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="143"
                                  y="10"
                                  width="3"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="148"
                                  y="10"
                                  width="2"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="152"
                                  y="10"
                                  width="1"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="155"
                                  y="10"
                                  width="2"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="160"
                                  y="10"
                                  width="3"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="165"
                                  y="10"
                                  width="1"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="168"
                                  y="10"
                                  width="2"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="173"
                                  y="10"
                                  width="3"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="178"
                                  y="10"
                                  width="1"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="181"
                                  y="10"
                                  width="2"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="186"
                                  y="10"
                                  width="1"
                                  height="80"
                                  fill="black"
                                />
                                <rect
                                  x="189"
                                  y="10"
                                  width="2"
                                  height="80"
                                  fill="black"
                                />
                              </svg>
                            </div>
                          </div>

                          <div className="text-center text-sm">
                            <div className="font-medium">
                              Booking ID: {journeyData.bookingId}
                            </div>
                            <div className="text-muted-foreground">
                              Booking Code: {journeyData.bookingCode}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleFlipTicket}
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="details" className="pt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">
                            Journey Details
                          </h3>
                          <Badge>{journeyData.passenger.seat}</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              From
                            </span>
                            <span className="text-sm font-medium">
                              {journeyData.from.city}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Terminal
                            </span>
                            <span className="text-sm">
                              {journeyData.from.terminal}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Departure
                            </span>
                            <span className="text-sm">
                              {journeyData.date}, {journeyData.from.time}
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              To
                            </span>
                            <span className="text-sm font-medium">
                              {journeyData.to.city}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Terminal
                            </span>
                            <span className="text-sm">
                              {journeyData.to.terminal}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Arrival
                            </span>
                            <span className="text-sm">
                              {journeyData.date}, {journeyData.to.time}
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Journey Number
                            </span>
                            <span className="text-sm">
                              {journeyData.journeyNumber}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Bus Type
                            </span>
                            <span className="text-sm">
                              {journeyData.bus.type}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Seating
                            </span>
                            <span className="text-sm">
                              {journeyData.bus.seating}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Features
                            </span>
                            <span className="text-sm">
                              {journeyData.bus.features}
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Passenger
                            </span>
                            <span className="text-sm">
                              {journeyData.passenger.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Seat
                            </span>
                            <span className="text-sm">
                              {journeyData.passenger.seat}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Luggage
                            </span>
                            <span className="text-sm">
                              {journeyData.luggage}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Hand Luggage
                            </span>
                            <span className="text-sm">
                              {journeyData.handLuggage}
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Booking ID
                            </span>
                            <span className="text-sm">
                              {journeyData.bookingId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Booking Code
                            </span>
                            <span className="text-sm">
                              {journeyData.bookingCode}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Check-in
                            </span>
                            <span className="text-sm">
                              {journeyData.checkIn.date} at{" "}
                              {journeyData.checkIn.time}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleFlipTicket}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        View Ticket
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
