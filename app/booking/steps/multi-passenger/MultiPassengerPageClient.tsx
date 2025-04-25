"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  Minus,
} from "lucide-react";
import { motion } from "motion/react";
import PassengerForm from "@/components/multi-passenger/passenger-form";

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

export default function MultiPassengerPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeTab, setActiveTab] = useState("passenger-1");
  const [passengerData, setPassengerData] = useState<Record<string, any>>({});
  const [isAllValid, setIsAllValid] = useState(false);

  useEffect(() => {
    // Get journey details from URL
    const seats = searchParams.get("seats");
    const price = searchParams.get("price");

    if (seats) {
      setSelectedSeats(seats.split(","));
    }

    if (price) {
      setTotalPrice(Number.parseInt(price, 10));
    }

    // Initialize passenger data
    if (selectedSeats.length > 0) {
      const initialData: Record<string, any> = {};
      selectedSeats.forEach((_, index) => {
        initialData[`passenger-${index + 1}`] = {
          isValid: false,
          data: {},
        };
      });
      setPassengerData(initialData);
    }
  }, [searchParams]);

  // Check if all passenger forms are valid
  useEffect(() => {
    const allValid = Object.values(passengerData).every(
      (passenger) => passenger.isValid
    );
    setIsAllValid(allValid);
  }, [passengerData]);

  const handlePassengerDataChange = (
    passengerId: string,
    isValid: boolean,
    data: any
  ) => {
    setPassengerData((prev) => ({
      ...prev,
      [passengerId]: {
        isValid,
        data,
      },
    }));
  };

  const handleContinue = () => {
    if (!isAllValid) {
      alert("Please complete all passenger details correctly");
      return;
    }

    // Prepare data for next step
    const allPassengersData = Object.values(passengerData).map(
      (passenger) => passenger.data
    );
    const leadPassenger = allPassengersData[0];

    // Construct query params with passenger details
    const params = new URLSearchParams({
      journey: journeyData.id,
      seats: selectedSeats.join(","),
      price: totalPrice.toString(),
      name: `${leadPassenger.firstName} ${leadPassenger.lastName}`,
      email: leadPassenger.email,
      phone: leadPassenger.phone,
      passengerCount: selectedSeats.length.toString(),
    });

    router.push(`/booking/steps/payment?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4 flex flex-wrap">
                      {selectedSeats.map((seat, index) => (
                        <TabsTrigger
                          key={index}
                          value={`passenger-${index + 1}`}
                          className="relative"
                        >
                          Passenger {index + 1}
                          {passengerData[`passenger-${index + 1}`]?.isValid && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                          )}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {selectedSeats.map((seat, index) => (
                      <TabsContent key={index} value={`passenger-${index + 1}`}>
                        <div className="mb-4">
                          <h3 className="text-lg font-medium">
                            Passenger {index + 1} - Seat {seat}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {index === 0
                              ? "Lead passenger details"
                              : "Passenger details"}
                          </p>
                        </div>

                        <PassengerForm
                          passengerId={`passenger-${index + 1}`}
                          isLead={index === 0}
                          onDataChange={handlePassengerDataChange}
                        />

                        <div className="flex justify-between mt-6">
                          {index > 0 && (
                            <Button
                              variant="outline"
                              onClick={() => setActiveTab(`passenger-${index}`)}
                              className="flex items-center"
                            >
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Previous Passenger
                            </Button>
                          )}
                          {index < selectedSeats.length - 1 && (
                            <Button
                              onClick={() =>
                                setActiveTab(`passenger-${index + 2}`)
                              }
                              className="flex items-center ml-auto"
                              disabled={
                                !passengerData[`passenger-${index + 1}`]
                                  ?.isValid
                              }
                            >
                              Next Passenger
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                          {index === selectedSeats.length - 1 && (
                            <Button
                              onClick={handleContinue}
                              className="flex items-center ml-auto"
                              disabled={!isAllValid}
                            >
                              Continue to Payment
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
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
                      <span className="text-sm">
                        {selectedSeats.length} Passenger(s)
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Selected Seats</h3>
                    <div className="space-y-1">
                      {selectedSeats.map((seat, index) => (
                        <div
                          key={seat}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            Passenger {index + 1} - Seat {seat}
                          </span>
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

                  <Button
                    onClick={handleContinue}
                    disabled={!isAllValid}
                    className="w-full"
                  >
                    Continue to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
