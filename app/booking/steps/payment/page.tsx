"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ArrowLeft, CreditCard, DollarSign } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const paymentSchema = z.object({
  paymentMethod: z.enum(["online", "cash"], {
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
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function PaymentMethodPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"online" | "cash">("online");
  const [passengerDetails, setPassengerDetails] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { user } = useAuth();

  // useEffect(() => {
  //   const name = searchParams.get("name");
  //   const email = searchParams.get("email");
  //   const phone = searchParams.get("phone");
  //   const seats = searchParams.get("seats")?.split(",");
  //   const price = parseInt(searchParams.get("price") || "0", 10);

  //   setPassengerDetails({ name, email, phone });
  //   if (seats) setSelectedSeats(seats);
  //   setTotalPrice(price);
  // }, [searchParams]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "online",
    },
  });

  const currentPaymentMethod = watch("paymentMethod");

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Payment data:", data);
    router.push("/booking/steps/confirmation");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold mb-6">Payment</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-lg font-medium">
                      Select Payment Method
                    </h2>
                  </div>

                  <div className="flex border-b">
                    <button
                      onClick={() => setActiveTab("online")}
                      className={`inline-block py-2 px-4 font-semibold ${
                        activeTab === "online"
                          ? "border-b-2 border-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      Online Payment
                    </button>
                    <button
                      onClick={() => setActiveTab("cash")}
                      className={`inline-block py-2 px-4 font-semibold ${
                        activeTab === "cash"
                          ? "border-b-2 border-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      Cash Payment
                    </button>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 mt-4"
                  >
                    {/* {activeTab === "online" && (
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

                            {/* <Select
                              onValueChange={(value) =>
                                setValue("expiryDate", value)
                              }
                            >
                              <SelectTrigger id="expiryDate">
                                <SelectValue placeholder="MM/YY" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) =>
                                  String(i + 1).padStart(2, "0")
                                ).map((month) => (
                                  <SelectItem
                                    key={month}
                                    value={`${month}/25`}
                                  >{`${month}/25`}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select> */}
                            {errors.expiryDate && (
                              <p className="text-sm text-destructive">
                                {errors.expiryDate.message}
                              </p>
                            )}

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

                    {activeTab === "cash" && (
                      <div className="py-4 text-muted-foreground">
                        <p>
                          Please proceed to the terminal to make your cash
                          payment.
                        </p>
                        <p className="mt-2">
                          Ensure to have the exact amount:{" "}
                          <span className="font-semibold text-primary">
                            ₦{totalPrice?.toLocaleString()}
                          </span>
                          .
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        activeTab === "online" &&
                        !!(errors.cardName || errors.expiryDate || errors.cvv)
                      }
                    >
                      {activeTab === "online" ? (
                        <>
                          Pay Now <CreditCard className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Confirm Cash Payment{" "}
                          <DollarSign className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Payment Details</h3>
                  <Separator className="mb-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">
                        {passengerDetails?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">
                        {passengerDetails?.email || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">
                        {passengerDetails?.phone || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seats:</span>
                      <span className="font-medium">
                        {selectedSeats.join(", ") || "N/A"}
                      </span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">
                      ₦{totalPrice?.toLocaleString()}
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
