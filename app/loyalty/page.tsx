"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Award,
  CreditCard,
  ArrowRight,
  ChevronRight,
  Clock,
  Ticket,
  Bus,
  Percent,
  Coffee,
  Luggage,
  Utensils,
  Wifi,
} from "lucide-react";
import { motion } from "motion/react";

// Dummy loyalty data
const loyaltyData = {
  user: {
    name: "Chioma Okafor",
    email: "chioma.okafor@example.com",
    memberSince: "January 2023",
    tier: "Gold",
    points: 4850,
    pointsToNextTier: 1150,
    nextTier: "Platinum",
  },
  tiers: [
    {
      name: "Bronze",
      pointsRequired: 0,
      benefits: [
        "Earn 5 points per ₦1,000 spent",
        "Access to exclusive promotions",
        "Birthday bonus points",
      ],
    },
    {
      name: "Silver",
      pointsRequired: 2000,
      benefits: [
        "Earn 7 points per ₦1,000 spent",
        "Priority boarding",
        "Free seat selection",
        "10% discount on food and beverages",
      ],
    },
    {
      name: "Gold",
      pointsRequired: 4000,
      benefits: [
        "Earn 10 points per ₦1,000 spent",
        "Free luggage upgrade",
        "Dedicated customer service line",
        "15% discount on food and beverages",
        "Complimentary Wi-Fi",
      ],
    },
    {
      name: "Platinum",
      pointsRequired: 6000,
      benefits: [
        "Earn 15 points per ₦1,000 spent",
        "Free cancellation and rebooking",
        "Premium lounge access",
        "20% discount on all services",
        "Complimentary meals on long journeys",
        "Priority check-in",
      ],
    },
  ],
  pointsHistory: [
    {
      id: "1",
      date: "April 15, 2025",
      description: "Lagos to Abuja Journey",
      points: 150,
      type: "earned",
    },
    {
      id: "2",
      date: "April 2, 2025",
      description: "Abuja to Enugu Journey",
      points: 120,
      type: "earned",
    },
    {
      id: "3",
      date: "March 28, 2025",
      description: "Redeemed for Free Luggage",
      points: -200,
      type: "redeemed",
    },
    {
      id: "4",
      date: "March 15, 2025",
      description: "Lagos to Benin Journey",
      points: 100,
      type: "earned",
    },
    {
      id: "5",
      date: "March 10, 2025",
      description: "Referral Bonus",
      points: 250,
      type: "earned",
    },
    {
      id: "6",
      date: "February 28, 2025",
      description: "Redeemed for Discount",
      points: -300,
      type: "redeemed",
    },
  ],
  rewards: [
    {
      id: "1",
      name: "Free Journey",
      description: "Redeem for a free one-way journey on any route",
      pointsRequired: 2000,
      image: "gift",
      popular: true,
    },
    {
      id: "2",
      name: "Seat Upgrade",
      description: "Upgrade to premium seating on your next journey",
      pointsRequired: 500,
      image: "seat",
    },
    {
      id: "3",
      name: "Extra Luggage",
      description: "Get an additional luggage allowance",
      pointsRequired: 300,
      image: "luggage",
    },
    {
      id: "4",
      name: "Meal Voucher",
      description: "Redeem for a meal voucher on your journey",
      pointsRequired: 200,
      image: "food",
    },
    {
      id: "5",
      name: "Priority Boarding",
      description: "Get priority boarding on your next journey",
      pointsRequired: 150,
      image: "priority",
    },
    {
      id: "6",
      name: "Wi-Fi Pass",
      description: "Get a free Wi-Fi pass for your journey",
      pointsRequired: 100,
      image: "wifi",
    },
  ],
};

const getRewardIcon = (image: string) => {
  switch (image) {
    case "gift":
      return <Gift className="h-8 w-8 text-primary" />;
    case "seat":
      return <CreditCard className="h-8 w-8 text-primary" />;
    case "luggage":
      return <Luggage className="h-8 w-8 text-primary" />;
    case "food":
      return <Utensils className="h-8 w-8 text-primary" />;
    case "priority":
      return <Clock className="h-8 w-8 text-primary" />;
    case "wifi":
      return <Wifi className="h-8 w-8 text-primary" />;
    default:
      return <Gift className="h-8 w-8 text-primary" />;
  }
};

