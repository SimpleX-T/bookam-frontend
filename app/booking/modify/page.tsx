"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { CalendarIcon, Search, ArrowRight, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import Link from "next/link"

// Dummy bookings data
const bookingsData = [
  {
    id: "1",
    reference: "NJ78945612",
    status: "upcoming",
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
    date: "May 16, 2025",
    price: 14850,
    passenger: {
      name: "ANNA ANDERSON",
      seat: "5A",
    },
  },
  {
    id: "2",
    reference: "NJ78945613",
    status: "upcoming",
    company: "HorizonJet",
    logo: "HJ",
    from: {
      city: "Lagos",
      terminal: "Ojota Terminal, Lagos",
      time: "08:30",
    },
    to: {
      city: "Ibadan",
      terminal: "Challenge Terminal, Ibadan",
      time: "10:45",
    },
    duration: "2h 15m",
    journeyNumber: "HJ-2045",
    date: "June 10, 2025",
    price: 5500,
    passenger: {
      name: "ANNA ANDERSON",
      seat: "12B",
    },
  },
]

export default function ModifyBookingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("find")
  const [bookingReference, setBookingReference] = useState("")
  const [lastName, setLastName] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [modifyType, setModifyType] = useState<"date" | "passenger" | "seat" | null>(null)
  const [newDate, setNewDate] = useState<Date | undefined>(new Date())
  const [priceDifference, setPriceDifference] = useState(0)

  const handleSearch = () => {
    // Simulate finding a booking
    if (bookingReference && lastName) {
      const booking = bookingsData.find((b) => b.reference === bookingReference)
      if (booking) {
        setSelectedBooking(booking)
        setActiveTab("select")
      } else {
        alert("Booking not found. Please check your reference number and last name.")
      }
    }
  }

  const handleModifySelection = (type: "date" | "passenger" | "seat") => {
    setModifyType(type)
    setActiveTab("modify")

    // Simulate price difference for date change
    if (type === "date") {
      // Random price difference between -2000 and 5000
      setPriceDifference(Math.floor(Math.random() * 7000) - 2000)
    }
  }

  const handleConfirmModification = () => {
    setActiveTab("confirm")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Modify Your Booking</h1>
            <p className="text-muted-foreground">
              Change your journey details, passenger information, or seat selection
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="find" disabled={activeTab !== "find" && activeTab !== "select"}>
                  Find Booking
                </TabsTrigger>
                <TabsTrigger value="modify" disabled={activeTab !== "modify" && activeTab !== "select"}>
                  Modify Details
                </TabsTrigger>
                <TabsTrigger value="confirm" disabled={activeTab !== "confirm"}>
                  Confirm Changes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="find" className="pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Find your booking</CardTitle>
                      <CardDescription>Enter your booking reference and last name to find your journey</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bookingReference">Booking Reference</Label>
                        <Input
                          id="bookingReference"
                          placeholder="e.g. NJ78945612"
                          value={bookingReference}
                          onChange={(e) => setBookingReference(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="e.g. ANDERSON"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSearch} className="w-full">
                        <Search className="mr-2 h-4 w-4" />
                        Find Booking
                      </Button>
                    </CardFooter>
                  </Card>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Example bookings for demo:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Booking Reference:</span>
                        <span>NJ78945612</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Last Name:</span>
                        <span>ANDERSON</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="select" className="pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedBooking && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Select what to modify</CardTitle>
                        <CardDescription>Choose what you would like to change about your booking</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                              <span className="font-medium text-primary">{selectedBooking.logo}</span>
                            </div>
                            <div>
                              <div className="font-medium">{selectedBooking.company}</div>
                              <div className="text-sm text-muted-foreground">Ref: {selectedBooking.reference}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 mb-4">
                            <div className="space-y-1">
                              <div className="text-lg font-bold">{selectedBooking.from.time}</div>
                              <div className="font-medium">{selectedBooking.from.city}</div>
                              <div className="text-xs text-muted-foreground">{selectedBooking.from.terminal}</div>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                              <div className="text-xs text-muted-foreground mb-1">{selectedBooking.duration}</div>
                              <div className="relative w-16 md:w-24">
                                <div className="absolute inset-0 flex items-center">
                                  <span className="w-full border-t border-dashed"></span>
                                </div>
                                <div className="relative flex justify-center">
                                  <ArrowRight className="bg-background w-4 h-4" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="text-lg font-bold">{selectedBooking.to.time}</div>
                              <div className="font-medium">{selectedBooking.to.city}</div>
                              <div className="text-xs text-muted-foreground">{selectedBooking.to.terminal}</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <span>{selectedBooking.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
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
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                              </svg>
                              <span>{selectedBooking.passenger.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
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
                                <path d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                                <path d="M3 9v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
                                <path d="M12 13h.01" />
                              </svg>
                              <span>Seat {selectedBooking.passenger.seat}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => handleModifySelection("date")}
                          >
                            <CardContent className="p-4 text-center">
                              <CalendarIcon className="h-10 w-10 mx-auto mb-2 text-primary" />
                              <h3 className="font-medium">Change Date</h3>
                              <p className="text-sm text-muted-foreground">Reschedule your journey</p>
                            </CardContent>
                          </Card>

                          <Card
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => handleModifySelection("passenger")}
                          >
                            <CardContent className="p-4 text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mx-auto mb-2 text-primary"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                              <h3 className="font-medium">Change Passenger</h3>
                              <p className="text-sm text-muted-foreground">Update passenger details</p>
                            </CardContent>
                          </Card>

                          <Card
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => handleModifySelection("seat")}
                          >
                            <CardContent className="p-4 text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mx-auto mb-2 text-primary"
                              >
                                <path d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                                <path d="M3 9v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
                                <path d="M12 13h.01" />
                              </svg>
                              <h3 className="font-medium">Change Seat</h3>
                              <p className="text-sm text-muted-foreground">Select a different seat</p>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" onClick={() => setActiveTab("find")} className="w-full">
                          Back to Search
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="modify" className="pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedBooking && modifyType && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {modifyType === "date" && "Change Journey Date"}
                          {modifyType === "passenger" && "Update Passenger Details"}
                          {modifyType === "seat" && "Select a Different Seat"}
                        </CardTitle>
                        <CardDescription>
                          {modifyType === "date" && "Select a new date for your journey"}
                          {modifyType === "passenger" && "Update the passenger information"}
                          {modifyType === "seat" && "Choose a new seat for your journey"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {modifyType === "date" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Current Date</Label>
                              <div className="p-2 bg-muted rounded-md">
                                <span className="font-medium">{selectedBooking.date}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>New Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !newDate && "text-muted-foreground",
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {newDate ? format(newDate, "PPP") : <span>Pick a date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={newDate}
                                    onSelect={setNewDate}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            {priceDifference !== 0 && (
                              <div
                                className={cn(
                                  "p-4 rounded-md flex items-start gap-2",
                                  priceDifference > 0
                                    ? "bg-amber-50 dark:bg-amber-950/30"
                                    : "bg-green-50 dark:bg-green-950/30",
                                )}
                              >
                                <AlertCircle
                                  className={cn(
                                    "h-5 w-5 mt-0.5",
                                    priceDifference > 0
                                      ? "text-amber-600 dark:text-amber-400"
                                      : "text-green-600 dark:text-green-400",
                                  )}
                                />
                                <div>
                                  <p className="font-medium">
                                    {priceDifference > 0
                                      ? `Additional payment of ₦${priceDifference.toLocaleString()} required`
                                      : `You will receive a refund of ₦${Math.abs(priceDifference).toLocaleString()}`}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {priceDifference > 0
                                      ? "The new date has a higher fare than your original booking."
                                      : "The new date has a lower fare than your original booking."}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {modifyType === "passenger" && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Select defaultValue="mrs">
                                  <SelectTrigger id="title">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mr">Mr</SelectItem>
                                    <SelectItem value="mrs">Mrs</SelectItem>
                                    <SelectItem value="miss">Miss</SelectItem>
                                    <SelectItem value="ms">Ms</SelectItem>
                                    <SelectItem value="dr">Dr</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" defaultValue="ANNA" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" defaultValue="ANDERSON" />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="anna.anderson@example.com" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" defaultValue="+234 800 123 4567" />
                              </div>
                            </div>

                            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-md flex items-start gap-2">
                              <AlertCircle className="h-5 w-5 mt-0.5 text-amber-600 dark:text-amber-400" />
                              <div>
                                <p className="font-medium">Important Information</p>
                                <p className="text-sm text-muted-foreground">
                                  The passenger name must match the ID that will be presented at check-in. Some
                                  operators may charge a fee for name corrections.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {modifyType === "seat" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Current Seat</Label>
                              <div className="p-2 bg-muted rounded-md">
                                <span className="font-medium">{selectedBooking.passenger.seat}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Select New Seat</Label>
                              <RadioGroup defaultValue="5B">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  {["5B", "6B", "7A", "7C", "8A", "8B", "9C", "10B"].map((seat) => (
                                    <div key={seat} className="flex items-center space-x-2">
                                      <RadioGroupItem value={seat} id={`seat-${seat}`} />
                                      <Label htmlFor={`seat-${seat}`} className="cursor-pointer">
                                        Seat {seat}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="p-4 bg-muted rounded-md">
                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                  <span className="text-sm">Standard</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                                  <span className="text-sm">Premium</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                  <span className="text-sm">Occupied</span>
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground">
                                Premium seats may incur an additional fee. Your current seat is a standard seat.
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" onClick={() => setActiveTab("select")} className="w-full sm:w-auto">
                          Back
                        </Button>
                        <Button onClick={handleConfirmModification} className="w-full sm:w-auto">
                          Confirm Changes
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="confirm" className="pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Modification Confirmed</CardTitle>
                      <CardDescription>Your booking has been successfully updated</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
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
                      </div>

                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-1">Booking Successfully Modified</h3>
                        <p className="text-muted-foreground">
                          {modifyType === "date" && "Your journey has been rescheduled to the new date."}
                          {modifyType === "passenger" && "The passenger details have been updated."}
                          {modifyType === "seat" && "Your seat has been changed successfully."}
                        </p>
                      </div>

                      {selectedBooking && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                              <span className="font-medium text-primary">{selectedBooking.logo}</span>
                            </div>
                            <div>
                              <div className="font-medium">{selectedBooking.company}</div>
                              <div className="text-sm text-muted-foreground">Ref: {selectedBooking.reference}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 mb-4">
                            <div className="space-y-1">
                              <div className="text-lg font-bold">{selectedBooking.from.time}</div>
                              <div className="font-medium">{selectedBooking.from.city}</div>
                              <div className="text-xs text-muted-foreground">{selectedBooking.from.terminal}</div>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                              <div className="text-xs text-muted-foreground mb-1">{selectedBooking.duration}</div>
                              <div className="relative w-16 md:w-24">
                                <div className="absolute inset-0 flex items-center">
                                  <span className="w-full border-t border-dashed"></span>
                                </div>
                                <div className="relative flex justify-center">
                                  <ArrowRight className="bg-background w-4 h-4" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="text-lg font-bold">{selectedBooking.to.time}</div>
                              <div className="font-medium">{selectedBooking.to.city}</div>
                              <div className="text-xs text-muted-foreground">{selectedBooking.to.terminal}</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {modifyType === "date" && newDate ? format(newDate, "PPP") : selectedBooking.date}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
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
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                              </svg>
                              <span>{selectedBooking.passenger.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
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
                                <path d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                                <path d="M3 9v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
                                <path d="M12 13h.01" />
                              </svg>
                              <span>Seat {modifyType === "seat" ? "5B" : selectedBooking.passenger.seat}</span>
                            </div>
                          </div>

                          {modifyType === "date" && priceDifference !== 0 && (
                            <div className="mt-4 pt-4 border-t">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  {priceDifference > 0 ? "Additional payment:" : "Refund amount:"}
                                </span>
                                <span className={priceDifference > 0 ? "text-destructive" : "text-primary"}>
                                  {priceDifference > 0 ? "+" : "-"}₦{Math.abs(priceDifference).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-4 bg-muted rounded-md">
                        <h4 className="font-medium mb-2">What happens next?</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>An updated e-ticket has been sent to your email address.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>You can view and download your updated ticket from your account.</span>
                          </li>
                          {modifyType === "date" && priceDifference > 0 && (
                            <li className="flex items-start gap-2">
                              <span className="text-muted-foreground">•</span>
                              <span>The additional payment has been charged to your original payment method.</span>
                            </li>
                          )}
                          {modifyType === "date" && priceDifference < 0 && (
                            <li className="flex items-start gap-2">
                              <span className="text-muted-foreground">•</span>
                              <span>
                                Your refund will be processed within 5-7 business days to your original payment method.
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-2">
                      <Button asChild className="w-full sm:w-auto">
                        <Link href="/mobile-ticket">View E-Ticket</Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full sm:w-auto">
                        <Link href="/profile/bookings">My Bookings</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
