import { formatDateString } from "@/lib/utils";
import { Bus, Route } from "@/types";
import { Bus as BusIcon, Clock, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function BusCard({
  bus,
  route,
  onclick,
  index,
}: {
  bus: Bus;
  route: Route;
  onclick: (routeId: string, busId: string) => void;
  index: number;
}) {
  return (
    <motion.div
      key={bus.busId}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      layout
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow duration-200 border dark:border-gray-700">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-[auto_auto_auto] gap-4 p-4 items-center">
            {/* Journey Details */}
            <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center text-center sm:text-left sm:border-r border-gray-200 dark:border-gray-700 sm:pr-4">
              {/* Departure */}
              <div className="flex flex-col items-center sm:items-start">
                <address className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <MapPin size={12} /> {route.origin}
                </address>
                <span className="text-md font-semibold text-gray-900 dark:text-white">
                  {formatDateString(bus.departureTime)}
                </span>
              </div>

              {/* Duration & Stops */}
              <div className="flex flex-col items-center px-2">
                <span className="text-xs font-medium text-primary dark:text-primary-light whitespace-nowrap flex items-center gap-1">
                  <Clock size={12} /> {route.duration}
                </span>
                <div className="relative w-full my-1">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600" />
                  </div>
                </div>
              </div>

              {/* Arrival */}
              <div className="flex flex-col items-center sm:items-end">
                <address className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <MapPin size={12} /> {route.destination}
                </address>
                <span className="text-md font-semibold text-gray-900 dark:text-white">
                  {formatDateString(bus.arrivalTime)}
                </span>
              </div>
            </div>

            {/* Bus Details */}
            <div className="dark:border-gray-700">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {bus.busModel || "Standard Bus"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {bus.capacity} seats
                </span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex flex-col items-center sm:items-end gap-1 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 sm:pl-4">
              <div className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-1">
                ₦{route.price.toLocaleString()}
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                <Users size={12} />{" "}
                {Math.floor(bus.capacity - (Math.random() * bus.capacity) / 5)}{" "}
                seats left
              </p>

              <Button
                size="sm"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
                onClick={() => onclick(bus.routeId, bus.busId)}
              >
                Choose Seat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
