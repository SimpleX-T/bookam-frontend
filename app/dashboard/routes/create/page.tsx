"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/contexts/app-context";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { generateRouteId } from "@/lib/utils";
import { useEffect } from "react";

const busSchema = z.object({
  busId: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
});
const locations = [
  "Aninri",
  "Awgu",
  "Enugu-East",
  "Enugu-West",
  "Enugu",
  "Ezeagu",
  "Emene",
  "Opi",
  "Ogbede",
  "Ogurute",
  "Ibagwa-Ani",
  "Ikem",
  "Amagunze",
  "Agbani",
  "Nsukka",
  "Oji River",
  "Udenu",
  "Udi",
  "Uzo-Uwani",
];

const formSchema = z.object({
  routeId: z.string().min(2),
  origin: z.string().min(2),
  destination: z.string().min(2),
  price: z.number().min(0),
  duration: z.string().min(2),
  image: z.string().url(),
  description: z.string().min(10),
  distance: z.string().min(2),
  buses: z.array(busSchema),
});

export default function CreateRoutePage() {
  const { createRoute, buses } = useApp();
  // console.log(buses);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      routeId: "",
      origin: "",
      destination: "",
      price: 0,
      duration: "",
      image: "",
      description: "",
      distance: "",
      buses: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "buses",
  });

  // Watch the required fields for ID generation
  const origin = form.watch("origin");
  const destination = form.watch("destination");
  const departureTime = form.watch("buses.0.departureTime");

  // Update route ID when dependencies change
  useEffect(() => {
    if (origin && destination && departureTime) {
      const generatedId = generateRouteId(origin, destination, departureTime);
      form.setValue("routeId", generatedId);
    }
  }, [origin, destination, departureTime, form]);

  // Watch origin and destination for description generation
  useEffect(() => {
    if (origin && destination) {
      const generatedDescription = `Direct transit from ${origin} to ${destination}`;
      form.setValue("description", generatedDescription);
    }
  }, [origin, destination, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createRoute({
        origin: values.origin,
        destination: values.destination,
        price: values.price,
        duration: values.duration,
        image: values.image,
        description: values.description,
        distance: values.distance,
        buses: values.buses.map((bus) => {
          const selectedBus = buses.find((b) => b.busId === bus.busId);
          return {
            busId: bus.busId,
            departureTime: new Date(bus.departureTime).toISOString(),
            arrivalTime: new Date(bus.arrivalTime).toISOString(),
            busNumber: selectedBus?.busNumber ?? "",
            busModel: selectedBus?.busModel ?? "",
            capacity: selectedBus?.capacity ?? 0,
          };
        }),
      });

      toast.success(
        "Route created successfully. The new route has been added to the system."
      );

      router.push("/dashboard/routes");
    } catch (error) {
      toast.error(
        "Failed to create route. There was an error creating the route. Please try again.",
        {
          // optional: you can pass options here if needed
          // description: "There was an error creating the route. Please try again.",
          // variant: "destructive",
        }
      );
      console.error("Create route error:", error);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Route</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="routeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="RT-ENU-NSK-1234 (Auto-generated)"
                      />
                    </FormControl>
                    <FormDescription>
                      This ID will be automatically generated based on the route
                      details
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => {
                    const destination = form.watch("destination");
                    return (
                      <FormItem>
                        <FormLabel>Origin</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select origin" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations
                              .filter((location) => location !== destination)
                              .map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
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
                  name="destination"
                  render={({ field }) => {
                    const origin = form.watch("origin");
                    return (
                      <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations
                              .filter((location) => location !== origin)
                              .map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (₦)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="8h 30m" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance</FormLabel>
                      <FormControl>
                        <Input placeholder="750km" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route Image URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description will be auto-generated..."
                        className="resize-none"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormDescription>
                      This description is automatically generated based on the
                      route details
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Assign Buses</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({
                        busId: "",
                        departureTime: "",
                        arrivalTime: "",
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Bus
                  </Button>
                </div>

                <ScrollArea className="h-[200px] rounded-md border">
                  {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border-b">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">
                          Bus Assignment {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`buses.${index}.busId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select Bus</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a bus" />
                                </SelectTrigger>
                                <SelectContent>
                                  {buses.map((bus) => (
                                    <SelectItem
                                      key={bus.busId}
                                      value={bus.busId}
                                    >
                                      {bus.busNumber} - {bus.busModel} (
                                      {bus.capacity} seats)
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
                          name={`buses.${index}.departureTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Departure</FormLabel>
                              <FormControl>
                                <Input type="datetime-local" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`buses.${index}.arrivalTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Arrival</FormLabel>
                              <FormControl>
                                <Input type="datetime-local" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <Button type="submit">Create Route</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
