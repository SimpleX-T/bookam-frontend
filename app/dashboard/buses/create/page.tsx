"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/app-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";

// Update the formSchema first to expect number for routeId
const formSchema = z.object({
  busNumber: z.string().min(2).max(50),
  busModel: z.string().min(2),
  routeId: z.number().min(1), // Changed from string to number
  capacity: z.number().min(1).max(50),
  departureTime: z.string(),
  arrivalTime: z.string(),
});
const BUS_MODELS = [
  "Volkswagen Transporter ",
  "Toyota HiAce ",
  "Toyota Coaster",
  "Ford Transit",
  "Toyota Sienna",
  "Tata Starbus",
  "Sml Isuzu S7",
  "BharatBenz 1624 Chassis",
  "Tata Ultra Staff Bus",
];
export default function CreateBusPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { routes, createBus } = useApp();
  const router = useRouter();
  // Update the defaultValues in useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      busNumber: "",
      busModel: "Toyota HiAce",
      routeId: 0, // Changed from empty string to number
      capacity: 32,
      departureTime: "",
      arrivalTime: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await createBus({
        busNumber: values.busNumber,
        busModel: values.busModel,
        routeId: values.routeId,
        capacity: values.capacity,
        departureTime: new Date(values.departureTime).toISOString(),
        arrivalTime: new Date(values.arrivalTime).toISOString(),
      });

      toast.success("Bus created successfully");
      router.push("/dashboard/buses");
    } catch (error) {
      toast.error("Failed to create bus");
      console.error("Create bus error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Bus</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="busNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bus Number</FormLabel>
                    <FormControl>
                      <Input placeholder="LG-234-KJA" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the bus registration number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="busModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bus Model</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bus model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"none"} defaultChecked disabled>
                          Select Bus Model
                        </SelectItem>
                        {BUS_MODELS.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="routeId"
                render={({ field }) => {
                  const selectedRoute = routes.find(
                    (route) => parseInt(route.routeId) === field.value
                  );

                  const displayValue = selectedRoute
                    ? `${selectedRoute.origin} to ${selectedRoute.destination}`
                    : "Select route";

                  return (
                    <FormItem>
                      <FormLabel>Route</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : undefined} // Convert number to string for select
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select route">
                            {displayValue}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none" disabled>
                            Select Route
                          </SelectItem>
                          {routes?.map((route) => (
                            <SelectItem
                              key={route.routeId}
                              value={String(route.routeId)} // Convert number to string for select options
                            >
                              {route.origin} to {route.destination}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departureTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrivalTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arrival Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                Create Bus
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
