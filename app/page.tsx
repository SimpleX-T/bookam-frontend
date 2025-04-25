"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { CalendarIcon, MapPin, Bus, Clock } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {motion} from "motion/react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [tripType, setTripType] = useState<"round" | "one-way">("one-way")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative">
          <div className="hero-pattern py-12 md:py-24">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 text-white"
                >
                  <h1 className="text-4xl md:text-6xl font-bold">
                    Explore Your <span className="text-yellow-300">Nigeria</span>
                  </h1>
                  <p className="text-xl md:text-2xl font-light">Special Offer</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl md:text-5xl font-bold">50%</span>
                    <div className="text-lg">
                      <p>GET UP TO</p>
                      <p>OFF</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform rotate-3">
                      <Image
                        src="/placeholder.svg?height=240&width=320"
                        alt="Scenic view of Lagos"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform -rotate-3 mt-8">
                      <Image
                        src="/placeholder.svg?height=240&width=320"
                        alt="Zuma Rock"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform -rotate-6 -mt-4">
                      <Image
                        src="/placeholder.svg?height=240&width=320"
                        alt="Yankari Game Reserve"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform rotate-6">
                      <Image
                        src="/placeholder.svg?height=240&width=320"
                        alt="Obudu Cattle Ranch"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="bg-background rounded-xl shadow-lg -mt-8 md:-mt-16 p-4 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Find your journey</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Button
                    variant={tripType === "round" ? "default" : "outline"}
                    onClick={() => setTripType("round")}
                    className="rounded-full"
                  >
                    Round trip
                  </Button>
                  <Button
                    variant={tripType === "one-way" ? "default" : "outline"}
                    onClick={() => setTripType("one-way")}
                    className="rounded-full"
                  >
                    One way
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <label className="block text-sm font-medium mb-2">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Lagos" className="pl-10" defaultValue="Lagos" />
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4">
                    <label className="block text-sm font-medium mb-2">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Where is your destination?" className="pl-10" />
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4">
                    <label className="block text-sm font-medium mb-2">Departure date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {tripType === "round" && (
                  <div className="mt-4">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <label className="block text-sm font-medium mb-2">Return date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/search">Search Journeys</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-muted/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-bold">Popular destinations</h2>
                <p className="text-muted-foreground">Discover Nigeria's most traveled routes</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/routes">Explore destinations</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=192&width=384" alt="Lagos" fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">Lagos</h3>
                    <Badge>Popular</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Bus className="h-4 w-4 mr-1" />
                    <span>Daily departures</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>8 hr journey</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">From</span>
                      <span className="text-lg font-bold">₦5,000</span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/search?to=Lagos">Book now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=192&width=384" alt="Abuja" fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">Abuja</h3>
                    <Badge>Capital</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Bus className="h-4 w-4 mr-1" />
                    <span>Daily departures</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>10 hr journey</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">From</span>
                      <span className="text-lg font-bold">₦7,500</span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/search?to=Abuja">Book now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=192&width=384" alt="Kano" fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">Kano</h3>
                    <Badge variant="outline">Historic</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Bus className="h-4 w-4 mr-1" />
                    <span>Daily departures</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>12 hr journey</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">From</span>
                      <span className="text-lg font-bold">₦8,200</span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/search?to=Kano">Book now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What's new?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=192&width=384" alt="Bus interior" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-2">Do consectetur</Badge>
                  <h3 className="text-xl font-bold mb-2">New luxury buses added to our fleet</h3>
                  <p className="text-muted-foreground mb-4">
                    Experience premium comfort with our new luxury buses featuring reclining seats and onboard
                    entertainment.
                  </p>
                  <div className="text-xs text-muted-foreground">Apr 24, 2025 • 5 mins read</div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=192&width=384" alt="Scenic route" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-2">Do consectetur</Badge>
                  <h3 className="text-xl font-bold mb-2">Explore and live your best life</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover Nigeria's hidden gems with our new scenic routes to tourist destinations across the
                    country.
                  </p>
                  <div className="text-xs text-muted-foreground">Apr 24, 2025 • 5 mins read</div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=192&width=384"
                    alt="Money saving tips"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-2">Do consectetur</Badge>
                  <h3 className="text-xl font-bold mb-2">Save money on your trip with 5 easy steps</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn how to get the best deals and save on your next journey with our expert travel tips.
                  </p>
                  <div className="text-xs text-muted-foreground">Apr 24, 2025 • 5 mins read</div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline">Read more articles</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
