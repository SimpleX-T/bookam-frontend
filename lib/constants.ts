import { Bus, MapPin, CalendarIcon, Star } from "lucide-react";

export const promotions = [
  {
    id: 1,
    title: "Weekend Special",
    description: "20% off on all weekend journeys",
    code: "WEEKEND20",
    validUntil: "June 30, 2025",
  },
  {
    id: 2,
    title: "Family Package",
    description: "Book for 4 or more and get 15% discount",
    code: "FAMILY15",
    validUntil: "July 15, 2025",
  },
  {
    id: 3,
    title: "Early Bird",
    description: "Book 7 days in advance and save 10%",
    code: "EARLY10",
    validUntil: "Ongoing",
  },
];

export const features = [
  {
    title: "Centralized Terminal Management",
    description:
      "Easily manage buses, routes, and schedules from a single dashboard tailored for terminal operators and government oversight.",
    icon: Bus,
    delay: 0.1,
  },
  {
    title: "Seamless Online Booking",
    description:
      "Users can book tickets remotely, avoiding long queues and ensuring a smooth, digital-first experience.",
    icon: CalendarIcon,
    delay: 0.2,
  },
  {
    title: "Real-Time Data & Monitoring",
    description:
      "Track passenger flow, bus locations, and terminal activity in real time for improved decision-making and safety.",
    icon: MapPin,
    delay: 0.3,
  },
  {
    title: "Paperless & Scalable Operations",
    description:
      "Eliminate clutter with digital tickets, receipts, and records—making your terminals future-ready and scalable.",
    icon: Star,
    delay: 0.4,
  },
];
