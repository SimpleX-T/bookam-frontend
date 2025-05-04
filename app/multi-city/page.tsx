"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Plus,
  Minus,
  MapPin,
  CalendarDays,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";

// Dummy data for cities
const cities = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "port-harcourt", label: "Port Harcourt" },
  { value: "kano", label: "Kano" },
  { value: "ibadan", label: "Ibadan" },
  { value: "enugu", label: "Enugu" },
  { value: "benin", label: "Benin" },
  { value: "kaduna", label: "Kaduna" },
  { value: "ilorin", label: "Ilorin" },
  { value: "jos", label: "Jos" },
  { value: "owerri", label: "Owerri" },
  { value: "maiduguri", label: "Maiduguri" },
  { value: "warri", label: "Warri" },
  { value: "sokoto", label: "Sokoto" },
  { value: "calabar", label: "Calabar" },
];

export default function MultiCityPage() {
  const router = useRouter();
  const [legs, setLegs] = useState<
    Array<{ id: string; from: string; to: string; date: Date | undefined }>
  >([
    { id: 1, from: "", to: "", date: undefined },
    { id: 2, from: "", to: "", date: undefined },
  ]);
  const [passengers, setPassengers] = useState(1);

  const addLeg = () => {
    if (legs.length < 5) {
      const newId = Math.max(...legs.map((leg) => leg.id)) + 1;
      setLegs([...legs, { id: newId, from: "", to: "", date: undefined }]);
    }
  };

  const removeLeg = (id: string) => {
    if (legs.length > 2) {
      setLegs(legs.filter((leg) => leg.id !== id));
    }
  };

  const updateLeg = (id: string, field: string, value: string) => {
    setLegs(
      legs.map((leg) => (leg.id === id ? { ...leg, [field]: value } : leg))
    );
  };

  const handleSearch = () => {
    // Validate all legs have from, to, and date
    const isValid = legs.every((leg) => leg.from && leg.to && leg.date);

    if (isValid) {
      // In a real app, we would pass the search parameters to the search results page
      router.push("/search?type=multi-city");
    } else {
      // Show validation error
      alert("Please fill in all fields for each journey leg");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Multi-City Journey</h1>
              <p className="text-muted-foreground">
                Book multiple journeys in a single booking
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Plan Your Multi-City Journey</CardTitle>
                <CardDescription>
                  Add up to 5 journey legs for your trip
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {legs.map((leg, index) => (
                  <div key={leg.id}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Journey Leg {index + 1}</h3>
                      {legs.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLeg(leg.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`from-${leg.id}`}>From</Label>
                        <Select
                          value={leg.from}
                          onValueChange={(value) =>
                            updateLeg(leg.id, "from", value)
                          }
                        >
                          <SelectTrigger
                            id={`from-${leg.id}`}
                            className="w-full"
                          >
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city.value} value={city.value}>
                                {city.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`to-${leg.id}`}>To</Label>
                        <Select
                          value={leg.to}
                          onValueChange={(value) =>
                            updateLeg(leg.id, "to", value)
                          }
                        >
                          <SelectTrigger id={`to-${leg.id}`} className="w-full">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem
                                key={city.value}
                                value={city.value}
                                disabled={city.value === leg.from}
                              >
                                {city.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`date-${leg.id}`}>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              id={`date-${leg.id}`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {leg.date ? (
                                format(leg.date, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={leg.date}
                              onSelect={(date) =>
                                updateLeg(
                                  leg.id,
                                  "date",
                                  date as unknown as string
                                )
                              }
                              initialFocus
                              disabled={(date) => {
                                // Disable dates in the past
                                return (
                                  date <
                                  new Date(new Date().setHours(0, 0, 0, 0))
                                );
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {index < legs.length - 1 && <Separator className="my-6" />}
                  </div>
                ))}

                {legs.length < 5 && (
                  <Button variant="outline" onClick={addLeg} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Journey Leg
                  </Button>
                )}

                <div className="pt-4">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-20 mx-2">
                      <Input
                        id="passengers"
                        type="number"
                        min="1"
                        max="10"
                        value={passengers}
                        onChange={(e) =>
                          setPassengers(Number.parseInt(e.target.value) || 1)
                        }
                        className="text-center"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setPassengers(Math.min(10, passengers + 1))
                      }
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button onClick={handleSearch} className="w-full">
                  Search Journeys
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multi-City Journey Benefits</CardTitle>
                <CardDescription>
                  Why book a multi-city journey with bookAM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Visit Multiple Cities</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Explore multiple destinations in a single booking. Perfect
                      for business trips or exploring Nigeria.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <CalendarDays className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Flexible Scheduling</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Choose your own dates for each leg of your journey. Stay
                      as long as you want in each city.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Group Discounts</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Book for 5 or more passengers and enjoy special group
                      discounts on multi-city journeys.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
