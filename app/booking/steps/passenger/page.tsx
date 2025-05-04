"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";

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
  adultBasicFee: 15000,
  tax: "Included",
  regularTotalPrice: 15000,
  save: 150,
  totalPrice: 14850,
};

const passengerSchema = z.object({
  title: z.string().min(1, { message: "Please select a title" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  emergencyContact: z.string().optional(),
  specialRequirements: z.string().optional(),
  termsAccepted: z.boolean().optional(),
});

type PassengerFormValues = z.infer<typeof passengerSchema>;

export default function PassengerDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Get journey details from URL
    const seats = searchParams.get("seats");
    const price = searchParams.get("price");

    if (seats) {
      setSelectedSeats(seats.split(","));
    }

    if (price) {
      setTotalPrice(parseInt(price, 10));
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerFormValues>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      termsAccepted: false,
    },
  });

  const onSubmit = (data: PassengerFormValues) => {
    console.log("Passenger data:", data);

    // Construct query params with passenger details
    const params = new URLSearchParams({
      journey: journeyData.id,
      seats: selectedSeats.join(","),
      price: totalPrice.toString(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
    });

    router.push(`/booking/steps/payment?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Seat Selection
            </Button>
            <h1 className="text-2xl font-bold mb-4">Passenger Details</h1>
            <div className="relative flex items-center justify-between max-w-md mb-6">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary/50 flex items-center justify-center text-primary-foreground">
                  1
                </div>
                <span className="text-sm mt-1 text-primary/50">
                  Seat Selection
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  2
                </div>
                <span className="text-sm mt-1 text-primary">
                  Passenger Details
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  3
                </div>
                <span className="text-sm mt-1 text-muted-foreground">
                  Payment
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Passenger Information</CardTitle>
                  <CardDescription>
                    Please enter the details of the lead passenger
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <RadioGroup
                          defaultValue=""
                          className="flex flex-wrap gap-4 mt-2"
                          {...register("title")}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mr" id="mr" />
                            <Label htmlFor="mr">Mr</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mrs" id="mrs" />
                            <Label htmlFor="mrs">Mrs</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="miss" id="miss" />
                            <Label htmlFor="miss">Miss</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ms" id="ms" />
                            <Label htmlFor="ms">Ms</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dr" id="dr" />
                            <Label htmlFor="dr">Dr</Label>
                          </div>
                        </RadioGroup>
                        {errors.title && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.title.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" {...register("firstName")} />
                          {errors.firstName && (
                            <p className="text-sm text-destructive">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" {...register("lastName")} />
                          {errors.lastName && (
                            <p className="text-sm text-destructive">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" {...register("phone")} />
                          {errors.phone && (
                            <p className="text-sm text-destructive">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">
                            Date of Birth (Optional)
                          </Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            {...register("dateOfBirth")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality">
                            Nationality (Optional)
                          </Label>
                          <Input
                            id="nationality"
                            {...register("nationality")}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">
                          Emergency Contact (Optional)
                        </Label>
                        <Input
                          id="emergencyContact"
                          {...register("emergencyContact")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialRequirements">
                          Special Requirements (Optional)
                        </Label>
                        <Input
                          id="specialRequirements"
                          {...register("specialRequirements")}
                        />
                      </div>

                      <div className="flex items-start space-x-2 pt-2">
                        <Checkbox
                          id="termsAccepted"
                          {...register("termsAccepted")}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="termsAccepted"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I accept the terms and conditions
                          </Label>
                          {errors.termsAccepted && (
                            <p className="text-sm text-destructive">
                              {errors.termsAccepted.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                      <span className="font-medium text-primary">
                        {journeyData.logo}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{journeyData.company}</div>
                      <div className="text-sm text-muted-foreground">
                        {journeyData.journeyNumber}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{journeyData.date}</span>
                    </div>

                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {journeyData.from.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {journeyData.from.terminal}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {journeyData.to.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {journeyData.to.terminal}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{journeyData.bus.type}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedSeats.length} Passenger(s)
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Selected Seats</h3>
                    <div className="space-y-1">
                      {selectedSeats.map((seat) => (
                        <div
                          key={seat}
                          className="flex justify-between text-sm"
                        >
                          <span>Seat {seat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
