"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import Link from "next/link";

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
  bookingId: "65980165",
  bookingCode: "CT-6018",
  passenger: {
    name: "ANNA ANDERSON",
    title: "Mrs",
  },
  checkIn: {
    date: "9th Feb 2023",
    time: "21:20",
  },
  secondLeg: {
    bookingId: "59952235",
    bookingCode: "CT-5923",
    from: {
      city: "Las Vegas",
      terminal: "Central Terminal, Las Vegas",
      time: "2:25",
    },
    to: {
      city: "Los Angeles",
      terminal: "Downtown Terminal, Los Angeles",
      time: "7:40",
    },
    duration: "5h15m",
    date: "10th Feb 2023",
    checkIn: {
      date: "10th Feb 2023",
      time: "1:40",
    },
  },
};

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">My booking</h1>
            <div className="relative flex items-center justify-between max-w-md mb-6">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  1
                </div>
                <span className="text-sm mt-1 text-primary">Booking</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  2
                </div>
                <span className="text-sm mt-1 text-primary">Purchase</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  3
                </div>
                <span className="text-sm mt-1 text-primary">
                  Get your E-ticket
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                    <h2 className="text-lg font-medium text-primary">
                      Your journey is booked successfully!
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Present E-ticket and valid identification at check-in
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
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
                        </div>
                      </div>

                      <div className="text-sm">
                        <div className="font-medium mb-1">
                          Passenger: {journeyData.passenger.name}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
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
                          >
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          <span>Economy</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                        <div className="text-2xl font-bold">
                          {journeyData.from.time}
                        </div>
                        <div>
                          <div className="font-medium">
                            {journeyData.from.city} (
                            {journeyData.from.city
                              .substring(0, 3)
                              .toUpperCase()}
                            )
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {journeyData.from.terminal}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {journeyData.date}
                          </div>
                        </div>

                        <div className="text-2xl font-bold">
                          {journeyData.to.time}
                        </div>
                        <div>
                          <div className="font-medium">
                            {journeyData.to.city} (
                            {journeyData.to.city.substring(0, 3).toUpperCase()})
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {journeyData.to.terminal}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {journeyData.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
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
                        >
                          <path d="M12 8v4l3 3" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>{journeyData.duration}</span>
                      </div>

                      <div className="flex items-center gap-4">
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
                          <span className="text-sm">{journeyData.luggage}</span>
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
                          >
                            <path d="M18 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2" />
                            <path d="M12 19v3" />
                            <path d="M12 11v-4" />
                            <rect width="12" height="8" x="6" y="11" rx="2" />
                            <path d="M18 11V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5" />
                          </svg>
                          <span className="text-sm">
                            {journeyData.handLuggage}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <div className="font-medium">
                          Check-in: {journeyData.checkIn.date} at{" "}
                          {journeyData.checkIn.time}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          *All time displayed are local
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4 flex flex-col justify-between">
                      <div className="text-center mb-4">
                        <div className="text-lg font-bold text-primary">
                          bookAM
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Booking ID
                          </div>
                          <div className="text-lg font-bold">
                            {journeyData.bookingId}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-muted-foreground">
                            Bus Booking Code
                          </div>
                          <div className="text-lg font-bold">
                            {journeyData.bookingCode}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="h-12 w-full bg-white flex items-center justify-center">
                          <svg
                            width="120"
                            height="40"
                            viewBox="0 0 120 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="120" height="40" fill="white" />
                            <rect
                              x="10"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="15"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="18"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="22"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="27"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="30"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="35"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="40"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="43"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="48"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="51"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="56"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="60"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="63"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="68"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="72"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="75"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="80"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="85"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="88"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="93"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="98"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="101"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="106"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="109"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
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
                        </div>
                      </div>

                      <div className="text-sm">
                        <div className="font-medium mb-1">
                          Passenger: {journeyData.passenger.name}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
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
                          >
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          <span>Economy</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                        <div className="text-2xl font-bold">
                          {journeyData.secondLeg.from.time}
                        </div>
                        <div>
                          <div className="font-medium">
                            {journeyData.secondLeg.from.city} (
                            {journeyData.secondLeg.from.city
                              .substring(0, 3)
                              .toUpperCase()}
                            )
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {journeyData.secondLeg.from.terminal}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {journeyData.secondLeg.date}
                          </div>
                        </div>

                        <div className="text-2xl font-bold">
                          {journeyData.secondLeg.to.time}
                        </div>
                        <div>
                          <div className="font-medium">
                            {journeyData.secondLeg.to.city} (
                            {journeyData.secondLeg.to.city
                              .substring(0, 3)
                              .toUpperCase()}
                            )
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {journeyData.secondLeg.to.terminal}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {journeyData.secondLeg.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
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
                        >
                          <path d="M12 8v4l3 3" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>{journeyData.secondLeg.duration}</span>
                      </div>

                      <div className="flex items-center gap-4">
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
                          <span className="text-sm">{journeyData.luggage}</span>
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
                          >
                            <path d="M18 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2" />
                            <path d="M12 19v3" />
                            <path d="M12 11v-4" />
                            <rect width="12" height="8" x="6" y="11" rx="2" />
                            <path d="M18 11V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5" />
                          </svg>
                          <span className="text-sm">
                            {journeyData.handLuggage}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <div className="font-medium">
                          Check-in: {journeyData.secondLeg.checkIn.date} at{" "}
                          {journeyData.secondLeg.checkIn.time}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          *All time displayed are local
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4 flex flex-col justify-between">
                      <div className="text-center mb-4">
                        <div className="text-lg font-bold text-primary">
                          bookAM
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Booking ID
                          </div>
                          <div className="text-lg font-bold">
                            {journeyData.secondLeg.bookingId}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-muted-foreground">
                            Bus Booking Code
                          </div>
                          <div className="text-lg font-bold">
                            {journeyData.secondLeg.bookingCode}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="h-12 w-full bg-white flex items-center justify-center">
                          <svg
                            width="120"
                            height="40"
                            viewBox="0 0 120 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="120" height="40" fill="white" />
                            <rect
                              x="10"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="15"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="18"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="22"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="27"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="30"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="35"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="40"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="43"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="48"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="51"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="56"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="60"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="63"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="68"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="72"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="75"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="80"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="85"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="88"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="93"
                              y="5"
                              width="3"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="98"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="101"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="106"
                              y="5"
                              width="1"
                              height="30"
                              fill="black"
                            />
                            <rect
                              x="109"
                              y="5"
                              width="2"
                              height="30"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/profile/bookings">Send to my e-mail</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-primary">
                      Price details
                    </h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Adult basic fee</span>
                      <span>₦{journeyData.adultBasicFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{journeyData.tax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Regular total price</span>
                      <span>
                        ₦{journeyData.regularTotalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-primary">
                      <span>Save</span>
                      <span>-₦{journeyData.save.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg text-primary">
                      ₦{journeyData.totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="font-medium">Houston - Los Angeles</h3>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {journeyData.logo}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          Cloudy Transit
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        HOU - LAS
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 8v4l3 3" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>Economy</span>
                      </div>

                      <div className="flex justify-between text-sm mb-1">
                        <span>23:15 - 1:25</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          <span>2h10m</span>
                        </span>
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className="text-primary">Refundable</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" x2="19" y1="12" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <span>Direct</span>
                        </span>
                      </div>
                      <div className="text-xs text-primary">
                        Reschedule Available
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {journeyData.logo}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          Cloudy Transit
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        LAS - LAX
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 8v4l3 3" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>Economy</span>
                      </div>

                      <div className="flex justify-between text-sm mb-1">
                        <span>2:25 - 7:40</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          <span>5h15m</span>
                        </span>
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className="text-primary">Refundable</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" x2="19" y1="12" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <span>Direct</span>
                        </span>
                      </div>
                      <div className="text-xs text-primary">
                        Reschedule Available
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
