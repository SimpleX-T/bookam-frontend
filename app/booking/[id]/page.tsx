"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Bus, Calendar, Clock, MapPin, User } from "lucide-react";
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
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type PassengerFormValues = z.infer<typeof passengerSchema>;

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Please enter a valid card number" }),
  cardholderName: z
    .string()
    .min(2, { message: "Please enter the cardholder name" }),
  expiryDate: z
    .string()
    .min(5, { message: "Please enter a valid expiry date" }),
  cvv: z.string().min(3, { message: "Please enter a valid CVV" }),
  saveCard: z.boolean().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("passenger");
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const {
    register: registerPassenger,
    handleSubmit: handleSubmitPassenger,
    formState: { errors: passengerErrors },
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

  const {
    register: registerPayment,
    handleSubmit: handleSubmitPayment,
    formState: { errors: paymentErrors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      saveCard: false,
    },
  });

  const onSubmitPassenger = (data: PassengerFormValues) => {
    console.log("Passenger data:", data);
    setActiveTab("payment");
  };

  const onSubmitPayment = (data: PaymentFormValues) => {
    console.log("Payment data:", data);
    setIsBookingComplete(true);
    // Redirect to confirmation page after a short delay
    setTimeout(() => {
      router.push(`/booking/confirmation/${params.id}`);
    }, 2000);
  };

  if (isBookingComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-muted/30 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your journey has been booked successfully.
            </p>
            <p className="text-muted-foreground">
              Redirecting to confirmation page...
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Complete your booking</CardTitle>
                  <CardDescription>
                    Fill in the required information to book your journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="passenger">
                        Passenger Details
                      </TabsTrigger>
                      <TabsTrigger value="payment">Payment</TabsTrigger>
                    </TabsList>

                    <TabsContent value="passenger" className="pt-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <form
                          onSubmit={handleSubmitPassenger(onSubmitPassenger)}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <RadioGroup
                                defaultValue=""
                                className="flex flex-wrap gap-4 mt-2"
                                {...registerPassenger("title")}
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
                              {passengerErrors.title && (
                                <p className="text-sm text-destructive mt-1">
                                  {passengerErrors.title.message}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  {...registerPassenger("firstName")}
                                />
                                {passengerErrors.firstName && (
                                  <p className="text-sm text-destructive">
                                    {passengerErrors.firstName.message}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                  id="lastName"
                                  {...registerPassenger("lastName")}
                                />
                                {passengerErrors.lastName && (
                                  <p className="text-sm text-destructive">
                                    {passengerErrors.lastName.message}
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
                                  {...registerPassenger("email")}
                                />
                                {passengerErrors.email && (
                                  <p className="text-sm text-destructive">
                                    {passengerErrors.email.message}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  {...registerPassenger("phone")}
                                />
                                {passengerErrors.phone && (
                                  <p className="text-sm text-destructive">
                                    {passengerErrors.phone.message}
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
                                  {...registerPassenger("dateOfBirth")}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="nationality">
                                  Nationality (Optional)
                                </Label>
                                <Input
                                  id="nationality"
                                  {...registerPassenger("nationality")}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="emergencyContact">
                                Emergency Contact (Optional)
                              </Label>
                              <Input
                                id="emergencyContact"
                                {...registerPassenger("emergencyContact")}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="specialRequirements">
                                Special Requirements (Optional)
                              </Label>
                              <Input
                                id="specialRequirements"
                                {...registerPassenger("specialRequirements")}
                              />
                            </div>

                            <div className="flex items-start space-x-2 pt-2">
                              <Checkbox
                                id="termsAccepted"
                                {...registerPassenger("termsAccepted")}
                              />
                              <div className="grid gap-1.5 leading-none">
                                <Label
                                  htmlFor="termsAccepted"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  I accept the terms and conditions
                                </Label>
                                {passengerErrors.termsAccepted && (
                                  <p className="text-sm text-destructive">
                                    {passengerErrors.termsAccepted.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <Button type="submit" className="w-full">
                            Continue to Payment
                          </Button>
                        </form>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="payment" className="pt-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <form
                          onSubmit={handleSubmitPayment(onSubmitPayment)}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                {...registerPayment("cardNumber")}
                              />
                              {paymentErrors.cardNumber && (
                                <p className="text-sm text-destructive">
                                  {paymentErrors.cardNumber.message}
                                </p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cardholderName">
                                Cardholder Name
                              </Label>
                              <Input
                                id="cardholderName"
                                placeholder="John Doe"
                                {...registerPayment("cardholderName")}
                              />
                              {paymentErrors.cardholderName && (
                                <p className="text-sm text-destructive">
                                  {paymentErrors.cardholderName.message}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                  id="expiryDate"
                                  placeholder="MM/YY"
                                  {...registerPayment("expiryDate")}
                                />
                                {paymentErrors.expiryDate && (
                                  <p className="text-sm text-destructive">
                                    {paymentErrors.expiryDate.message}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  {...registerPayment("cvv")}
                                />
                                {paymentErrors.cvv && (
                                  <p className="text-sm text-destructive">
                                    {paymentErrors.cvv.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-start space-x-2 pt-2">
                              <Checkbox
                                id="saveCard"
                                {...registerPayment("saveCard")}
                              />
                              <div className="grid gap-1.5 leading-none">
                                <Label
                                  htmlFor="saveCard"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Save this card for future bookings
                                </Label>
                              </div>
                            </div>
                          </div>

                          <Button type="submit" className="w-full">
                            Complete Booking
                          </Button>
                        </form>
                      </motion.div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <Calendar className="h-4 w-4 text-muted-foreground" />
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
                      <span className="text-sm">1 Passenger</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Price details</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Adult basic fee</span>
                        <span>
                          ₦{journeyData.adultBasicFee.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>{journeyData.tax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Regular total price</span>
                        <span>
                          ₦{journeyData.regularTotalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-primary">
                        <span>Save</span>
                        <span>-₦{journeyData.save.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg">
                      ₦{journeyData.totalPrice.toLocaleString()}
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
