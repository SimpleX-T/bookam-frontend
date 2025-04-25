import type { Metadata } from "next";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactForm from "@/components/contact/contact-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact Us | N-Journey",
  description:
    "Get in touch with N-Journey for inquiries, feedback, or support",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <section className="mb-12 rounded-xl bg-gradient-to-r from-green-900 to-green-700 p-8 text-white dark:from-green-950 dark:to-green-800">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="mx-auto mb-0 max-w-2xl text-lg">
              We're here to help! Reach out to us with any questions, feedback,
              or support needs.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="mb-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary p-6 text-primary-foreground">
                  <h2 className="text-2xl font-bold">Send Us a Message</h2>
                  <p className="text-primary-foreground/80">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>
                <div className="p-6">
                  <ContactForm />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="flex flex-col gap-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground">
                          Customer Service: +234 800 123 4567
                        </p>
                        <p className="text-muted-foreground">
                          Booking Support: +234 800 765 4321
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">
                          General Inquiries: info@n-journey.com
                        </p>
                        <p className="text-muted-foreground">
                          Customer Support: support@n-journey.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Head Office</h3>
                        <p className="text-muted-foreground">
                          N-Journey Tower, 123 Broad Street
                          <br />
                          Lagos Island, Lagos, Nigeria
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-3 mt-6 font-semibold">Follow Us</h3>
                  <div className="flex gap-4">
                    <Link
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Facebook className="h-5 w-5" />
                    </Link>
                    <Link
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Instagram className="h-5 w-5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Business Hours</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday:</span>
                      <span className="text-muted-foreground">
                        8:00 AM - 8:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span className="text-muted-foreground">
                        9:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span className="text-muted-foreground">
                        10:00 AM - 4:00 PM
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      * Customer service phone support hours. Our online booking
                      system is available 24/7.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Our Offices</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Visit us at any of our office locations across Nigeria
            </p>
          </div>

          <Tabs defaultValue="lagos" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="lagos">Lagos</TabsTrigger>
              <TabsTrigger value="abuja">Abuja</TabsTrigger>
              <TabsTrigger value="port-harcourt">Port Harcourt</TabsTrigger>
              <TabsTrigger value="kano">Kano</TabsTrigger>
            </TabsList>
            <TabsContent value="lagos" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-muted p-6">
                  <h3 className="mb-2 text-xl font-semibold">
                    Lagos Head Office
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    N-Journey Tower, 123 Broad Street
                    <br />
                    Lagos Island, Lagos, Nigeria
                  </p>
                  <div className="mb-4 rounded-lg bg-gray-200 p-2 text-center dark:bg-gray-700">
                    <p className="text-sm">
                      Map placeholder - Lagos Head Office
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+234 800 123 4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>lagos@n-journey.com</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-muted p-6">
                  <h3 className="mb-2 text-xl font-semibold">Lagos Terminal</h3>
                  <p className="mb-4 text-muted-foreground">
                    45 Ikorodu Road, Jibowu
                    <br />
                    Yaba, Lagos, Nigeria
                  </p>
                  <div className="mb-4 rounded-lg bg-gray-200 p-2 text-center dark:bg-gray-700">
                    <p className="text-sm">Map placeholder - Lagos Terminal</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+234 800 987 6543</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>lagosterminal@n-journey.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="abuja" className="mt-6">
              <div className="rounded-xl bg-muted p-6">
                <h3 className="mb-2 text-xl font-semibold">Abuja Office</h3>
                <p className="mb-4 text-muted-foreground">
                  Plot 234, Wuse Zone 5
                  <br />
                  Abuja, FCT, Nigeria
                </p>
                <div className="mb-4 rounded-lg bg-gray-200 p-2 text-center dark:bg-gray-700">
                  <p className="text-sm">Map placeholder - Abuja Office</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+234 800 456 7890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>abuja@n-journey.com</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="port-harcourt" className="mt-6">
              <div className="rounded-xl bg-muted p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  Port Harcourt Office
                </h3>
                <p className="mb-4 text-muted-foreground">
                  78 Aba Road, GRA Phase 2
                  <br />
                  Port Harcourt, Rivers State, Nigeria
                </p>
                <div className="mb-4 rounded-lg bg-gray-200 p-2 text-center dark:bg-gray-700">
                  <p className="text-sm">
                    Map placeholder - Port Harcourt Office
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+234 800 345 6789</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>portharcourt@n-journey.com</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="kano" className="mt-6">
              <div className="rounded-xl bg-muted p-6">
                <h3 className="mb-2 text-xl font-semibold">Kano Office</h3>
                <p className="mb-4 text-muted-foreground">
                  56 Murtala Mohammed Way
                  <br />
                  Kano, Kano State, Nigeria
                </p>
                <div className="mb-4 rounded-lg bg-gray-200 p-2 text-center dark:bg-gray-700">
                  <p className="text-sm">Map placeholder - Kano Office</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+234 800 234 5678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>kano@n-journey.com</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Find quick answers to common questions about our services
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I book a ticket with N-Journey?
              </AccordionTrigger>
              <AccordionContent>
                You can book tickets through our website, mobile app, or by
                visiting any of our terminal locations. Online booking is the
                fastest method and allows you to select your preferred seats,
                view available routes, and make secure payments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What is your cancellation policy?
              </AccordionTrigger>
              <AccordionContent>
                Tickets can be cancelled up to 24 hours before departure for a
                full refund. Cancellations made within 24 hours of departure are
                eligible for a 50% refund. In case of emergency cancellations,
                please contact our customer service for assistance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How early should I arrive before departure?
              </AccordionTrigger>
              <AccordionContent>
                We recommend arriving at least 30 minutes before your scheduled
                departure time. This allows sufficient time for check-in,
                baggage handling, and boarding. For peak travel periods
                (holidays, weekends), we suggest arriving 45-60 minutes early.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What luggage allowance do passengers have?
              </AccordionTrigger>
              <AccordionContent>
                Each passenger is allowed one large suitcase (up to 20kg) to be
                stored in the luggage compartment and one small carry-on bag.
                Additional luggage may incur extra charges. Fragile or valuable
                items should be carried with you on board.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Do you offer discounts for group bookings?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we offer special rates for group bookings of 10 or more
                passengers. Please contact our sales team at
                groups@n-journey.com or call +234 800 555 7890 for more
                information and to arrange your group travel.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
      <Footer />
    </>
  );
}
