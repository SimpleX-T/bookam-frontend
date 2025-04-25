"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Gift,
  Percent,
  Star,
  Tag,
  Ticket,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function PromotionsClientPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <section className="mb-12 rounded-xl bg-gradient-to-r from-green-900 to-green-700 p-8 text-white dark:from-green-950 dark:to-green-800">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Special Offers & Promotions
            </h1>
            <p className="mb-6 text-lg">
              Discover amazing deals and discounts for your next journey across
              Nigeria.
            </p>
            <Button
              asChild
              className="w-fit bg-white text-green-900 hover:bg-gray-100"
            >
              <Link href="#current-promotions">
                View Offers <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative hidden h-[300px] overflow-hidden rounded-xl md:block">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="N-Journey promotions"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Current Promotions Section */}
      <section id="current-promotions" className="mb-12 scroll-mt-20">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Current Promotions</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Limited-time offers to make your travel more affordable and
            enjoyable
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Weekend Getaway"
                fill
                className="object-cover"
              />
              <Badge className="absolute right-3 top-3 bg-primary">
                30% OFF
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>Weekend Getaway Special</CardTitle>
              <CardDescription>Valid until December 31, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Enjoy 30% off on all weekend trips (Friday to Sunday) when you
                book at least 7 days in advance.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Friday to Sunday departures</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/">Book Now</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Family Package"
                fill
                className="object-cover"
              />
              <Badge className="absolute right-3 top-3 bg-primary">
                FAMILY DEAL
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>Family Travel Package</CardTitle>
              <CardDescription>Valid until January 15, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Book for 4 or more people and get one ticket free. Perfect for
                family trips and group travel.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>Buy 4, get 1 free</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/">Book Now</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Early Bird"
                fill
                className="object-cover"
              />
              <Badge className="absolute right-3 top-3 bg-primary">
                EARLY BIRD
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>Early Bird Discount</CardTitle>
              <CardDescription>Ongoing Promotion</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Book your journey 14+ days in advance and receive a 25% discount
                on any route across Nigeria.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Book 14+ days in advance</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/">Book Now</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="mb-12 rounded-xl bg-muted p-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Seasonal Offers</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Special promotions for holidays and peak seasons
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Christmas Holiday Special</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                >
                  HOLIDAY
                </Badge>
              </div>
              <CardDescription>
                December 15, 2023 - January 10, 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <Percent className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">
                  20% off all routes
                </span>
              </div>
              <p className="mb-4">
                Celebrate the festive season with special discounts on all our
                routes. Book early to secure your seat for holiday travel.
              </p>
              <div className="rounded-lg bg-primary/10 p-4">
                <h4 className="mb-2 font-semibold">Promotion Details:</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm">
                  <li>
                    Valid for travel between December 15, 2023 and January 10,
                    2024
                  </li>
                  <li>Booking must be made before December 10, 2023</li>
                  <li>Subject to seat availability</li>
                  <li>Cannot be combined with other offers</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/">Book Holiday Travel</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Independence Day Special</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  NATIONAL HOLIDAY
                </Badge>
              </div>
              <CardDescription>September 25 - October 5, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <Percent className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">
                  15% off + free refreshments
                </span>
              </div>
              <p className="mb-4">
                Celebrate Nigeria's Independence with special travel discounts
                and complimentary refreshments on board.
              </p>
              <div className="rounded-lg bg-primary/10 p-4">
                <h4 className="mb-2 font-semibold">Promotion Details:</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm">
                  <li>
                    Valid for travel between September 25 and October 5, 2023
                  </li>
                  <li>Complimentary refreshment pack for each passenger</li>
                  <li>Special Nigerian flag souvenir for children</li>
                  <li>Priority boarding for all passengers</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Loyalty Program */}
      <section className="mb-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">N-Journey Loyalty Program</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Earn points with every journey and enjoy exclusive benefits
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="bg-primary p-8 text-primary-foreground">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold">
                  Join Our Loyalty Program
                </h3>
                <p className="mb-6">
                  The N-Journey Loyalty Program rewards our frequent travelers
                  with points, exclusive benefits, and special offers. The more
                  you travel with us, the more you earn!
                </p>
                <Button asChild variant="secondary">
                  <Link href="/signup">
                    Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-full bg-white/10 p-6">
                  <Star className="h-24 w-24" />
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-8">
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="tiers">Membership Tiers</TabsTrigger>
                <TabsTrigger value="redeem">How to Redeem</TabsTrigger>
              </TabsList>
              <TabsContent value="benefits" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Ticket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Point Accumulation</h4>
                      <p className="text-muted-foreground">
                        Earn 1 point for every ₦1,000 spent on tickets. Points
                        can be redeemed for free trips, upgrades, and more.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Birthday Rewards</h4>
                      <p className="text-muted-foreground">
                        Receive a special discount voucher during your birthday
                        month as our gift to you.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Priority Booking</h4>
                      <p className="text-muted-foreground">
                        Get early access to seasonal promotions and special
                        offers before they're available to the general public.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Exclusive Perks</h4>
                      <p className="text-muted-foreground">
                        Enjoy exclusive benefits like priority boarding, extra
                        luggage allowance, and dedicated customer service.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tiers" className="mt-6">
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Silver Tier</h4>
                      <Badge>0-5,000 Points</Badge>
                    </div>
                    <p className="mb-3 text-muted-foreground">
                      Entry level membership with basic benefits.
                    </p>
                    <ul className="ml-5 list-disc space-y-1 text-sm">
                      <li>5% discount on weekday travels</li>
                      <li>Birthday voucher worth ₦2,000</li>
                      <li>Regular point accumulation rate</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Gold Tier</h4>
                      <Badge>5,001-15,000 Points</Badge>
                    </div>
                    <p className="mb-3 text-muted-foreground">
                      Mid-level membership with enhanced benefits.
                    </p>
                    <ul className="ml-5 list-disc space-y-1 text-sm">
                      <li>10% discount on all travels</li>
                      <li>Birthday voucher worth ₦5,000</li>
                      <li>1.5x point accumulation rate</li>
                      <li>Priority boarding</li>
                      <li>Free seat selection</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Platinum Tier</h4>
                      <Badge>15,001+ Points</Badge>
                    </div>
                    <p className="mb-3 text-muted-foreground">
                      Premium membership with exclusive benefits.
                    </p>
                    <ul className="ml-5 list-disc space-y-1 text-sm">
                      <li>15% discount on all travels</li>
                      <li>Birthday voucher worth ₦10,000</li>
                      <li>2x point accumulation rate</li>
                      <li>Priority boarding and check-in</li>
                      <li>Free seat selection</li>
                      <li>Extra luggage allowance (25kg)</li>
                      <li>Dedicated customer service line</li>
                      <li>Complimentary refreshments on board</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="redeem" className="mt-6">
                <div className="space-y-4">
                  <p>
                    Redeeming your loyalty points is easy and can be done
                    through our website, mobile app, or at any N-Journey
                    terminal.
                  </p>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-2 font-semibold">
                      How to Redeem Online:
                    </h4>
                    <ol className="ml-5 list-decimal space-y-2">
                      <li>Log in to your N-Journey account</li>
                      <li>Navigate to "My Rewards" section</li>
                      <li>Select "Redeem Points"</li>
                      <li>Choose your preferred redemption option</li>
                      <li>Follow the prompts to complete the redemption</li>
                    </ol>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-2 font-semibold">Redemption Options:</h4>
                    <ul className="ml-5 list-disc space-y-2">
                      <li>
                        <span className="font-medium">Free Tickets:</span>{" "}
                        Redeem points for complimentary travel tickets
                      </li>
                      <li>
                        <span className="font-medium">Discounts:</span> Apply
                        points for partial payment of tickets
                      </li>
                      <li>
                        <span className="font-medium">Seat Upgrades:</span> Use
                        points to upgrade to premium seats
                      </li>
                      <li>
                        <span className="font-medium">Extra Luggage:</span>{" "}
                        Redeem for additional luggage allowance
                      </li>
                      <li>
                        <span className="font-medium">Gift Vouchers:</span>{" "}
                        Convert points to gift vouchers for friends and family
                      </li>
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Note: Points expire 24 months after they are earned if not
                    redeemed. Redemption is subject to availability and may have
                    blackout dates during peak travel periods.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Promo Codes Section */}
      <section className="mb-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Special Promo Codes</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Use these codes during checkout to get additional discounts
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline" className="text-primary">
                NEW USER
              </Badge>
              <p className="text-sm text-muted-foreground">
                Valid until Dec 31, 2023
              </p>
            </div>
            <div className="mb-3 rounded-md bg-muted p-3 text-center font-mono text-lg font-bold">
              WELCOME10
            </div>
            <p className="text-sm text-muted-foreground">
              10% off your first booking with N-Journey. New users only.
            </p>
            <Separator className="my-3" />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText("WELCOME10");
                // You would add a toast notification here in a real app
              }}
            >
              Copy Code
            </Button>
          </div>

          <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline" className="text-primary">
                WEEKEND
              </Badge>
              <p className="text-sm text-muted-foreground">
                Valid until Nov 30, 2023
              </p>
            </div>
            <div className="mb-3 rounded-md bg-muted p-3 text-center font-mono text-lg font-bold">
              WEEKEND15
            </div>
            <p className="text-sm text-muted-foreground">
              15% off weekend trips (Fri-Sun). Minimum booking value of ₦5,000.
            </p>
            <Separator className="my-3" />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText("WEEKEND15");
                // You would add a toast notification here in a real app
              }}
            >
              Copy Code
            </Button>
          </div>

          <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline" className="text-primary">
                STUDENT
              </Badge>
              <p className="text-sm text-muted-foreground">Ongoing</p>
            </div>
            <div className="mb-3 rounded-md bg-muted p-3 text-center font-mono text-lg font-bold">
              STUDENT20
            </div>
            <p className="text-sm text-muted-foreground">
              20% off for students with valid ID. Available for all routes.
            </p>
            <Separator className="my-3" />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText("STUDENT20");
                // You would add a toast notification here in a real app
              }}
            >
              Copy Code
            </Button>
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="mb-12 rounded-xl bg-muted p-8">
        <h2 className="mb-4 text-2xl font-bold">Terms and Conditions</h2>
        <div className="space-y-4 text-sm">
          <p>
            All promotions and offers are subject to the following terms and
            conditions:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              Promotions cannot be combined with other offers unless explicitly
              stated.
            </li>
            <li>
              All discounts are applied to the base fare only and do not include
              taxes and fees.
            </li>
            <li>
              Promotional tickets may have limited availability and are subject
              to seat allocation.
            </li>
            <li>
              N-Journey reserves the right to modify or discontinue any
              promotion without prior notice.
            </li>
            <li>
              Promo codes are valid for one-time use only unless otherwise
              specified.
            </li>
            <li>
              Refunds for promotional tickets will be subject to the specific
              terms of each promotion.
            </li>
            <li>
              Identification may be required at check-in to verify eligibility
              for certain promotions (e.g., student discounts).
            </li>
            <li>
              Loyalty points cannot be earned on free tickets redeemed through
              the loyalty program.
            </li>
          </ul>
          <p>
            For complete terms and conditions, please visit our{" "}
            <Link href="#" className="text-primary underline">
              Terms of Service
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="mb-12 rounded-xl bg-primary p-8 text-primary-foreground">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Stay Updated on Promotions
            </h2>
            <p className="mb-6">
              Subscribe to our newsletter to receive the latest promotions,
              exclusive offers, and travel tips directly to your inbox.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-primary-foreground text-primary"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/80">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="rounded-full bg-white/10 p-6">
              <Mail className="h-24 w-24" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
