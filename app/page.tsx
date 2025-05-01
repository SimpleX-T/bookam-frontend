"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

import SimplifiedSearch from "@/components/simplified-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Bus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { JourneyPlanner } from "@/components/route-planner/route-planner";
import { useRouter } from "next/navigation";
import { Route } from "@/types";

const popularRoutes = [
  {
    id: 1,
    from: "Abakpa",
    to: "Gariki",
    price: 800,
    duration: "8h 10m",
    image:
      "https://www.shutterstock.com/shutterstock/videos/3458108987/thumb/1.jpg?ip=x480",
  },
  {
    id: 2,
    from: "Enugu",
    to: "Nsukka",
    price: 2500,
    duration: "2h 30m",
    image:
      "https://as2.ftcdn.net/jpg/05/11/87/61/1000_F_511876132_lvR1nkSpnniH26xvN5bX84CZCPDScVFI.jpg",
  },
  {
    id: 3,
    from: "Abuja",
    to: "Kaduna",
    price: 17200,
    duration: "3h 15m",
    image:
      "https://www.shutterstock.com/image-photo/aerial-view-bustling-urban-landscape-600nw-2550888697.jpg",
  },
  {
    id: 4,
    from: "PH",
    to: "Owerri",
    price: 1200,
    duration: "2h 45m",
    image:
      "https://www.nairaland.com/attachments/5928171_2127234810287541038941947456967265889492231n_jpega075271d01fed7cb95498c07e6fe6075",
  },
];

// Promotions data
const promotions = [
  {
    id: 1,
    title: "Weekend Special",
    description: "20% off on all weekend journeys",
    code: "WEEKEND20",
    validUntil: "June 30, 2025",
  },
  {
    id: 2,
    title: "Family Package",
    description: "Book for 4 or more and get 15% discount",
    code: "FAMILY15",
    validUntil: "July 15, 2025",
  },
  {
    id: 3,
    title: "Early Bird",
    description: "Book 7 days in advance and save 10%",
    code: "EARLY10",
    validUntil: "Ongoing",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("search");
  const router = useRouter();
  function handleContinue(route: Route) {
    router.push(
      `/search?from=${route.from.toLowerCase()}&to=${route.to.toLowerCase()}`
    );
  }
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-muted/30 font-bricolage">
        <section className="relative h-full">
          <div className="hero-pattern py-12 md:py-24">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 text-white"
                >
                  <h1 className="text-4xl md:text-6xl font-bold font-bricolage">
                    Where Will the Road Take{" "}
                    <span className="text-yellow-300">You</span> Today?
                  </h1>
                  <p className="text-lg md:text-xl font-light">
                    Book bus tickets easily across{" "}
                    <span className="text-primary font-bold">Nigeria</span>
                  </p>
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
                        src="/images/hero/hero1.jpg"
                        alt="Scenic view of Lagos"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform -rotate-3 mt-8">
                      <Image
                        src="/images/hero/hero2.jpg"
                        alt="Zuma Rock"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform -rotate-6 -mt-4">
                      <Image
                        src="/images/hero/hero3.jpg"
                        alt="Yankari Game Reserve"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform rotate-6">
                      <Image
                        src="/images/hero/hero4.jpg"
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
      </section>
      <div className="bg-background rounded-xl shadow-lg p-6 max-w-5xl mx-auto my-4">
        <Tabs
          defaultValue="search"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="search">Search Journey</TabsTrigger>
            <TabsTrigger value="status">Journey Status</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <SimplifiedSearch />
          </TabsContent>
          <TabsContent value="status">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="booking-id" className="text-sm font-medium">
                      Booking Reference
                    </label>
                    <input
                      id="booking-id"
                      type="text"
                      placeholder="Enter your booking reference"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <Button className="w-full">Check Status</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Popular Routes Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular Routes</h2>
            <Button variant="outline" asChild>
              <Link href="/routes">
                View All Routes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <JourneyPlanner max={4} onContinue={handleContinue} />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose bookAM
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Bus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Modern Fleet</h3>
              <p className="text-muted-foreground">
                Travel in comfort with our modern, well-maintained buses
                equipped with amenities for a pleasant journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Extensive Network</h3>
              <p className="text-muted-foreground">
                With routes covering all major cities and towns across Nigeria,
                we get you where you need to go.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">
                Book your tickets online in minutes with our simple,
                user-friendly booking system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
              <p className="text-muted-foreground">
                Our dedicated team ensures your journey is comfortable, safe,
                and exceeds your expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Promotions */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Current Promotions</h2>
            <Button variant="outline" asChild>
              <Link href="/promotions">
                View All Promotions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-bold">{promo.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {promo.description}
                    </p>
                    <div className="bg-muted p-3 rounded-md text-center mb-4">
                      <span className="font-mono font-bold">{promo.code}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Valid until: {promo.validUntil}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Download Our Mobile App
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Get the best experience with our mobile app. Book tickets, check
                journey status, and receive updates on the go.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg">
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
                    className="mr-2"
                  >
                    <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5" />
                    <path d="M16 3v4" />
                    <path d="M8 3v4" />
                    <path d="M3 11h18" />
                    <path d="M19 16v6" />
                    <path d="M22 19l-3-3-3 3" />
                  </svg>
                  App Store
                </Button>
                <Button variant="secondary" size="lg">
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
                    className="mr-2"
                  >
                    <path d="M3 9h.01M21 9h.01M3 15h.01M21 15h.01M12 3v18" />
                    <path d="M3 3v18h18V3z" />
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[300px] h-[500px]">
                <div className="absolute inset-0 bg-background/10 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-background/20 rounded-3xl"></div>
                <div className="relative h-full w-full bg-background/5 rounded-3xl border-4 border-background/20 overflow-hidden">
                  <Image
                    src="/images/mobile.png"
                    alt="bookAM Mobile App"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
