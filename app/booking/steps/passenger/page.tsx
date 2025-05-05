"use client";

import { v4 as uuidV4 } from "uuid";

import { usePaystackPayment } from "react-paystack";
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
import { BookingDetails, Bus as BusType, Route } from "@/types";
import { useApp } from "@/contexts/app-context";
import { extractNumberFromKey, formatDateToDayHourMinute } from "@/lib/utils";
import { HookConfig } from "react-paystack/dist/types";
import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const passengerSchema = z.object({
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters" }),
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

interface PaystackSuccessResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  message?: string;
  trxref?: string;
}

const PaystackWrapper = dynamic(
  () => import("@/components/booking/paystack-wrapper"),
  {
    ssr: false,
  }
);

export default function PassengerDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [routeDetails, setRouteDetails] = useState<Route | null>(null);
  const [busDetails, setBusDetails] = useState<BusType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderPaystack, setRenderPaystack] = useState(false);
  const [paystackConfig, setPaystackConfig] = useState<any | null>(null);

  const { user } = useAuth();
  const { routes } = useApp();

  useEffect(() => {
    const busParams = searchParams.get("bId");
    const routeParams = searchParams.get("rId");

    const routeDetails = routes.find(
      (route) => Number(route.routeId) === Number(routeParams)
    );
    if (!routeDetails) return setRouteDetails(null);

    const busDetails = routeDetails.buses.find(
      (bus) => Number(bus.busId) === Number(busParams)
    );
    if (!busDetails) return setBusDetails(null);

    setRouteDetails(routeDetails);
    setBusDetails(busDetails);
  }, [searchParams]);

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
      username: user?.username || "",
      phone: "",
    },
  });

  const handleSuccess = async (response: PaystackSuccessResponse) => {
    if (response.status === "success") {
      const bookingDetails: BookingDetails = {
        busId: busDetails?.busId || "",
        routeId: routeDetails?.routeId || "",
        seatNumber: Number(
          selectedSeats.map((s) => extractNumberFromKey(s)).join(",")
        ),
        completed: true,
        checkedIn: false,
        userId: user?.userId || "",
      };

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify(bookingDetails),
          }
        );

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message);
        }

        const { data } = await res.json();
        router.push(`/mobile-ticket/${data.bookingId}`);
      } catch (error) {
        console.error("Booking failed:", error);
      }
    } else {
      console.error("Payment failed:", response);
    }
  };

  const onSubmit = async (data: PassengerFormValues) => {
    const totalPrice: number = Number(searchParams.get("price"));
    if (!totalPrice) return;

    const config: HookConfig = {
      reference: uuidV4(),
      email: user?.email || "",
      amount: totalPrice * 100,
      publicKey: "pk_test_63703ae26e93421f1aaa96cb49882df79de973b9",
      metadata: {
        payment_type: "order",
        custom_fields: [
          {
            display_name: "Passenger Name",
            variable_name: "passenger_name",
            value: data.username,
          },
        ],
      },
    };

    setPaystackConfig(config);
    setRenderPaystack(true);
  };

  return (
    <main className="min-h-screen">
      {renderPaystack && paystackConfig && (
        <PaystackWrapper
          config={paystackConfig}
          onSuccess={handleSuccess}
          onClose={() => {
            console.log("Payment window closed");
            setRenderPaystack(false);
          }}
        />
      )}
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
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          defaultValue={user?.username || ""}
                          {...register("username")}
                        />
                        {errors.username && (
                          <p className="text-sm text-destructive">
                            {errors.username.message}
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
                    <Button
                      type="submit"
                      className="w-full disabled:cursor-not-allowed disabled:bg-opacity-30"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <span>Continue to Payment</span>
                      )}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {formatDateToDayHourMinute(
                          busDetails?.departureTime || ""
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {formatDateToDayHourMinute(
                            busDetails?.departureTime || ""
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{routeDetails?.origin}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {formatDateToDayHourMinute(
                            busDetails?.arrivalTime || ""
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {routeDetails?.destination}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {busDetails?.busModel || "Standard Bus"}
                      </span>
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
