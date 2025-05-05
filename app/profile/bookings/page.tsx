"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Bus, Calendar, Download } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { toast } from "sonner";
import { Booking } from "@/types";
import { useApp } from "@/contexts/app-context";

export default function BookingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { userBookings, userBookingsLoading, userBookingError, deleteBooking } =
    useApp();
  const [activeTab, setActiveTab] = useState("all");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleCancelBooking = async (id: string | number) => {
    try {
      await deleteBooking(String(id));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  const handleDownloadTicket = (id: string | number) => {
    // Implement ticket download logic
    toast.info("Downloading ticket...");
  };

  const filteredBookings = userBookings?.filter((booking: Booking) => {
    if (activeTab === "all") return true;
    if (activeTab === "paid") return booking.completed;
    if (activeTab === "checkedin") return booking.checkedIn;
    return true;
  });

  if (authLoading || userBookingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (userBookingError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Error loading bookings</h3>
          <p className="text-muted-foreground">{userBookingError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={"/placeholder-user.jpg"}
                      alt={user?.username || "User"}
                    />
                    <AvatarFallback>
                      {user?.username?.substring(0, 2)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">
                      {user?.username || "User"}
                    </h2>
                  </div>
                </div>

                <Separator className="my-6" />

                <nav className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/profile">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-muted"
                    asChild
                  >
                    <Link href="/profile/bookings">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                        <path d="M12 11h4" />
                        <path d="M12 16h4" />
                        <path d="M8 11h.01" />
                        <path d="M8 16h.01" />
                      </svg>
                      My Bookings
                    </Link>
                  </Button>
                </nav>

                <Separator className="my-6" />

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                  Log Out
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <Button asChild>
                  <Link href="/">Book New Journey</Link>
                </Button>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                  <TabsTrigger value="checkedin">Checked-In</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="pt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {!filteredBookings?.length ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted-foreground"
                          >
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="3"
                              rx="2"
                              ry="2"
                            />
                            <line x1="9" x2="15" y1="9" y2="15" />
                            <line x1="15" x2="9" y1="9" y2="15" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          No bookings found
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          You don't have any{" "}
                          {activeTab !== "all" ? activeTab : ""} bookings yet.
                        </p>
                        <Button asChild>
                          <Link href="/">Book a Journey</Link>
                        </Button>
                      </div>
                    ) : (
                      filteredBookings.map((booking: Booking) => (
                        <BookingCard
                          key={booking.bookingId}
                          booking={booking}
                          onCancel={() =>
                            handleCancelBooking(booking.bookingId)
                          }
                          onDownload={() =>
                            handleDownloadTicket(booking.bookingId)
                          }
                        />
                      ))
                    )}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Add a separate BookingCard component for better organization
function BookingCard({
  booking,
  onCancel,
  onDownload,
}: {
  booking: Booking;
  onCancel: () => void;
  onDownload: () => void;
}) {
  // Format the booking date
  const formattedDate = new Date(booking.bookingDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card key={booking.bookingId} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
              <Bus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-medium">
                {booking.bus[0]?.busModel || "Bus"}
              </div>
              <div className="text-xs text-muted-foreground">
                Bus Number: {booking.bus[0]?.busNumber}
              </div>
            </div>
          </div>
          <Badge
            variant={
              !booking.completed && !booking.checkedIn
                ? "default"
                : booking.completed
                ? "outline"
                : "secondary"
            }
          >
            {booking.completed
              ? "Completed"
              : booking.checkedIn
              ? "Checked In"
              : "Upcoming"}
          </Badge>
        </div>

        <div className="p-4">
          <div className="w-full flex items-center justify-between mb-4">
            <div className="space-y-1">
              <div className="text-lg font-bold">
                {booking.routes[0]?.origin}
              </div>
              <div className="text-xs text-muted-foreground">
                Departure Terminal
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-xs text-muted-foreground mb-1">
                {booking.routes[0]?.duration || "Duration"}
              </div>
              <div className="relative w-16 md:w-24">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-dashed"></span>
                </div>
                <div className="relative flex justify-center">
                  <ArrowRight className="bg-background w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-lg font-bold">
                {booking.routes[0]?.destination}
              </div>
              <div className="text-xs text-muted-foreground">
                Arrival Terminal
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-wrap items-center gap-4 text-sm ">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M15 5v14" />
                  <path d="M5 5h14" />
                  <path d="M5 14h14" />
                  <path d="M10 2v4" />
                  <path d="M7 5v4" />
                  <path d="M10 18v4" />
                  <path d="M7 15v4" />
                </svg>
                <span>Seat {booking.seatNumber}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{booking.routes[0]?.description}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {!booking.completed && !booking.checkedIn && (
                <>
                  <Button size="sm" asChild>
                    <Link href={`/booking/${booking.bookingId}`}>
                      View Ticket
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {booking.completed && (
                <>
                  <Button size="sm" asChild>
                    <Link href={`/booking/${booking.bookingId}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/">Book Again</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