export default function LoyaltyPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold">N-Journey Rewards</h1>
                <p className="text-muted-foreground">
                  Earn points and enjoy exclusive benefits
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-primary border-primary"
                >
                  {loyaltyData.user.tier} Member
                </Badge>
                <Button variant="outline" size="sm">
                  Refer a Friend
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Points Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {loyaltyData.user.points}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Available points
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tier Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>{loyaltyData.user.tier}</span>
                    <span>{loyaltyData.user.nextTier}</span>
                  </div>
                  <Progress
                    value={
                      ((loyaltyData.user.points -
                        (loyaltyData.tiers.find(
                          (t) => t.name === loyaltyData.user.tier
                        )?.pointsRequired ?? 0)) /
                        ((loyaltyData.tiers.find(
                          (t) => t.name === loyaltyData.user.nextTier
                        )?.pointsRequired ?? 0) -
                          (loyaltyData.tiers.find(
                            (t) => t.name === loyaltyData.user.tier
                          )?.pointsRequired ?? 0))) *
                      100
                    }
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {loyaltyData.user.pointsToNextTier} more points to reach{" "}
                    {loyaltyData.user.nextTier}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Member Since</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-medium">
                    {loyaltyData.user.memberSince}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Thank you for your loyalty!
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="grid grid-cols-4 md:w-[600px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="history">Points History</TabsTrigger>
                <TabsTrigger value="tiers">Membership Tiers</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome to N-Journey Rewards</CardTitle>
                    <CardDescription>
                      Earn points every time you travel with us and redeem them
                      for exciting rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Ticket className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Earn Points</h3>
                            <p className="text-sm text-muted-foreground">
                              Earn points every time you book a journey with
                              N-Journey. The higher your tier, the more points
                              you earn.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Gift className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Redeem Rewards</h3>
                            <p className="text-sm text-muted-foreground">
                              Use your points to redeem exciting rewards like
                              free journeys, seat upgrades, and more.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Tier Benefits</h3>
                            <p className="text-sm text-muted-foreground">
                              Enjoy exclusive benefits based on your membership
                              tier, including priority boarding, discounts, and
                              more.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Bus className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              Travel More, Earn More
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              The more you travel with us, the more points you
                              earn and the faster you climb up the membership
                              tiers.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Percent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Special Promotions</h3>
                            <p className="text-sm text-muted-foreground">
                              Get access to exclusive promotions and earn bonus
                              points during special events and holidays.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Coffee className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Partner Benefits</h3>
                            <p className="text-sm text-muted-foreground">
                              Enjoy special offers and discounts from our
                              partners, including hotels, restaurants, and more.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => setActiveTab("rewards")}
                      className="w-full"
                    >
                      Explore Rewards
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Popular Rewards</CardTitle>
                      <CardDescription>
                        Most popular rewards among our members
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {loyaltyData.rewards
                          .filter((reward) => reward.popular)
                          .map((reward) => (
                            <div
                              key={reward.id}
                              className="flex items-center gap-4"
                            >
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                {getRewardIcon(reward.image)}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{reward.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {reward.description}
                                </p>
                              </div>
                              <div className="text-sm font-medium">
                                {reward.pointsRequired} pts
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("rewards")}
                        className="w-full"
                      >
                        View All Rewards
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Your recent points activity
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {loyaltyData.pointsHistory
                          .slice(0, 3)
                          .map((activity) => (
                            <div
                              key={activity.id}
                              className="flex items-center justify-between"
                            >
                              <div>
                                <h3 className="font-medium">
                                  {activity.description}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  {activity.date}
                                </p>
                              </div>
                              <div
                                className={`font-medium ${
                                  activity.type === "earned"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {activity.type === "earned" ? "+" : "-"}
                                {Math.abs(activity.points)} pts
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("history")}
                        className="w-full"
                      >
                        View Full History
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="rewards" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Rewards</CardTitle>
                    <CardDescription>
                      Redeem your points for these exciting rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {loyaltyData.rewards.map((reward) => (
                        <Card key={reward.id} className="overflow-hidden">
                          <div className="bg-muted p-6 flex justify-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                              {getRewardIcon(reward.image)}
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">
                                {reward.name}
                              </CardTitle>
                              {reward.popular && (
                                <Badge className="bg-primary text-white">
                                  Popular
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              {reward.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="font-medium">
                                {reward.pointsRequired} points
                              </div>
                              <Button
                                size="sm"
                                disabled={
                                  loyaltyData.user.points <
                                  reward.pointsRequired
                                }
                              >
                                Redeem
                              </Button>
                            </div>
                            {loyaltyData.user.points <
                              reward.pointsRequired && (
                              <p className="text-xs text-muted-foreground mt-2">
                                You need{" "}
                                {reward.pointsRequired -
                                  loyaltyData.user.points}{" "}
                                more points
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Points History</CardTitle>
                    <CardDescription>
                      Your points earning and redemption history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {loyaltyData.pointsHistory.map((activity, index) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                activity.type === "earned"
                                  ? "bg-green-100"
                                  : "bg-red-100"
                              }`}
                            >
                              {activity.type === "earned" ? (
                                <ArrowRight className="h-4 w-4 text-green-500" />
                              ) : (
                                <Gift className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            {index < loyaltyData.pointsHistory.length - 1 && (
                              <div className="w-px h-full bg-muted-foreground/20 my-1"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">
                                  {activity.description}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  {activity.date}
                                </p>
                              </div>
                              <div
                                className={`font-medium ${
                                  activity.type === "earned"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {activity.type === "earned" ? "+" : "-"}
                                {Math.abs(activity.points)} pts
                              </div>
                            </div>
                            <Separator className="my-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tiers" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Membership Tiers</CardTitle>
                    <CardDescription>
                      Benefits and requirements for each membership tier
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {loyaltyData.tiers.map((tier) => (
                        <Card
                          key={tier.name}
                          className={`${
                            tier.name === loyaltyData.user.tier
                              ? "border-primary"
                              : ""
                          }`}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg">
                                {tier.name}
                              </CardTitle>
                              {tier.name === loyaltyData.user.tier && (
                                <Badge className="bg-primary text-white">
                                  Current Tier
                                </Badge>
                              )}
                            </div>
                            <CardDescription>
                              {tier.pointsRequired} points required
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <h3 className="font-medium mb-2">Benefits</h3>
                            <ul className="space-y-2">
                              {tier.benefits.map((benefit, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <ChevronRight className="h-4 w-4 text-primary" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          {tier.name !== loyaltyData.user.tier &&
                            tier.pointsRequired > loyaltyData.user.points && (
                              <CardFooter>
                                <div className="w-full">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>{loyaltyData.user.points} pts</span>
                                    <span>{tier.pointsRequired} pts</span>
                                  </div>
                                  <Progress
                                    value={
                                      (loyaltyData.user.points /
                                        tier.pointsRequired) *
                                      100
                                    }
                                    className="h-2"
                                  />
                                  <p className="text-xs text-muted-foreground mt-2">
                                    You need{" "}
                                    {tier.pointsRequired -
                                      loyaltyData.user.points}{" "}
                                    more points to reach this tier
                                  </p>
                                </div>
                              </CardFooter>
                            )}
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
