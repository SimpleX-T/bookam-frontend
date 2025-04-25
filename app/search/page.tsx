"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import SimplifiedSearch from "@/components/simplified-search";
import {
  CalendarIcon,
  ChevronDown,
  Search,
  ArrowRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// Dummy data for bus routes
const busRoutes = [
  {
    id: 1,
    company: "HorizonJet",
    logo: "HJ",
    departureTime: "10:25PM",
    arrivalTime: "7:06AM",
    duration: "8h 41m",
    stops: 1,
    price: 27550,
    date: "Fri, 16 Feb",
    datePrice: 148,
    available_seats: 23,
  },
  {
    id: 2,
    company: "Altitude Express",
    logo: "AE",
    departureTime: "6:30AM",
    arrivalTime: "7:55AM",
    duration: "1h 25m",
    stops: 1,
    price: 20600,
    date: "Sat, 17 Feb",
    datePrice: 160,
    available_seats: 15,
  },
  {
    id: 3,
    company: "Cloudy Transit",
    logo: "CT",
    departureTime: "1:19PM",
    arrivalTime: "2:45PM",
    duration: "1h 26m",
    stops: 1,
    price: 14850,
    date: "Sun, 18 Feb",
    datePrice: 170,
    available_seats: 32,
  },
  {
    id: 4,
    company: "Cloudy Transit",
    logo: "CT",
    departureTime: "6:13PM",
    arrivalTime: "7:40PM",
    duration: "1h 27m",
    stops: 1,
    price: 38015,
    date: "Mon, 19 Feb",
    datePrice: 150,
    available_seats: 8,
  },
  {
    id: 5,
    company: "Altitude Express",
    logo: "AE",
    departureTime: "6:20AM",
    arrivalTime: "7:46AM",
    duration: "1h 26m",
    stops: 2,
    price: 26910,
    date: "Tue, 20 Feb",
    datePrice: 146,
    available_seats: 19,
  },
  {
    id: 6,
    company: "HorizonJet",
    logo: "HJ",
    departureTime: "7:15PM",
    arrivalTime: "8:45PM",
    duration: "1h 30m",
    stops: 0,
    price: 54910,
    date: "Wed, 21 Feb",
    datePrice: 155,
    available_seats: 27,
  },
  {
    id: 7,
    company: "HorizonJet",
    logo: "HJ",
    departureTime: "6:01AM",
    arrivalTime: "7:28AM",
    duration: "1h 27m",
    stops: 0,
    price: 20050,
    date: "Thu, 22 Feb",
    datePrice: 142,
    available_seats: 11,
  },
  {
    id: 8,
    company: "FlyScape",
    logo: "FS",
    departureTime: "8:40AM",
    arrivalTime: "10:00AM",
    duration: "1h 20m",
    stops: 0,
    price: 54910,
    date: "Fri, 23 Feb",
    datePrice: 160,
    available_seats: 5,
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [transitFilter, setTransitFilter] = useState<string[]>([]);
  const [transitPointFilter, setTransitPointFilter] = useState<string[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const [passengers, setPassengers] = useState<string>("1");

  useEffect(() => {
    // Get search parameters from URL
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const dateParam = searchParams.get("date");
    const passengersParam = searchParams.get("passengers");

    if (from) setFromCity(from);
    if (to) setToCity(to);
    if (passengersParam) setPassengers(passengersParam);
    if (dateParam) {
      try {
        setDate(new Date(dateParam));
      } catch (e) {
        console.error("Invalid date format:", e);
      }
    }
  }, [searchParams]);

  const dates = [
    { day: "Fri", date: "16 Feb", price: "148" },
    { day: "Sat", date: "17 Feb", price: "160" },
    { day: "Sun", date: "18 Feb", price: "170" },
    { day: "Mon", date: "19 Feb", price: "150" },
    { day: "Tue", date: "20 Feb", price: "146" },
  ];

  const handleTransitChange = (value: string) => {
    setTransitFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleTransitPointChange = (value: string) => {
    setTransitPointFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleRouteSelect = (routeId: number) => {
    router.push(
      `/booking/steps/seat-selection?journey=${routeId}&passengers=${passengers}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 bg-background rounded-lg p-4 shadow-sm">
              <SimplifiedSearch />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            <div className="space-y-6">
              <Button
                variant="outline"
                className="w-full flex items-center justify-between md:hidden mb-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>Filters</span>
                <Filter className="h-4 w-4" />
              </Button>

              <div
                className={cn(
                  "space-y-6",
                  showFilters ? "block" : "hidden md:block"
                )}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">Sort by</h3>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        Reset
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Lowest price</label>
                        <Checkbox />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Highest price</label>
                        <Checkbox />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">Price</h3>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        Reset
                      </Button>
                    </div>
                    <div className="py-4">
                      <Slider
                        defaultValue={[0, 60000]}
                        max={60000}
                        step={1000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-xs">
                          ₦{priceRange[0].toLocaleString()}
                        </span>
                        <span className="text-xs">
                          ₦{priceRange[1].toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">No. of transit</h3>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        Reset
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Direct</label>
                        <Checkbox
                          checked={transitFilter.includes("direct")}
                          onCheckedChange={() => handleTransitChange("direct")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">1 transit</label>
                        <Checkbox
                          checked={transitFilter.includes("1transit")}
                          onCheckedChange={() =>
                            handleTransitChange("1transit")
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">Transit point</h3>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        Reset
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Ibadan (IBD)</label>
                        <Checkbox
                          checked={transitPointFilter.includes("ibadan")}
                          onCheckedChange={() =>
                            handleTransitPointChange("ibadan")
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Ilorin (ILR)</label>
                        <Checkbox
                          checked={transitPointFilter.includes("ilorin")}
                          onCheckedChange={() =>
                            handleTransitPointChange("ilorin")
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-background rounded-lg p-4 shadow-sm overflow-x-auto">
                <div className="flex space-x-2 min-w-max">
                  {dates.map((dateItem, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-lg min-w-[100px]",
                        selectedDateIndex === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      )}
                      onClick={() => setSelectedDateIndex(index)}
                    >
                      <div className="text-sm font-medium">
                        {dateItem.day}, {dateItem.date}
                      </div>
                      <div className="text-xs">{dateItem.price} USD</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>
                    Showing journeys from {fromCity || "Lagos"} to{" "}
                    {toCity || "Abuja"}
                  </span>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Price history
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                {busRoutes.map((route, index) => (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 p-4 items-center">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-md">
                              <span className="font-medium">{route.logo}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium">
                                {route.company}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                23kg
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 items-center">
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                {route.departureTime}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {fromCity || "Lagos"}
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">
                                {route.duration}
                              </div>
                              <div className="relative w-16 md:w-24">
                                <div className="absolute inset-0 flex items-center">
                                  <span className="w-full border-t"></span>
                                </div>
                                <div className="relative flex justify-center">
                                  <span className="bg-background px-2 text-xs text-muted-foreground">
                                    {route.stops === 0
                                      ? "Direct"
                                      : `${route.stops} stop`}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                {route.arrivalTime}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {toCity || "Abuja"}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="text-xl font-bold">
                              ₦{route.price.toLocaleString()}{" "}
                              <span className="text-xs font-normal text-muted-foreground">
                                / pax
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {route.available_seats} seats available
                            </div>
                            <Button onClick={() => handleRouteSelect(route.id)}>
                              Choose
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                <div className="flex justify-center gap-2 py-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground"
                  >
                    1
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full"
                  >
                    2
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full"
                  >
                    3
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full"
                  >
                    4
                  </Button>
                  <span className="flex items-center px-2">...</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full"
                  >
                    10
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full"
                  >
                    11
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
