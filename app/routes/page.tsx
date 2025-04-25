import { Card, CardContent } from "@/components/ui/card";
import React from "react";
// import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { routes } from "@/lib/constants";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function Routes() {
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Available Routes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route, index) => (
              <div
                key={route.id}
                // initial={{ opacity: 0, y: 20 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-40">
                    <Image
                      src={route.image || "/placeholder.svg"}
                      alt={`${route.from} to ${route.to}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-bold text-lg">
                        {route.from} <ArrowRight className="inline h-4 w-4" />{" "}
                        {route.to}
                      </div>
                      <Badge variant="outline" className="text-primary">
                        ₦{route.price.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Clock className="mr-1 h-4 w-4" />
                      {route.duration}
                    </div>
                    <Button className="w-full" asChild>
                      <Link
                        href={`/search?from=${route.from.toLowerCase()}&to=${route.to.toLowerCase()}`}
                      >
                        Book Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
