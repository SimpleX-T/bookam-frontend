import { PDFDocument, rgb } from "pdf-lib";

export async function generatePDF(booking: any) {
  const pdfDoc = await PDFDocument.create();

  // Add a page to the PDF
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();

  // Set font sizes
  const titleFontSize = 24;
  const sectionFontSize = 18;
  const textFontSize = 12;

  // Add title
  page.drawText("bookAM E-Ticket / Boarding Pass", {
    x: 50,
    y: height - 50,
    size: titleFontSize,
    color: rgb(0, 0.53, 0.71),
  });

  // Add booking reference
  page.drawText(`Booking Reference: ${booking.bookingId}`, {
    x: 50,
    y: height - 100,
    size: textFontSize,
  });

  // Add journey details
  page.drawText("Journey Details", {
    x: 50,
    y: height - 140,
    size: sectionFontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(
    `From: ${booking.journey.from.city} (${booking.journey.from.terminal})`,
    {
      x: 50,
      y: height - 170,
      size: textFontSize,
    }
  );

  page.drawText(
    `To: ${booking.journey.to.city} (${booking.journey.to.terminal})`,
    {
      x: 50,
      y: height - 190,
      size: textFontSize,
    }
  );

  page.drawText(`Date: ${booking.journey.date}`, {
    x: 50,
    y: height - 210,
    size: textFontSize,
  });

  page.drawText(
    `Time: ${booking.journey.from.time} - ${booking.journey.to.time}`,
    {
      x: 50,
      y: height - 230,
      size: textFontSize,
    }
  );

  page.drawText(`Duration: ${booking.journey.duration}`, {
    x: 50,
    y: height - 250,
    size: textFontSize,
  });

  // Add passenger details
  page.drawText("Passenger Details", {
    x: 50,
    y: height - 290,
    size: sectionFontSize,
    color: rgb(0, 0, 0),
  });

  const passenger = booking.passengers[0];
  page.drawText(
    `Name: ${passenger.title} ${passenger.firstName} ${passenger.lastName}`,
    {
      x: 50,
      y: height - 320,
      size: textFontSize,
    }
  );

  page.drawText(`Seat: ${passenger.seat}`, {
    x: 50,
    y: height - 340,
    size: textFontSize,
  });

  page.drawText(`Ticket Number: ${passenger.ticketNumber}`, {
    x: 50,
    y: height - 360,
    size: textFontSize,
  });

  // Add important information
  page.drawText("Important Information", {
    x: 50,
    y: height - 400,
    size: sectionFontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(
    "• Please arrive at the terminal at least 30 minutes before departure.",
    {
      x: 50,
      y: height - 430,
      size: textFontSize,
    }
  );

  page.drawText(
    "• Have your booking reference and ID ready for verification.",
    {
      x: 50,
      y: height - 450,
      size: textFontSize,
    }
  );

  page.drawText(
    "• For changes or cancellations, contact customer service 24 hours before departure.",
    {
      x: 50,
      y: height - 470,
      size: textFontSize,
    }
  );

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Trigger download in the browser
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Booking_${booking.reference}.pdf`;
  link.click();
}
