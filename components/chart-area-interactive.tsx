"use client";
import { useState, useEffect } from "react";
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

// Chart data
const chartData = [
  { date: "2024-04-01", bookings: 22, users: 150, revenue: 55000 },
  { date: "2024-04-02", bookings: 97, users: 180, revenue: 242500 },
  { date: "2024-04-03", bookings: 67, users: 120, revenue: 167500 },
  { date: "2024-04-04", bookings: 142, users: 260, revenue: 355000 },
  { date: "2024-04-05", bookings: 173, users: 290, revenue: 432500 },
  { date: "2024-04-06", bookings: 201, users: 340, revenue: 502500 },
  { date: "2024-04-07", bookings: 110, users: 200, revenue: 275000 },
  { date: "2024-04-08", bookings: 155, users: 270, revenue: 387500 },
  { date: "2024-04-09", bookings: 88, users: 160, revenue: 220000 },
  { date: "2024-04-10", bookings: 190, users: 310, revenue: 475000 },
  { date: "2024-04-11", bookings: 125, users: 230, revenue: 312500 },
  { date: "2024-04-12", bookings: 75, users: 140, revenue: 187500 },
  { date: "2024-04-13", bookings: 165, users: 280, revenue: 412500 },
  { date: "2024-04-14", bookings: 92, users: 170, revenue: 230000 },
  { date: "2024-04-15", bookings: 130, users: 240, revenue: 325000 },
  { date: "2024-04-16", bookings: 105, users: 190, revenue: 262500 },
  { date: "2024-04-17", bookings: 180, users: 300, revenue: 450000 },
  { date: "2024-04-18", bookings: 115, users: 210, revenue: 287500 },
  { date: "2024-04-19", bookings: 80, users: 155, revenue: 200000 },
  { date: "2024-04-20", bookings: 170, users: 295, revenue: 425000 },
];

// Chart config
const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "#3b82f6", // blue-500
  },
  users: {
    label: "Users",
    color: "#10b981", // emerald-500
  },
  revenue: {
    label: "Revenue",
    color: "#8b5cf6", // violet-500
  },
};

export function ChartAreaInteractive() {
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

  // Filter data based on selected time range
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-04-20"); // Latest date in the data
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

      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-semibold dark:text-gray-100">{formattedDate}</p>
          <p className="text-sm">
            <span style={{ color: chartConfig[metricType].color }}>
              {chartConfig[metricType].label}: {formattedValue}
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
            <h3 className="text-lg font-semibold dark:text-gray-100">Analytics Overview</h3>
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
              onChange={(e) => setMetricType(e.target.value)}
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
                    stopColor={chartConfig[metricType].color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[metricType].color}
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
                tick={{ fill: 'currentColor' }}
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
                tick={{ fill: 'currentColor' }}
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
                stroke={chartConfig[metricType].color}
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
