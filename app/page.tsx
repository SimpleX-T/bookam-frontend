"use client";

import { Button } from "@/components/ui/button";

import SimplifiedSearch from "@/components/simplified-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { JourneyPlanner } from "@/components/route-planner/route-planner";
import { useRouter } from "next/navigation";
import { Route } from "@/types";
import { useApp } from "@/contexts/app-context";

import playStore from "@/public/images/playstore.png";
import appStore from "@/public/images/appstore.png";
import mobileApp from "@/public/images/mobile.png";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import MobileTicketPage from "./mobile-ticket/page";
import EmptyState from "@/components/search/states/empty";

import scenicViewOfLagos from "@/public/images/hero/hero1.jpg";
import zumaRock from "@/public/images/hero/hero2.jpg";
import yankariGamesReserve from "@/public/images/hero/hero3.jpg";
import obuduCattleRanch from "@/public/images/hero/hero4.jpg";
import FeaturesGrid from "@/components/features-grid";
import { features } from "@/lib/constants";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("search");
  const router = useRouter();
  const { routes } = useApp();

  function handleContinue(route: Route) {
    router.push(
      `/search?rId=${
        route.routeId
      }&from=${route.origin.toLowerCase()}&to=${route.destination.toLowerCase()}`
    );
  }

  return (
    <>
      <Header />
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
                          src={scenicViewOfLagos}
                          alt="Scenic view of Lagos"
                          fill
                          className="object-cover"
                          placeholder="blur"
                        />
                      </div>
                      <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform -rotate-3 mt-8">
                        <Image
                          src={zumaRock}
                          alt="Zuma Rock"
                          fill
                          className="object-cover"
                          placeholder="blur"
                        />
                      </div>
                      <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform -rotate-6 -mt-4">
                        <Image
                          src={yankariGamesReserve}
                          alt="Yankari Game Reserve"
                          fill
                          className="object-cover"
                          placeholder="blur"
                        />
                      </div>
                      <div className="relative h-40 md:h-60 rounded-lg overflow-hidden transform rotate-6">
                        <Image
                          src={obuduCattleRanch}
                          alt="Obudu Cattle Ranch"
                          fill
                          className="object-cover"
                          placeholder="blur"
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
                      <label
                        htmlFor="booking-id"
                        className="text-sm font-medium"
                      >
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

            {routes.length ? (
              <JourneyPlanner
                max={4}
                onContinue={handleContinue}
                routes={routes}
              />
            ) : (
              <EmptyState title="routes" hasFilters={false} />
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose bookAM
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <FeaturesGrid feature={feature} Icon={Icon} index={index} />
                );
              })}
            </div>
          </div>
        </section>

        {/* Current Promotions */}
        {/* <section className="py-16">
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
      </section> */}

        {/* Download App Section */}
        <section className="py-16 bg-primary text-primary-foreground relative">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm w-full h-full cursor-not-allowed z-20 flex items-center justify-center">
            <h3 className="text-3xl text-white text-center uppercase font-bold w-[24ch]">
              The bookAM mobile app is coming soon to your app stores!
            </h3>
          </div>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Download Our Mobile App
                </h2>
                <p className="text-xl opacity-90 mb-6">
                  Get the best experience with our mobile app. Book tickets,
                  check journey status, and receive updates on the go.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <Link href="/">
                    <Image
                      src={appStore}
                      alt="App Store"
                      width={160}
                      height={80}
                    />
                  </Link>
                  <Link href="/">
                    <Image
                      src={playStore}
                      alt="App Store"
                      width={200}
                      height={100}
                    />
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[300px] h-[500px]">
                  <div className="absolute inset-0 bg-background/10 rounded-3xl transform rotate-6" />
                  <div className="absolute inset-0 bg-background/20 rounded-3xl" />
                  <div className="relative h-full w-full bg-background/5 rounded-3xl border-4 border-background/20 overflow-hidden">
                    <Image
                      src={mobileApp}
                      alt="bookAM Mobile App"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MobileTicketPage />
      <Footer />
    </>
  );
}
