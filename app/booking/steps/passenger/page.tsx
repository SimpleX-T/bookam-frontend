"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import BookingTimeline from "@/components/booking/booking-timeline";
import { useAuth } from "@/contexts/auth-context";
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
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional(),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  emergencyContact: z.string().optional(),
  specialRequirements: z.string().optional(),
});
type PassengerFormValues = z.infer<typeof passengerSchema>;
export default function PassengerDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useAuth();
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
  } = useForm({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
    },
  });
  const onSubmit = (data: PassengerFormValues) => {
    console.log("Passenger data:", data);
    // Construct query params with passenger details
    const params = new URLSearchParams({
      journey: journeyData.id,
      seats: selectedSeats.join(","),
      price: totalPrice.toString(),
      name: data.fullName,
      email: data.email || user?.email || "",
      phone: data.phone,
    });
    router.push(`/booking/steps/payment?${params.toString()}`);
  };
  return (
    <main>
      <div>
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Seat Selection
        </Button>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6">Passenger Details</h1>
          <BookingTimeline />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 mt-10">
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
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" {...register("fullName")} />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" {...register("phone")} />
                          {errors.phone && (
                            <p className="text-sm text-destructive">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email (Optional)</Label>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            defaultValue={user?.email || ""}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">
                              {errors.email.message}
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
      </div>
    </main>
  );
}
