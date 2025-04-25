"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Bus, Calendar, Download } from "lucide-react"
import * as motion from "motion/react"
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
  },
  {
    id: "2",
    reference: "NJ78945613",
    status: "completed",
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
    date: "April 10, 2025",
    price: 5500,
  },
  {
    id: "3",
    reference: "NJ78945614",
    status: "canceled",
    company: "Altitude Express",
    logo: "AE",
    from: {
      city: "Abuja",
      terminal: "Utako Terminal, Abuja",
      time: "14:20",
    },
    to: {
      city: "Kaduna",
      terminal: "Central Terminal, Kaduna",
      time: "16:50",
    },
    duration: "2h 30m",
    journeyNumber: "AE-3078",
    date: "March 25, 2025",
    price: 7200,
  },
]

export default function BookingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    setIsLoading(false)
  }, [router])

  const filteredBookings = bookingsData.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-muted/30 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading bookings...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">John Doe</h2>
                    <p className="text-sm text-muted-foreground">Premium Member</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/profile">
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
                        className="mr-2"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start bg-muted" asChild>
                    <Link href="/profile/bookings">
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
                        className="mr-2"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                        <path d="M12 11h4" />
                        <path d="M12 16h4" />
                        <path d="M8 11h.01" />
                        <path d="M8 16h.01" />
                      </svg>
                      My Bookings
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/profile/payments">
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
                        className="mr-2"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                      Payment Methods
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/profile/preferences">
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
                        className="mr-2"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Preferences
                    </Link>
                  </Button>
                </nav>

                <Separator className="my-6" />

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    localStorage.removeItem("user")
                    router.push("/login")
                  }}
                >
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
                    className="mr-2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                  Log Out
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <Button asChild>
                  <Link href="/">Book New Journey</Link>
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="canceled">Canceled</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="pt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
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
                            className="text-muted-foreground"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <line x1="9" x2="15" y1="9" y2="15" />
                            <line x1="15" x2="9" y1="9" y2="15" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                        <p className="text-muted-foreground mb-6">
                          You don't have any {activeTab !== "all" ? activeTab : ""} bookings yet.
                        </p>
                        <Button asChild>
                          <Link href="/">Book a Journey</Link>
                        </Button>
                      </div>
                    ) : (
                      filteredBookings.map((booking) => (
                        <Card key={booking.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex items-center justify-between p-4 border-b">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                                  <span className="font-medium text-primary">{booking.logo}</span>
                                </div>
                                <div>
                                  <div className="font-medium">{booking.company}</div>
                                  <div className="text-xs text-muted-foreground">Ref: {booking.reference}</div>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  booking.status === "upcoming"
                                    ? "default"
                                    : booking.status === "completed"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>

                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 mb-4">
                                <div className="space-y-1">
                                  <div className="text-lg font-bold">{booking.from.time}</div>
                                  <div className="font-medium">{booking.from.city}</div>
                                  <div className="text-xs text-muted-foreground">{booking.from.terminal}</div>
                                </div>

                                <div className="flex flex-col items-center justify-center">
                                  <div className="text-xs text-muted-foreground mb-1">{booking.duration}</div>
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
                                  <div className="text-lg font-bold">{booking.to.time}</div>
                                  <div className="font-medium">{booking.to.city}</div>
                                  <div className="text-xs text-muted-foreground">{booking.to.terminal}</div>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Bus className="h-4 w-4 text-muted-foreground" />
                                  <span>{booking.journeyNumber}</span>
                                </div>
                                <div className="ml-auto font-medium">₦{booking.price.toLocaleString()}</div>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {booking.status === "upcoming" && (
                                  <>
                                    <Button size="sm" asChild>
                                      <Link href={`/booking/confirmation/${booking.id}`}>View Details</Link>
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download Ticket
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Reschedule
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-destructive">
                                      Cancel
                                    </Button>
                                  </>
                                )}
                                {booking.status === "completed" && (
                                  <>
                                    <Button size="sm" asChild>
                                      <Link href={`/booking/confirmation/${booking.id}`}>View Details</Link>
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download Receipt
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Book Again
                                    </Button>
                                  </>
                                )}
                                {booking.status === "canceled" && (
                                  <>
                                    <Button size="sm" asChild>
                                      <Link href={`/booking/confirmation/${booking.id}`}>View Details</Link>
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Book Again
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
