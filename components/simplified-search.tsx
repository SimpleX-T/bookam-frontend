"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Popular destinations in Nigeria
const popularDestinations = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "ibadan", label: "Ibadan" },
  { value: "kano", label: "Kano" },
  { value: "port-harcourt", label: "Port Harcourt" },
  { value: "enugu", label: "Enugu" },
  { value: "benin", label: "Benin City" },
  { value: "kaduna", label: "Kaduna" },
  { value: "ilorin", label: "Ilorin" },
  { value: "jos", label: "Jos" },
];

const searchSchema = z.object({
  from: z.string({ required_error: "Please select departure city" }),
  to: z.string({ required_error: "Please select destination city" }),
  date: z.date({ required_error: "Please select a date" }),
  passengers: z.string({
    required_error: "Please select number of passengers",
  }),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export default function SimplifiedSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFrom = searchParams.get("from") || "";
  const initialTo = searchParams.get("to") || "";
  const initialPassengers = searchParams.get("passengers") || "1";

  let initialDate: Date = new Date();
  const dateParam = searchParams.get("date");
  if (dateParam) {
    const parsed = new Date(dateParam);
    if (!isNaN(parsed.getTime())) initialDate = parsed;
  }

  const [date, setDate] = useState<Date | undefined>(initialDate);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: initialFrom,
      to: initialTo,
      date: initialDate,
      passengers: initialPassengers,
    },
  });

  // Ensure React Hook Form's internal state reflects our controlled `date`
  useEffect(() => {
    setValue("date", date ?? new Date());
  }, [date, setValue]);

  const onSubmit = (data: SearchFormValues) => {
    const params = new URLSearchParams({
      from: data.from,
      to: data.to,
      date: data.date.toISOString(),
      passengers: data.passengers,
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From City */}
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select
                defaultValue={initialFrom}
                onValueChange={(value) => setValue("from", value)}
              >
                <SelectTrigger
                  id="from"
                  className={cn(errors.from && "border-destructive")}
                >
                  <SelectValue placeholder="Select departure city" />
                </SelectTrigger>
                <SelectContent>
                  {popularDestinations.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.from && (
                <p className="text-sm text-destructive">
                  {errors.from.message}
                </p>
              )}
            </div>

            {/* To City */}
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select
                defaultValue={initialTo}
                onValueChange={(value) => setValue("to", value)}
              >
                <SelectTrigger
                  id="to"
                  className={cn(errors.to && "border-destructive")}
                >
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  {popularDestinations.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.to && (
                <p className="text-sm text-destructive">{errors.to.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Departure Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                      errors.date && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      if (d) setValue("date", d);
                    }}
                    initialFocus
                    disabled={(d) =>
                      d < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-sm text-destructive">
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Passengers */}
            <div className="space-y-2">
              <Label htmlFor="passengers">Passengers</Label>
              <Select
                defaultValue={initialPassengers}
                onValueChange={(value) => setValue("passengers", value)}
              >
                <SelectTrigger id="passengers">
                  <SelectValue placeholder="Number of passengers" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Search Journeys
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
