"use client";
import { useApp } from "@/contexts/app-context";
import { useUsers } from "@/hooks/use-api-queries";
import { useState, useEffect, useMemo } from "react";
import type { TooltipProps } from "recharts";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type MetricType = "bookings" | "users" | "revenue";

type ChartConfigValue = {
  label: string;
  color: string;
};

type ChartConfig = {
  [key in MetricType]: ChartConfigValue;
};

// Add the chart configuration
const chartConfig: ChartConfig = {
  bookings: {
    label: "Bookings",
    color: "#0891b2",
  },
  users: {
    label: "Users",
    color: "#2563eb",
  },
  revenue: {
    label: "Revenue",
    color: "#7c3aed",
  },
};

export function ChartAreaInteractive() {
  const { bookings } = useApp();
  const { data: users } = useUsers();

  const [timeRange, setTimeRange] = useState("30d");
  const [metricType, setMetricType] = useState("bookings");
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Set a default timeRange based on device
  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  // Generate real chart data from bookings and users
  const generateChartData = () => {
    const last30Days = [...Array(30)]
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      })
      .reverse();

    return last30Days.map((date) => {
      const dayBookings = bookings.filter(
        (b) => b.bookingDate.split("T")[0] === date
      );
      const dayUsers = (users || []).filter(
        () => "2025-05-05T02:05:13.855763Z".split("T")[0] === date
      );
      const dayRevenue = dayBookings
        .filter((b) => b.completed)
        .reduce((sum, booking) => {
          return booking.routes.reduce(
            (routeSum, route) => routeSum + (Number(route.price) || 0),
            sum
          );
        }, 0);

      return {
        date,
        bookings: dayBookings.length,
        users: dayUsers.length,
        revenue: dayRevenue,
      };
    });
  };

  const chartData = useMemo(() => generateChartData(), [bookings, users]);

  // Filter data based on selected time range
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date(); // Latest date in the data
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  // Custom tooltip formatter

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const formattedDate = new Date(label as string).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      );

      let formattedValue;
      if (metricType === "revenue") {
        formattedValue = `₦${data[metricType].toLocaleString()}`;
      } else {
        formattedValue = data[metricType].toLocaleString();
      }

      // Explicitly type metricType as MetricType for indexing
      const typedMetricType = metricType as MetricType;

      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-semibold dark:text-gray-100">{formattedDate}</p>
          <p className="text-sm">
            <span style={{ color: chartConfig[typedMetricType].color }}>
              {chartConfig[typedMetricType].label}: {formattedValue}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold dark:text-gray-100">
              Analytics Overview
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {metricType === "bookings"
                ? "Booking statistics over time"
                : metricType === "users"
                ? "User growth statistics"
                : "Revenue statistics"}
            </p>
          </div>

          <div className="flex gap-2">
            <select
              value={metricType}
              onChange={(e) => setMetricType(e.target.value as MetricType)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-sm
    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="bookings">Bookings</option>
              <option value="users">Users</option>
              <option value="revenue">Revenue</option>
            </select>

            {!isMobile && (
              <div className="flex border border-gray-300 dark:border-gray-700 rounded-md">
                <button
                  onClick={() => setTimeRange("30d")}
                  className={`px-2 py-1 text-sm ${
                    timeRange === "30d"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-white dark:bg-gray-800"
                  } text-gray-900 dark:text-gray-100`}
                >
                  Last 30 days
                </button>
                <button
                  onClick={() => setTimeRange("7d")}
                  className={`px-2 py-1 text-sm ${
                    timeRange === "7d"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-white dark:bg-gray-800"
                  } text-gray-900 dark:text-gray-100`}
                >
                  Last 7 days
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 dark:bg-gray-900">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="fillMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig[metricType as MetricType].color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[metricType as MetricType].color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(156, 163, 175, 0.2)"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fill: "currentColor" }}
                className="text-gray-600 dark:text-gray-400"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "currentColor" }}
                className="text-gray-600 dark:text-gray-400"
                tickFormatter={(value) => {
                  if (metricType === "revenue") {
                    return `₦${value.toLocaleString()}`;
                  }
                  return value.toLocaleString();
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={metricType}
                stroke={chartConfig[metricType as MetricType].color}
                fill="url(#fillMetric)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
