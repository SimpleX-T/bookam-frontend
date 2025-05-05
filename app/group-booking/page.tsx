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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  CalendarIcon,
  Percent,
  CreditCard,
  Bus,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import { FormSubmitEvent } from "@/types";

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
];

export default function GroupBookingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("standard");
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: undefined,
    returnDate: undefined,
    passengers: 10,
    name: "",
    email: "",
    phone: "",
    organization: "",
    specialRequests: "",
  });

  const handleInputChange = (
    field: string,
    value: string | Date | undefined
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: FormSubmitEvent): void => {
    e.preventDefault();
    // In a real app, we would submit the form data to the server
    router.push("/group-booking/confirmation");
  };

  const discountPercentage =
    formData.passengers >= 20 ? 15 : formData.passengers >= 15 ? 12 : 10;

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
              <h1 className="text-2xl font-bold">Group Booking</h1>
              <p className="text-muted-foreground">
                Special rates and services for groups of 10 or more
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Group Booking Request</CardTitle>
                    <CardDescription>
                      Fill in the details for your group journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="standard">
                            Standard Group
                          </TabsTrigger>
                          <TabsTrigger value="charter">Charter Bus</TabsTrigger>
                        </TabsList>
                        <TabsContent
                          value="standard"
                          className="space-y-6 pt-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="from">From</Label>
                              <Select
                                value={formData.from}
                                onValueChange={(value) =>
                                  handleInputChange("from", value)
                                }
                              >
                                <SelectTrigger id="from">
                                  <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                  {cities.map((city) => (
                                    <SelectItem
                                      key={city.value}
                                      value={city.value}
                                    >
                                      {city.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="to">To</Label>
                              <Select
                                value={formData.to}
                                onValueChange={(value) =>
                                  handleInputChange("to", value)
                                }
                              >
                                <SelectTrigger id="to">
                                  <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                  {cities.map((city) => (
                                    <SelectItem
                                      key={city.value}
                                      value={city.value}
                                      disabled={city.value === formData.from}
                                    >
                                      {city.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date">Departure Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    id="date"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date ? (
                                      format(formData.date, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(date) =>
                                      handleInputChange("date", date)
                                    }
                                    initialFocus
                                    disabled={(date) => {
                                      // Disable dates in the past
                                      return (
                                        date <
                                        new Date(
                                          new Date().setHours(0, 0, 0, 0)
                                        )
                                      );
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="returnDate">
                                Return Date (Optional)
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    id="returnDate"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.returnDate ? (
                                      format(formData.returnDate, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={formData.returnDate}
                                    onSelect={(date) =>
                                      handleInputChange("returnDate", date)
                                    }
                                    initialFocus
                                    disabled={(date) => {
                                      // Disable dates before departure date
                                      return (
                                        date <
                                        (formData.date ||
                                          new Date(
                                            new Date().setHours(0, 0, 0, 0)
                                          ))
                                      );
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="passengers">
                              Number of Passengers
                            </Label>
                            <Input
                              id="passengers"
                              type="number"
                              min="10"
                              max="100"
                              value={formData.passengers}
                              onChange={(e) =>
                                handleInputChange(
                                  "passengers",
                                  (
                                    Number.parseInt(e.target.value) || 10
                                  ).toString()
                                )
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Minimum 10 passengers required for group booking
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="charter" className="space-y-6 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="from-charter">From</Label>
                              <Select
                                value={formData.from}
                                onValueChange={(value) =>
                                  handleInputChange("from", value)
                                }
                              >
                                <SelectTrigger id="from-charter">
                                  <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                  {cities.map((city) => (
                                    <SelectItem
                                      key={city.value}
                                      value={city.value}
                                    >
                                      {city.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="to-charter">To</Label>
                              <Select
                                value={formData.to}
                                onValueChange={(value) =>
                                  handleInputChange("to", value)
                                }
                              >
                                <SelectTrigger id="to-charter">
                                  <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                  {cities.map((city) => (
                                    <SelectItem
                                      key={city.value}
                                      value={city.value}
                                      disabled={city.value === formData.from}
                                    >
                                      {city.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date-charter">
                                Departure Date
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    id="date-charter"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date ? (
                                      format(formData.date, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(date) =>
                                      handleInputChange("date", date)
                                    }
                                    initialFocus
                                    disabled={(date) => {
                                      // Disable dates in the past
                                      return (
                                        date <
                                        new Date(
                                          new Date().setHours(0, 0, 0, 0)
                                        )
                                      );
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="returnDate-charter">
                                Return Date (Optional)
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    id="returnDate-charter"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.returnDate ? (
                                      format(formData.returnDate, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={formData.returnDate}
                                    onSelect={(date) =>
                                      handleInputChange("returnDate", date)
                                    }
                                    initialFocus
                                    disabled={(date) => {
                                      // Disable dates before departure date
                                      return (
                                        date <
                                        (formData.date ||
                                          new Date(
                                            new Date().setHours(0, 0, 0, 0)
                                          ))
                                      );
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="passengers-charter">
                              Number of Passengers
                            </Label>
                            <Input
                              id="passengers-charter"
                              type="number"
                              min="10"
                              max="100"
                              value={formData.passengers}
                              onChange={(e) =>
                                handleInputChange(
                                  "passengers",
                                  (
                                    Number.parseInt(e.target.value) || 10
                                  ).toString()
                                )
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Charter buses available for 18, 33, or 44
                              passengers
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Contact Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Contact Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              placeholder="Username"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="organization">
                              Organization (Optional)
                            </Label>
                            <Input
                              id="organization"
                              value={formData.organization}
                              onChange={(e) =>
                                handleInputChange(
                                  "organization",
                                  e.target.value
                                )
                              }
                              placeholder="Company or group name"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              placeholder="your@email.com"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              placeholder="e.g. +234 800 123 4567"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialRequests">
                            Special Requests (Optional)
                          </Label>
                          <Textarea
                            id="specialRequests"
                            value={formData.specialRequests}
                            onChange={(e) =>
                              handleInputChange(
                                "specialRequests",
                                e.target.value
                              )
                            }
                            placeholder="Any special requirements or additional information"
                            rows={4}
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Submit Group Booking Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Group Booking Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Percent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Group Discount</h3>
                        <p className="text-sm text-muted-foreground">
                          Enjoy up to {discountPercentage}% discount on group
                          bookings of {formData.passengers} passengers
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Flexible Payment</h3>
                        <p className="text-sm text-muted-foreground">
                          Pay a deposit now and the balance later, with flexible
                          payment options
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Bus className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Dedicated Bus</h3>
                        <p className="text-sm text-muted-foreground">
                          Groups of 18+ can get a dedicated bus for their
                          journey
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Priority Boarding</h3>
                        <p className="text-sm text-muted-foreground">
                          Enjoy priority boarding and dedicated check-in for
                          your group
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Dedicated Coordinator</h3>
                        <p className="text-sm text-muted-foreground">
                          A dedicated group coordinator to assist with your
                          booking and journey
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Our group booking specialists are available to assist you
                      with your booking and answer any questions.
                    </p>
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Phone:</span>
                        <span>+234 800 123 4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Email:</span>
                        <span>groups@bookAM.com</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Contact Group Specialist
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
