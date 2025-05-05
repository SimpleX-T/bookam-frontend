"use client";

import {
  BusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  Users,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUsers, useBuses } from "@/hooks/use-api-queries";
import { formatNumber } from "@/lib/utils";

export function SectionCards() {
  const { data: users, isLoading: usersLoading } = useUsers();
  console.log(users);
  const { data: buses, isLoading: busesLoading } = useBuses();

  // Calculate month-over-month growth (dummy data for now)
  const userGrowth = 15;
  const busGrowth = buses ? ((buses.length - 50) / 50) * 100 : 0;
  const revenueGrowth = 22;
  const bookingGrowth = 18;

  return (
    <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="@container/card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <CardHeader className="relative mt-5">
          <CardDescription className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Users className="h-4 w-4" />
            Users
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-blue-700 dark:text-blue-300">
            {usersLoading ? "..." : formatNumber(users?.length || 0)}
          </CardTitle>
          <div className="absolute right-4 -top-4">
            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200">
              <TrendingUpIcon className="mr-1 h-3 w-3" />
              {userGrowth}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-blue-700 dark:text-blue-300">
            Growth <TrendingUpIcon className="h-4 w-4" />
          </div>
          <div className="text-blue-600 dark:text-blue-400">vs. last month</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
        <CardHeader className="relative mt-5">
          <CardDescription className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <BusIcon className="h-4 w-4" />
            Buses
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-green-700 dark:text-green-300">
            {busesLoading ? "..." : formatNumber(buses?.length || 0)}
          </CardTitle>
          <div className="absolute right-4 -top-4">
            <Badge className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200">
              <TrendingUpIcon className="mr-1 h-3 w-3" />
              {busGrowth}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-green-700 dark:text-green-300">
            Fleet <TrendingUpIcon className="h-4 w-4" />
          </div>
          <div className="text-green-600 dark:text-green-400">this month</div>
        </CardFooter>
      </Card>

      {/* Keep revenue and bookings cards but simplify text */}
      <Card className="@container/card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
        <CardHeader className="relative mt-5">
          <CardDescription className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <span className="text-lg">₦</span>
            Revenue
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-purple-700 dark:text-purple-300">
            ₦4.5M
          </CardTitle>
          <div className="absolute right-4 -top-4">
            <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200">
              <TrendingUpIcon className="mr-1 h-3 w-3" />
              {revenueGrowth}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-purple-700 dark:text-purple-300">
            Growth <TrendingUpIcon className="h-4 w-4" />
          </div>
          <div className="text-purple-600 dark:text-purple-400">this month</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
        <CardHeader className="relative mt-5">
          <CardDescription className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <BookOpen className="h-4 w-4" />
            Bookings
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-amber-700 dark:text-amber-300">
            3.4K
          </CardTitle>
          <div className="absolute right-4 -top-4">
            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-200">
              <TrendingUpIcon className="mr-1 h-3 w-3" />
              {bookingGrowth}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-amber-700 dark:text-amber-300">
            Growth <TrendingUpIcon className="h-4 w-4" />
          </div>
          <div className="text-amber-600 dark:text-amber-400">this month</div>
        </CardFooter>
      </Card>
    </div>
  );
}
