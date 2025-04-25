// This is a mock API service for bookings
// In a real application, this would make actual API calls

export async function fetchBookingDetails(bookingId: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return dummy data
  return {
    id: bookingId,
    reference: "NJ-" + Math.floor(10000000 + Math.random() * 90000000),
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "card",
    totalAmount: 14850,
    journey: {
      id: "j-" + Math.floor(1000 + Math.random() * 9000),
      company: "Cloudy Transit",
      logo: "CT",
      from: {
        city: "Lagos",
        terminal: "Jibowu Terminal, Lagos",
        time: "23:15",
      },
      to: {
        city: "Abuja",
        terminal: "Utako Terminal, Abuja",
        time: "07:25",
      },
      duration: "8h 10m",
      journeyNumber: "CT-6018",
      class: "Economy",
      date: "May 16, 2025",
      luggage: "2 x 23 kg",
      handLuggage: "1 x 7 kg",
      bus: {
        type: "Luxury Coach",
        seating: "3-2 seat layout",
        features: "29 inches Seat pitch (standard)",
      },
      stops: [
        {
          city: "Ibadan",
          terminal: "Challenge Terminal, Ibadan",
          arrivalTime: "01:25",
          departureTime: "01:45",
          duration: "20 min",
        },
      ],
    },
    passengers: [
      {
        id: "p1",
        title: "Mr",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+234 800 123 4567",
        seat: "5A",
        ticketNumber: "NJ-TKT-" + Math.floor(10000 + Math.random() * 90000),
      },
    ],
    checkIn: {
      date: "16th May 2025",
      time: "21:20",
      status: "available",
    },
  };
}
