"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "paypal"], {
    required_error: "Please select a payment method",
  }),
  cardName: z
    .string()
    .min(2, { message: "Please enter the cardholder name" })
    .optional(),
  cardNumber: z
    .string()
    .min(16, { message: "Please enter a valid card number" })
    .optional(),
  expiryDate: z
    .string()
    .min(5, { message: "Please enter a valid expiry date" })
    .optional(),
  cvv: z.string().min(3, { message: "Please enter a valid CVV" }).optional(),
  useSameAddress: z.boolean().optional(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  nationality: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function PaymentMethodPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
      useSameAddress: false,
      termsAccepted: false,
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Payment data:", data);
    router.push("/booking/steps/confirmation");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">My booking</h1>
            <div className="relative flex items-center justify-between max-w-md mb-6">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  1
                </div>
                <span className="text-sm mt-1 text-primary">Booking</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  2
                </div>
                <span className="text-sm mt-1 text-primary">Purchase</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  3
                </div>
                <span className="text-sm mt-1 text-muted-foreground">
                  Get your E-ticket
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
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    <h2 className="text-lg font-medium">Payment method</h2>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <RadioGroup
                      defaultValue="card"
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      onValueChange={(value) => {
                        setPaymentMethod(value as "card" | "paypal");
                        setValue("paymentMethod", value as "card" | "paypal");
                      }}
                    >
                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "card" ? "border-primary" : ""
                        }`}
                      >
                        <RadioGroupItem
                          value="card"
                          id="card"
                          className="sr-only"
                          {...register("paymentMethod")}
                        />
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-4 cursor-pointer"
                        >
                          <div className="flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-red-500"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <circle cx="8" cy="12" r="2" />
                              <circle cx="16" cy="12" r="2" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-800"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                              <path d="M12 10v4" />
                              <path d="M10 12h4" />
                            </svg>
                          </div>
                        </Label>
                      </div>

                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "paypal" ? "border-primary" : ""
                        }`}
                      >
                        <RadioGroupItem
                          value="paypal"
                          id="paypal"
                          className="sr-only"
                          {...register("paymentMethod")}
                        />
                        <Label
                          htmlFor="paypal"
                          className="flex items-center gap-4 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="80"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-600"
                          >
                            <path d="M10 13a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2" />
                            <path d="M13.8 15.5v1.5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2" />
                            <path d="M7 15h2" />
                            <path d="M7 9h2" />
                            <path d="M15 9h2" />
                            <path d="M15 15h2" />
                          </svg>
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.paymentMethod && (
                      <p className="text-sm text-destructive">
                        {errors.paymentMethod.message}
                      </p>
                    )}

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on card</Label>
                          <Input
                            id="cardName"
                            placeholder="Enter name on card"
                            {...register("cardName")}
                          />
                          {errors.cardName && (
                            <p className="text-sm text-destructive">
                              {errors.cardName.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="Enter card number"
                            {...register("cardNumber")}
                          />
                          {errors.cardNumber && (
                            <p className="text-sm text-destructive">
                              {errors.cardNumber.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiration date</Label>
                            <Select
                              onValueChange={(value) =>
                                setValue("expiryDate", value)
                              }
                            >
                              <SelectTrigger id="expiryDate">
                                <SelectValue placeholder="MM/YY" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="01/25">01/25</SelectItem>
                                <SelectItem value="02/25">02/25</SelectItem>
                                <SelectItem value="03/25">03/25</SelectItem>
                                <SelectItem value="04/25">04/25</SelectItem>
                                <SelectItem value="05/25">05/25</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.expiryDate && (
                              <p className="text-sm text-destructive">
                                {errors.expiryDate.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="Enter CVV"
                              {...register("cvv")}
                            />
                            {errors.cvv && (
                              <p className="text-sm text-destructive">
                                {errors.cvv.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="useSameAddress"
                            checked={watch("useSameAddress")}
                            onCheckedChange={(checked) => {
                              setValue("useSameAddress", checked as boolean);
                            }}
                          />
                          <Label htmlFor="useSameAddress" className="text-sm">
                            Use same address as billing info
                          </Label>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            placeholder="Add address"
                            {...register("address")}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">Zip/Postal code</Label>
                            <Input
                              id="zipCode"
                              placeholder="Input code"
                              {...register("zipCode")}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="nationality">Nationality</Label>
                            <Select
                              onValueChange={(value) =>
                                setValue("nationality", value)
                              }
                            >
                              <SelectTrigger id="nationality">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="nigeria">Nigeria</SelectItem>
                                <SelectItem value="ghana">Ghana</SelectItem>
                                <SelectItem value="cameroon">
                                  Cameroon
                                </SelectItem>
                                <SelectItem value="benin">Benin</SelectItem>
                                <SelectItem value="togo">Togo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-sm text-muted-foreground">
                      By selecting the button below, I agree to the{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                      >
                        Property Rules, Terms and Conditions
                      </Button>
                      , and{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                      >
                        Privacy Policy
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="termsAccepted"
                        checked={watch("termsAccepted")}
                        onCheckedChange={(checked) => {
                          setValue("termsAccepted", checked as boolean);
                        }}
                      />
                      <Label htmlFor="termsAccepted" className="text-sm">
                        I agree to the terms and conditions
                      </Label>
                    </div>
                    {errors.termsAccepted && (
                      <p className="text-sm text-destructive">
                        {errors.termsAccepted.message}
                      </p>
                    )}

                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-primary">
                      Price details
                    </h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Adult basic fee</span>
                      <span>₦{journeyData.adultBasicFee.toLocaleString()}</span>
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

                  <Separator className="my-4" />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg text-primary">
                      ₦{journeyData.totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="font-medium">Houston - Los Angeles</h3>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {journeyData.logo}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          Cloudy Transit
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        HOU - LAS
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 8v4l3 3" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>Economy</span>
                      </div>

                      <div className="flex justify-between text-sm mb-1">
                        <span>23:15 - 1:25</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          <span>2h10m</span>
                        </span>
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className="text-primary">Refundable</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" x2="19" y1="12" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <span>Direct</span>
                        </span>
                      </div>
                      <div className="text-xs text-primary">
                        Reschedule Available
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {journeyData.logo}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          Cloudy Transit
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        LAS - LAX
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 8v4l3 3" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>Economy</span>
                      </div>

                      <div className="flex justify-between text-sm mb-1">
                        <span>2:25 - 7:40</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          <span>5h15m</span>
                        </span>
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className="text-primary">Refundable</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" x2="19" y1="12" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <span>Direct</span>
                        </span>
                      </div>
                      <div className="text-xs text-primary">
                        Reschedule Available
                      </div>
                    </div>
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
