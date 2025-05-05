"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const BookingTimeline: React.FC = () => {
  const currentPathname = usePathname();
  let currentStep = 0;
  if (
    currentPathname.includes("/steps/seat-selection") ||
    currentPathname.includes("/seat-selection")
  ) {
    currentStep = 0;
  } else if (
    currentPathname.includes("/steps/passenger") ||
    currentPathname.includes("/passenger-details")
  ) {
    currentStep = 1;
  } else if (
    currentPathname.includes("/steps/payment") ||
    currentPathname.includes("/payment")
  ) {
    currentStep = 2;
  }

  // Define the steps
  const steps = [
    { id: 1, label: "Seat Selection", path: "/seat-selection" },
    { id: 2, label: "Passenger Details", path: "/passenger-details" },
    { id: 3, label: "Payment", path: "/payment" },
  ];

  return (
    <div className="scrollbar-none overflow-scroll w-full md:w-3/5">
      <div className=" flex items-center justify-between py-5 mx-0 my-8 h-auto md:flex-row md:px-14">
        {steps.map((status, key) => {
          return (
            <div
              key={key}
              className={cn("flex  items-center flex-row", {
                "flex-grow": steps.length - 1 !== key,
              })}
            >
              <span
                className={cn(
                  "relative size-10 rounded-full border-2 grid place-content-center",
                  {
                    "border-green-300 bg-green-500": key <= currentStep,
                    "border-gray-300": key > currentStep,
                  }
                )}
              >
                <span>{key + 1}</span>
                <span className="absolute -left-10 bottom-[20px] -translate-x-1/2 text-sm capitalize md:-bottom-12 md:left-1/2 text-center w-200px">
                  {status.label}
                </span>
              </span>
              {key < steps.length - 1 && (
                <span
                  className={cn(
                    "w-[3px] flex-1 bg-gray-300 md:h-[2px] md:w-auto",
                    {
                      "bg-green-500": key < currentStep,
                    }
                  )}
                ></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingTimeline;
