import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Clock, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About Us | N-Journey",
  description:
    "Learn about N-Journey, Nigeria's premier bus transportation service",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-12 rounded-xl bg-gradient-to-r from-green-900 to-green-700 p-8 text-white dark:from-green-950 dark:to-green-800">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                About N-Journey
              </h1>
              <p className="mb-6 text-lg">
                Nigeria's premier bus transportation service, connecting people
                and places with comfort, safety, and reliability since 2010.
              </p>
              <Button
                asChild
                className="w-fit bg-white text-green-900 hover:bg-gray-100"
              >
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative hidden h-[300px] overflow-hidden rounded-xl md:block">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="N-Journey team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Our Story</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From humble beginnings to becoming Nigeria's most trusted
              transportation network
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Our Beginning</CardTitle>
                <CardDescription>2010-2013</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  N-Journey started with just 5 buses connecting Lagos and
                  Abuja. Our founder, Dr. Adebayo Ogunlesi, envisioned a
                  transportation system that would prioritize safety and comfort
                  above all else.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expansion Years</CardTitle>
                <CardDescription>2014-2018</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  We expanded to cover all 36 states in Nigeria, with a fleet of
                  over 200 buses. During this period, we introduced our
                  revolutionary online booking system and mobile app.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Innovation Era</CardTitle>
                <CardDescription>2019-Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Today, N-Journey operates over 500 buses with cutting-edge
                  technology, including real-time tracking, digital ticketing,
                  and enhanced safety features. We continue to innovate and
                  improve our services.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-12 rounded-xl bg-muted p-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Our Values</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              The principles that guide everything we do at N-Journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Customer First</h3>
              <p className="text-muted-foreground">
                We prioritize our customers' needs, comfort, and satisfaction in
                every decision we make.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Safety</h3>
              <p className="text-muted-foreground">
                Safety is non-negotiable. We maintain the highest standards in
                vehicle maintenance and driver training.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Reliability</h3>
              <p className="text-muted-foreground">
                We are committed to punctuality and dependability, respecting
                our customers' time and schedules.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Community</h3>
              <p className="text-muted-foreground">
                We are proud to serve and contribute to the communities across
                Nigeria through our services.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Our Leadership Team</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Meet the dedicated professionals guiding N-Journey's vision and
              operations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Dr. Adebayo Ogunlesi"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle>Dr. Adebayo Ogunlesi</CardTitle>
                <CardDescription>Founder & CEO</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  With over 25 years in transportation and logistics, Dr.
                  Ogunlesi founded N-Journey with a vision to transform bus
                  travel in Nigeria.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Mrs. Folake Adeyemi"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle>Mrs. Folake Adeyemi</CardTitle>
                <CardDescription>Chief Operations Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Mrs. Adeyemi oversees all operational aspects of N-Journey,
                  ensuring smooth and efficient service delivery across our
                  network.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Mr. Chukwudi Nwachukwu"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle>Mr. Chukwudi Nwachukwu</CardTitle>
                <CardDescription>Chief Technology Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Mr. Nwachukwu leads our technology initiatives, driving
                  innovation in our booking systems, mobile apps, and fleet
                  management.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Our Achievements</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Milestones and recognition in our journey of excellence
            </p>
          </div>

          <Tabs defaultValue="awards" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="impact">Social Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="awards" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Transport Company of the Year</CardTitle>
                    <CardDescription>
                      Nigeria Transport Awards, 2022
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Recognized for excellence in service delivery, safety
                      standards, and customer satisfaction.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Innovation in Transportation</CardTitle>
                    <CardDescription>
                      African Business Excellence Awards, 2021
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Awarded for our pioneering digital booking system and
                      real-time tracking technology.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="milestones" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>500+ Bus Fleet</CardTitle>
                    <CardDescription>Achieved in 2023</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Expanded our fleet to over 500 buses, becoming the largest
                      private bus operator in West Africa.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>10 Million Passengers</CardTitle>
                    <CardDescription>Milestone reached in 2022</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Proudly served our 10 millionth passenger, marking a
                      significant achievement in our growth.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="impact" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Road Safety Initiative</CardTitle>
                    <CardDescription>Launched in 2020</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Our road safety education program has reached over 100,000
                      students across Nigeria.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Carbon Reduction Program</CardTitle>
                    <CardDescription>Ongoing since 2019</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Reduced our carbon footprint by 30% through fleet
                      modernization and eco-driving practices.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="rounded-xl bg-primary p-8 text-primary-foreground">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold">
                Join Us on Our Journey
              </h2>
              <p className="mb-6 text-lg">
                Experience the N-Journey difference for yourself. Book your next
                trip with us and discover why we're Nigeria's most trusted bus
                transportation service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="secondary">
                  <Link href="/">Book Now</Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center">
              <div className="relative h-[200px] w-[300px] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="N-Journey bus"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
