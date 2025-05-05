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
import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/contexts/app-context";

export function SectionCards() {
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: buses, isLoading: busesLoading } = useBuses();
  const { bookings, bookingsLoading } = useApp();

  // Calculate total revenue and completed bookings
  const { totalRevenue, completedBookings } = useMemo(() => {
    return bookings.reduce(
      (acc, booking) => {
        if (booking.completed) {
          acc.completedBookings.push(booking);
          acc.totalRevenue += Number(booking.routeId) || 0;
        }
        return acc;
      },
      { totalRevenue: 0, completedBookings: [] as typeof bookings }
    );
  }, [bookings]);

  // Calculate growth percentages
  const calculateGrowth = (data: any[], days: number = 30) => {
    const now = new Date();
    const past = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const currentPeriodData = data.filter(
      (item) => new Date(item.createdAt) > past
    );
    const previousPeriodData = data.filter(
      (item) =>
        new Date(item.createdAt) <= past &&
        new Date(item.createdAt) >
          new Date(past.getTime() - days * 24 * 60 * 60 * 1000)
    );

    if (previousPeriodData.length === 0) return 0;

    return (
      ((currentPeriodData.length - previousPeriodData.length) /
        previousPeriodData.length) *
      100
    );
  };

  const userGrowth = calculateGrowth(users || []);
  const busGrowth = calculateGrowth(buses || []);
  const bookingGrowth = calculateGrowth(bookings);
  const revenueGrowth = calculateGrowth(completedBookings);

  // Generate chart data
  // const generateChartData = () => {
  //   const last30Days = [...Array(30)]
  //     .map((_, i) => {
  //       const date = new Date();
  //       date.setDate(date.getDate() - i);
  //       return date.toISOString().split("T")[0];
  //     })
  //     .reverse();

  //   return last30Days.map((date) => {
  //     const dayBookings = bookings.filter(
  //       (b) => b.bookingDate.split("T")[0] === date
  //     );
  //     const dayUsers = (users || []).filter(
  //       (u) => u.createdAt.split("T")[0] === date
  //     );
  //     const dayRevenue = dayBookings
  //       .filter((b) => b.completed)
  //       .reduce((sum, b) => sum + (b.routes[0]?.price || 0), 0);

  //     return {
  //       date,
  //       bookings: dayBookings.length,
  //       users: dayUsers.length,
  //       revenue: dayRevenue,
  //     };
  //   });
  // };

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
              {userGrowth >= 0 ? (
                <TrendingUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDownIcon className="mr-1 h-3 w-3" />
              )}
              {Math.abs(userGrowth).toFixed(1)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-blue-700 dark:text-blue-300">
            Growth{" "}
            {userGrowth >= 0 ? (
              <TrendingUpIcon className="h-4 w-4" />
            ) : (
              <TrendingDownIcon className="h-4 w-4" />
            )}
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
              {busGrowth >= 0 ? (
                <TrendingUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDownIcon className="mr-1 h-3 w-3" />
              )}
              {Math.abs(busGrowth).toFixed(1)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-green-700 dark:text-green-300">
            Fleet{" "}
            {busGrowth >= 0 ? (
              <TrendingUpIcon className="h-4 w-4" />
            ) : (
              <TrendingDownIcon className="h-4 w-4" />
            )}
          </div>
          <div className="text-green-600 dark:text-green-400">this month</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
        <CardHeader className="relative mt-5">
          <CardDescription className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <span className="text-lg">₦</span>
            Revenue
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-purple-700 dark:text-purple-300">
            ₦{formatNumber(totalRevenue)}
          </CardTitle>
          <div className="absolute right-4 -top-4">
            <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200">
              {revenueGrowth >= 0 ? (
                <TrendingUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDownIcon className="mr-1 h-3 w-3" />
              )}
              {Math.abs(revenueGrowth).toFixed(1)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-purple-700 dark:text-purple-300">
            Growth{" "}
            {revenueGrowth >= 0 ? (
              <TrendingUpIcon className="h-4 w-4" />
            ) : (
              <TrendingDownIcon className="h-4 w-4" />
            )}
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
            {bookingsLoading ? "..." : formatNumber(bookings.length)}
          </CardTitle>
          <div className="absolute right-4 -top-4">
            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-200">
              {bookingGrowth >= 0 ? (
                <TrendingUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDownIcon className="mr-1 h-3 w-3" />
              )}
              {Math.abs(bookingGrowth).toFixed(1)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-amber-700 dark:text-amber-300">
            Growth{" "}
            {bookingGrowth >= 0 ? (
              <TrendingUpIcon className="h-4 w-4" />
            ) : (
              <TrendingDownIcon className="h-4 w-4" />
            )}
          </div>
          <div className="text-amber-600 dark:text-amber-400">this month</div>
        </CardFooter>
      </Card>
    </div>
  );
}
