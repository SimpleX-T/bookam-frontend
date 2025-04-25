"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bus, X, CheckCircle2 } from "lucide-react"
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
}

export default function JourneyDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                    <span className="font-medium text-primary">{journeyData.logo}</span>
                  </div>
                  <span className="font-medium">{journeyData.company}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <div className="p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Journey details</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    <TabsTrigger value="refund">Refund</TabsTrigger>
                    <TabsTrigger value="reschedule">Reschedule</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="pt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 mb-8">
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
                              <Badge variant="outline" className="bg-background">
                                1 stop
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-2xl font-bold">{journeyData.to.time}</div>
                          <div className="font-medium">{journeyData.to.city}</div>
                          <div className="text-sm text-muted-foreground">{journeyData.to.terminal}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Bus className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{journeyData.journeyNumber}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{journeyData.class}</span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
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
                              <span className="text-sm">Luggage</span>
                            </div>
                            <span className="text-sm font-medium">{journeyData.luggage}</span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground"
                              >
                                <path d="M18 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2" />
                                <path d="M12 19v3" />
                                <path d="M12 11v-4" />
                                <rect width="12" height="8" x="6" y="11" rx="2" />
                                <path d="M18 11V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5" />
                              </svg>
                              <span className="text-sm">Hand Luggage</span>
                            </div>
                            <span className="text-sm font-medium">{journeyData.handLuggage}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Bus className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{journeyData.bus.type}</span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground"
                              >
                                <path d="M18 14v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5" />
                                <path d="M6 11V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9" />
                                <path d="M5 11a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2Z" />
                                <path d="M10 7h4" />
                              </svg>
                              <span className="text-sm">Seating</span>
                            </div>
                            <span className="text-sm font-medium">{journeyData.bus.seating}</span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground"
                              >
                                <path d="M12 2H2v10h10V2Z" />
                                <path d="M12 12H2v10h10V12Z" />
                                <path d="M22 2h-10v20h10V2Z" />
                              </svg>
                              <span className="text-sm">Features</span>
                            </div>
                            <span className="text-sm font-medium">{journeyData.bus.features}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6 mt-6">
                        <h3 className="font-medium mb-4">Stop to change buses in {journeyData.stops[0].city}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6">
                          <div className="space-y-1">
                            <div className="text-lg font-bold">{journeyData.stops[0].arrivalTime}</div>
                            <div className="font-medium">{journeyData.stops[0].city}</div>
                            <div className="text-sm text-muted-foreground">{journeyData.stops[0].terminal}</div>
                          </div>

                          <div className="flex flex-col items-center justify-center">
                            <div className="text-sm text-muted-foreground mb-2">{journeyData.stops[0].duration}</div>
                            <div className="relative w-24 md:w-32">
                              <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"></span>
                              </div>
                              <div className="relative flex justify-center">
                                <Badge variant="outline" className="bg-background">
                                  Stop
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-lg font-bold">{journeyData.stops[0].departureTime}</div>
                            <div className="font-medium">{journeyData.stops[0].city}</div>
                            <div className="text-sm text-muted-foreground">{journeyData.stops[0].terminal}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="benefits" className="pt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <h3 className="font-medium mb-2">Comfort Benefits</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <span>Reclining seats with extra legroom</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <span>Air conditioning throughout journey</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <span>Onboard entertainment system</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <span>USB charging ports at every seat</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <h3 className="font-medium mb-2">Service Benefits</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <span>Complimentary refreshments</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <span>Free Wi-Fi connection</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <span>Priority boarding</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <span>Dedicated customer service</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-2">Additional Benefits</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span>Flexible rescheduling options</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span>Generous luggage allowance</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span>Loyalty points for future journeys</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span>Travel insurance options available</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="refund" className="pt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-l-4 border-primary pl-4 mb-6">
                        <h3 className="font-medium text-lg">Your refund policy</h3>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center justify-between py-2 border-b">
                            <span className="font-medium">Refund estimation</span>
                            <span>₦{Math.floor(journeyData.price * 0.75).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <span className="font-medium">Refund process</span>
                            <span>3-5 business days</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <span className="font-medium">Other refund info</span>
                            <span>25% cancellation fee applies</span>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-medium">{journeyData.logo}</span>
                            </div>
                            <div>
                              <div className="font-medium">{journeyData.company}</div>
                              <div className="text-sm text-muted-foreground">
                                {journeyData.from.city} - {journeyData.to.city}
                              </div>
                            </div>
                            <Badge className="ml-auto" variant="outline">
                              <span className="text-primary">Refundable</span>
                            </Badge>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-medium">Refund is applicable for the following reason(s):</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>Self-cancellation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>Sickness</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>Journey canceled by operator</span>
                              </li>
                            </ul>
                            <Button variant="link" className="p-0 h-auto text-primary">
                              View 2 more reasons
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="reschedule" className="pt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-l-4 border-primary pl-4 mb-6">
                        <h3 className="font-medium text-lg">Regular policy</h3>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center justify-between py-2 border-b">
                            <span className="font-medium">Validity date</span>
                            <span>Up to 24 hours before departure</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <span className="font-medium">Fee</span>
                            <span>₦1,000 per change</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <span className="font-medium">Process</span>
                            <span>Online or at terminal</span>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-medium">{journeyData.logo}</span>
                            </div>
                            <div>
                              <div className="font-medium">{journeyData.company}</div>
                              <div className="text-sm text-muted-foreground">
                                {journeyData.from.city} - {journeyData.to.city}
                              </div>
                            </div>
                            <Badge className="ml-auto" variant="outline">
                              <span className="text-primary">Available</span>
                            </Badge>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-medium">You'll be able to change your:</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span>Departure time</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                <span>Travel route</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                <span>Bus operator</span>
                              </li>
                            </ul>

                            <div className="space-y-2 mt-4">
                              <div className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>Easy reschedule is designed for changing journey dates</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>
                                  N-Journey will notify you of the updated price for your new journey via email
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>The rescheduling procedure may require up to 45 minutes to complete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold">
              ₦{journeyData.price.toLocaleString()}{" "}
              <span className="text-sm font-normal text-muted-foreground">/ pax</span>
            </div>
            <Button size="lg" asChild>
              <Link href={`/booking/${journeyData.id}`}>Book now</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
