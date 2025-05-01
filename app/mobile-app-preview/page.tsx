"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Search,
  Ticket,
  User,
  Bell,
  MapPin,
  Calendar,
  ArrowRight,
  Clock,
  Bus,
  QrCode,
  Gift,
  Settings,
  ChevronRight,
  Phone,
  Mail,
  Download,
} from "lucide-react";
import { motion } from "motion/react";

export default function MobileAppPreviewPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold">bookAM Mobile App</h1>
              <p className="text-muted-foreground">
                Preview our upcoming mobile app experience
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mobile App Preview</CardTitle>
                    <CardDescription>
                      Experience the bookAM app before it launches
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center p-0">
                    <div className="relative w-[320px] h-[650px] bg-background rounded-[40px] border-8 border-muted overflow-hidden shadow-xl my-6">
                      {/* Phone notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-muted rounded-b-xl z-10"></div>

                      {/* App content */}
                      <div className="h-full overflow-hidden">
                        <Tabs
                          value={activeTab}
                          onValueChange={setActiveTab}
                          className="h-full flex flex-col"
                        >
                          <TabsContent
                            value="home"
                            className="flex-1 overflow-auto m-0 p-0"
                          >
                            <div className="p-4 bg-primary text-primary-foreground">
                              <div className="flex justify-between items-center mb-4">
                                <div>
                                  <h2 className="font-bold text-lg">
                                    Hello, Chioma
                                  </h2>
                                  <p className="text-xs opacity-90">
                                    Where are you going today?
                                  </p>
                                </div>
                                <div className="relative">
                                  <Bell className="h-6 w-6" />
                                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                </div>
                              </div>

                              <Card className="bg-background text-foreground">
                                <CardContent className="p-3 space-y-3">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <input
                                        type="text"
                                        placeholder="From"
                                        className="flex-1 bg-transparent border-none text-sm p-0 focus:outline-none"
                                      />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <input
                                        type="text"
                                        placeholder="To"
                                        className="flex-1 bg-transparent border-none text-sm p-0 focus:outline-none"
                                      />
                                    </div>
                                  </div>

                                  <div className="flex gap-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 border rounded-md p-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs">
                                          May 16, 2025
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 border rounded-md p-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs">
                                          1 Passenger
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <Button size="sm" className="w-full">
                                    Search Journeys
                                  </Button>
                                </CardContent>
                              </Card>
                            </div>

                            <div className="p-4 space-y-4">
                              <div>
                                <h3 className="font-medium text-sm mb-2">
                                  Upcoming Journeys
                                </h3>
                                <Card>
                                  <CardContent className="p-3">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <Badge className="bg-primary text-primary-foreground text-xs">
                                          Tomorrow
                                        </Badge>
                                        <h4 className="font-medium mt-1">
                                          Lagos to Abuja
                                        </h4>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-xs text-muted-foreground">
                                          Journey #CT-6018
                                        </p>
                                        <p className="font-medium">₦14,850</p>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm mt-3">
                                      <div className="space-y-1">
                                        <p className="font-medium">23:15</p>
                                        <p className="text-xs text-muted-foreground">
                                          Lagos
                                        </p>
                                      </div>

                                      <div className="flex-1 mx-2 flex flex-col items-center">
                                        <div className="text-xs text-muted-foreground">
                                          8h 10m
                                        </div>
                                        <div className="relative w-full">
                                          <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-dashed"></span>
                                          </div>
                                          <div className="relative flex justify-center">
                                            <ArrowRight className="bg-background w-3 h-3" />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-1 text-right">
                                        <p className="font-medium">07:25</p>
                                        <p className="text-xs text-muted-foreground">
                                          Abuja
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 text-xs h-8"
                                      >
                                        View Ticket
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="flex-1 text-xs h-8"
                                      >
                                        Track Journey
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div>
                                <h3 className="font-medium text-sm mb-2">
                                  Popular Routes
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    {
                                      from: "Lagos",
                                      to: "Abuja",
                                      price: "₦14,850",
                                    },
                                    {
                                      from: "Lagos",
                                      to: "Benin",
                                      price: "₦8,500",
                                    },
                                    {
                                      from: "Abuja",
                                      to: "Kaduna",
                                      price: "₦5,200",
                                    },
                                    {
                                      from: "Port Harcourt",
                                      to: "Enugu",
                                      price: "₦9,300",
                                    },
                                  ].map((route, index) => (
                                    <Card key={index}>
                                      <CardContent className="p-3">
                                        <div className="flex items-center gap-1 text-xs mb-1">
                                          <span>{route.from}</span>
                                          <ArrowRight className="h-3 w-3" />
                                          <span>{route.to}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="font-medium">
                                            {route.price}
                                          </span>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-7 w-7 p-0"
                                          >
                                            <ChevronRight className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h3 className="font-medium text-sm mb-2">
                                  Special Offers
                                </h3>
                                <div className="bg-primary/10 rounded-lg p-3 flex items-center gap-3">
                                  <div className="bg-primary/20 rounded-full p-2">
                                    <Gift className="h-5 w-5 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm">
                                      Weekend Special
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      20% off all weekend journeys
                                    </p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8"
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent
                            value="search"
                            className="flex-1 overflow-auto m-0 p-0"
                          >
                            <div className="p-4 bg-muted">
                              <h2 className="font-bold text-lg mb-3">
                                Search Results
                              </h2>
                              <div className="bg-background rounded-lg p-3 mb-3">
                                <div className="flex justify-between text-sm mb-2">
                                  <div>
                                    <span className="font-medium">Lagos</span>
                                    <ArrowRight className="h-3 w-3 inline mx-1" />
                                    <span className="font-medium">Abuja</span>
                                  </div>
                                  <div className="text-muted-foreground">
                                    May 16, 2025
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs h-7 rounded-full"
                                  >
                                    Filter
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs h-7 rounded-full"
                                  >
                                    Sort
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 space-y-3">
                              {[
                                {
                                  company: "Cloudy Transit",
                                  departure: "23:15",
                                  arrival: "07:25",
                                  duration: "8h 10m",
                                  price: "₦14,850",
                                  discount: "10% OFF",
                                },
                                {
                                  company: "Express Motors",
                                  departure: "22:00",
                                  arrival: "06:30",
                                  duration: "8h 30m",
                                  price: "₦15,200",
                                },
                                {
                                  company: "Royal Riders",
                                  departure: "21:30",
                                  arrival: "05:45",
                                  duration: "8h 15m",
                                  price: "₦16,500",
                                },
                              ].map((journey, index) => (
                                <Card key={index}>
                                  <CardContent className="p-3">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">
                                          {journey.company}
                                        </h4>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                          <Bus className="h-3 w-3" />
                                          <span>Luxury Coach</span>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-medium">
                                          {journey.price}
                                        </p>
                                        {journey.discount && (
                                          <Badge className="bg-green-500 text-white text-xs">
                                            {journey.discount}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm mt-3">
                                      <div className="space-y-1">
                                        <p className="font-medium">
                                          {journey.departure}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          Lagos
                                        </p>
                                      </div>

                                      <div className="flex-1 mx-2 flex flex-col items-center">
                                        <div className="text-xs text-muted-foreground">
                                          {journey.duration}
                                        </div>
                                        <div className="relative w-full">
                                          <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-dashed"></span>
                                          </div>
                                          <div className="relative flex justify-center">
                                            <ArrowRight className="bg-background w-3 h-3" />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-1 text-right">
                                        <p className="font-medium">
                                          {journey.arrival}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          Abuja
                                        </p>
                                      </div>
                                    </div>

                                    <Button
                                      size="sm"
                                      className="w-full mt-3 text-xs h-8"
                                    >
                                      Select Journey
                                    </Button>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent
                            value="tickets"
                            className="flex-1 overflow-auto m-0 p-0"
                          >
                            <div className="p-4 bg-muted">
                              <h2 className="font-bold text-lg mb-3">
                                My Tickets
                              </h2>
                            </div>

                            <div className="p-4 space-y-4">
                              <div>
                                <h3 className="font-medium text-sm mb-2">
                                  Upcoming Journeys
                                </h3>
                                <Card className="overflow-hidden">
                                  <div className="bg-primary text-primary-foreground p-3">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-medium">
                                          Lagos to Abuja
                                        </h4>
                                        <p className="text-xs opacity-90">
                                          Tomorrow, 23:15
                                        </p>
                                      </div>
                                      <Badge className="bg-white text-primary">
                                        CT-6018
                                      </Badge>
                                    </div>

                                    <div className="flex items-center justify-between text-sm mt-3">
                                      <div className="space-y-1">
                                        <p className="font-medium">23:15</p>
                                        <p className="text-xs opacity-90">
                                          Lagos
                                        </p>
                                      </div>

                                      <div className="flex-1 mx-2 flex flex-col items-center">
                                        <div className="text-xs opacity-90">
                                          8h 10m
                                        </div>
                                        <div className="relative w-full">
                                          <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-dashed border-white/50"></span>
                                          </div>
                                          <div className="relative flex justify-center">
                                            <ArrowRight className="bg-primary w-3 h-3" />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-1 text-right">
                                        <p className="font-medium">07:25</p>
                                        <p className="text-xs opacity-90">
                                          Abuja
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <CardContent className="p-3">
                                    <div className="flex justify-between mb-3">
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Passenger
                                        </p>
                                        <p className="text-sm font-medium">
                                          Chioma Okafor
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-xs text-muted-foreground">
                                          Seat
                                        </p>
                                        <p className="text-sm font-medium">
                                          12A
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 text-xs h-8"
                                      >
                                        <QrCode className="h-3 w-3 mr-1" />
                                        View QR
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="flex-1 text-xs h-8"
                                      >
                                        <Clock className="h-3 w-3 mr-1" />
                                        Track
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div>
                                <h3 className="font-medium text-sm mb-2">
                                  Past Journeys
                                </h3>
                                <div className="space-y-3">
                                  {[
                                    {
                                      from: "Abuja",
                                      to: "Lagos",
                                      date: "April 10, 2025",
                                      id: "CT-5982",
                                    },
                                    {
                                      from: "Lagos",
                                      to: "Benin",
                                      date: "March 22, 2025",
                                      id: "CT-5843",
                                    },
                                    {
                                      from: "Benin",
                                      to: "Lagos",
                                      date: "March 25, 2025",
                                      id: "CT-5901",
                                    },
                                  ].map((journey, index) => (
                                    <Card key={index}>
                                      <CardContent className="p-3">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <h4 className="font-medium">
                                              {journey.from} to {journey.to}
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                              {journey.date}
                                            </p>
                                          </div>
                                          <Badge variant="outline">
                                            {journey.id}
                                          </Badge>
                                        </div>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="w-full mt-2 text-xs h-8"
                                        >
                                          View Details
                                        </Button>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent
                            value="profile"
                            className="flex-1 overflow-auto m-0 p-0"
                          >
                            <div className="p-4 bg-muted">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                  <User className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <h2 className="font-bold text-lg">
                                    Chioma Okafor
                                  </h2>
                                  <p className="text-xs text-muted-foreground">
                                    Gold Member • 4,850 points
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 space-y-4">
                              <Card>
                                <CardContent className="p-3">
                                  <h3 className="font-medium text-sm mb-2">
                                    Account
                                  </h3>
                                  <div className="space-y-2">
                                    {[
                                      {
                                        icon: User,
                                        label: "Personal Information",
                                      },
                                      { icon: Ticket, label: "My Bookings" },
                                      { icon: Gift, label: "Rewards & Points" },
                                      { icon: Settings, label: "Settings" },
                                    ].map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between"
                                      >
                                        <div className="flex items-center gap-2">
                                          <item.icon className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-sm">
                                            {item.label}
                                          </span>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-3">
                                  <h3 className="font-medium text-sm mb-2">
                                    Support
                                  </h3>
                                  <div className="space-y-2">
                                    {[
                                      { icon: Mail, label: "Contact Us" },
                                      {
                                        icon: Phone,
                                        label: "Call Customer Service",
                                      },
                                    ].map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between"
                                      >
                                        <div className="flex items-center gap-2">
                                          <item.icon className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-sm">
                                            {item.label}
                                          </span>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              <Button variant="outline" className="w-full">
                                Log Out
                              </Button>
                            </div>
                          </TabsContent>

                          {/* Bottom Navigation */}
                          <div className="mt-auto border-t">
                            <div className="flex justify-around p-2">
                              <button
                                className={`flex flex-col items-center p-2 ${
                                  activeTab === "home"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                                onClick={() => setActiveTab("home")}
                              >
                                <Home className="h-5 w-5" />
                                <span className="text-xs mt-1">Home</span>
                              </button>
                              <button
                                className={`flex flex-col items-center p-2 ${
                                  activeTab === "search"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                                onClick={() => setActiveTab("search")}
                              >
                                <Search className="h-5 w-5" />
                                <span className="text-xs mt-1">Search</span>
                              </button>
                              <button
                                className={`flex flex-col items-center p-2 ${
                                  activeTab === "tickets"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                                onClick={() => setActiveTab("tickets")}
                              >
                                <Ticket className="h-5 w-5" />
                                <span className="text-xs mt-1">Tickets</span>
                              </button>
                              <button
                                className={`flex flex-col items-center p-2 ${
                                  activeTab === "profile"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                                onClick={() => setActiveTab("profile")}
                              >
                                <User className="h-5 w-5" />
                                <span className="text-xs mt-1">Profile</span>
                              </button>
                            </div>
                          </div>
                        </Tabs>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Download the App</CardTitle>
                    <CardDescription>
                      Coming soon to iOS and Android
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Get early access to our mobile app and enjoy these
                      exclusive features:
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Real-time Tracking</h3>
                          <p className="text-sm text-muted-foreground">
                            Track your journey in real-time and get updates on
                            arrival times
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <QrCode className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Mobile Tickets</h3>
                          <p className="text-sm text-muted-foreground">
                            Access your tickets offline and scan QR codes for
                            boarding
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Push Notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            Get instant updates about your journey and special
                            offers
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Gift className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Exclusive Rewards</h3>
                          <p className="text-sm text-muted-foreground">
                            Earn and redeem points directly from the app
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Join Waitlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>App Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Offline Tickets</span>
                        <Badge variant="outline" className="text-primary">
                          Available
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Real-time Tracking</span>
                        <Badge variant="outline" className="text-primary">
                          Available
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Push Notifications</span>
                        <Badge variant="outline" className="text-primary">
                          Available
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">In-app Booking</span>
                        <Badge variant="outline" className="text-primary">
                          Available
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Loyalty Program</span>
                        <Badge variant="outline" className="text-primary">
                          Available
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mobile Payments</span>
                        <Badge variant="outline" className="text-primary">
                          Available
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Offline Maps</span>
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          Coming Soon
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Journey Sharing</span>
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          Coming Soon
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
