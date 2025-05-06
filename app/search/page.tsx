"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import SimplifiedSearch from "@/components/simplified-search";
import { Filter } from "lucide-react";
import { capitalizeText, cn } from "@/lib/utils";
import { motion } from "motion/react";
import { format } from "date-fns";
import { DateInfo, AppliedFilters, Route } from "@/types";
import { generateDates } from "@/lib/helpers";
import SearchPagination from "@/components/search/pagination";
import { useApp } from "@/contexts/app-context";
import BusCard from "@/components/search/bus-card";
import EmptyState from "@/components/search/states/empty";
import { Spinner } from "@/components/ui/spinner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const [searchDate, setSearchDate] = useState<Date | undefined>(undefined); // Date from URL param
  const [passengers, setPassengers] = useState<string>("1");

  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([
    0, 60000,
  ]);
  const [selectedStopsFilter, setSelectedStopsFilter] = useState<number[]>([]);
  const [selectedSort, setSelectedSort] = useState<"lowest" | "highest" | null>(
    null
  );

  // Applied filters state (used for actual filtering)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    price: [0, 60000],
    stops: [],
    sortBy: null,
  });

  // UI state
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start loading
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [displayDates, setDisplayDates] = useState<DateInfo[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [currentRoute, setCurrentRoute] = useState<Route | undefined>(
    undefined
  );
  const { routes } = useApp();

  const fromRoute = searchParams.get("from");
  const toRoute = searchParams.get("to");
  useEffect(() => {
    const init = async () => {
      if (!fromRoute || !toRoute) return setCurrentRoute(undefined);

      const cRoute: Route | undefined = routes.find(
        (route) =>
          route.origin.toLowerCase() === fromRoute.toLowerCase() &&
          route.destination.toLowerCase() === toRoute.toLowerCase()
      );

      setCurrentRoute(cRoute);
    };

    init();
  }, [searchParams]);
  // --- Effects ---
  // Effect to parse URL search params
  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const dateParam = searchParams.get("date");
    const passengersParam = searchParams.get("passengers");

    setFromCity(from || ""); // Default to empty if not present
    setToCity(to || "");
    setPassengers(passengersParam || "1");

    if (dateParam) {
      try {
        const parsedDate = new Date(dateParam);
        // Basic validation: Check if it's a valid date
        if (!isNaN(parsedDate.getTime())) {
          setSearchDate(parsedDate);
          setShowDateSelector(false); // Hide date selector if URL has date
        } else {
          console.error("Invalid date format in URL:", dateParam);
          setSearchDate(undefined);
          setShowDateSelector(true); // Show selector if URL date is invalid
        }
      } catch (e) {
        console.error("Error parsing date:", e);
        setSearchDate(undefined);
        setShowDateSelector(true); // Show selector on error
      }
    } else {
      setSearchDate(undefined);
      setShowDateSelector(true);
    }
  }, [searchParams]);

  // Effect to generate dates for the horizontal selector if needed
  useEffect(() => {
    if (showDateSelector) {
      const today = new Date();
      setDisplayDates(generateDates(today, 5)); // Generate 5 dates from today
    } else {
      setDisplayDates([]); // Clear dates if selector is hidden
    }
  }, [showDateSelector]);

  // --- Filtering Logic ---
  const filteredAndSortedRoutes = useMemo(() => {
    let filteredRoutes = routes.filter((route) => {
      // Match origin and destination (case-insensitive)
      const originMatch =
        !fromCity || route.origin.toLowerCase() === fromCity.toLowerCase();
      const destinationMatch =
        !toCity || route.destination.toLowerCase() === toCity.toLowerCase();

      // Match Price Range
      const priceMatch =
        route.price >= appliedFilters.price[0] &&
        route.price <= appliedFilters.price[1];

      return originMatch && destinationMatch && priceMatch;
    });

    // Apply Sorting
    if (appliedFilters.sortBy === "lowest") {
      filteredRoutes.sort((a, b) => a.price - b.price);
    } else if (appliedFilters.sortBy === "highest") {
      filteredRoutes.sort((a, b) => b.price - a.price);
    }
    // else no sort or default sort (by ID or original order)

    setIsLoading(false); // Filtering done, set loading to false
    return filteredRoutes;
  }, [fromCity, toCity, appliedFilters]); // Re-run when cities or applied filters change

  // --- Event Handlers ---
  const handleStopsChange = (stopValue: number) => {
    setSelectedStopsFilter((prev) =>
      prev.includes(stopValue)
        ? prev.filter((item) => item !== stopValue)
        : [...prev, stopValue]
    );
  };

  const handleSortChange = (sortType: "lowest" | "highest") => {
    // Allow only one sort option to be selected
    setSelectedSort((prev) => (prev === sortType ? null : sortType));
  };

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters({
      price: selectedPriceRange,
      stops: selectedStopsFilter,
      sortBy: selectedSort,
    });
    setIsLoading(true); // Set loading true while filtering happens
    // The useMemo hook [filteredAndSortedRoutes] will re-run automatically
    // because its dependency 'appliedFilters' changes.
    // No need to call setIsLoading(false) here, useMemo handles it.

    // Close filter sidebar on mobile after applying
    if (window.innerWidth < 768) {
      // md breakpoint
      setShowFilters(false);
    }
  }, [selectedPriceRange, selectedStopsFilter, selectedSort]);

  const handleResetFilters = useCallback(() => {
    // Reset temporary selections
    setSelectedPriceRange([0, 60000]);
    setSelectedStopsFilter([]);
    setSelectedSort(null);
    // Reset applied filters to defaults
    setAppliedFilters({
      price: [0, 60000],
      stops: [],
      sortBy: null,
    });
    setIsLoading(true); // Set loading true while filtering resets
  }, []);

  const handleRouteSelect = (routeId: string, busId: string) => {
    // Construct the date string for the URL if available
    // Use the date from the URL param first, then fallback to the selected date in the horizontal scroller
    let dateQueryParam = "";
    const selectedDate =
      searchDate ?? displayDates[selectedDateIndex]?.fullDate;

    if (selectedDate) {
      // Format date as YYYY-MM-DD for consistency in URL params
      dateQueryParam = `&date=${format(selectedDate, "yyyy-MM-dd")}`;
    }

    router.push(
      `/booking/steps/seat-selection?rId=${routeId}&bId=${busId}&passengers=${passengers}${dateQueryParam}&from=${fromCity}&to=${toCity}`
    );
  };

  // --- Render ---
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-100 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <div className="bg-background dark:bg-gray-900 rounded-lg p-4 shadow-md">
              <SimplifiedSearch />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
            <aside className="space-y-6">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-between md:hidden mb-4 dark:text-white dark:border-gray-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>Show Filters</span>
                <Filter className="h-4 w-4" />
              </Button>

              {/* Filter Controls (conditionally rendered) */}
              <div
                className={cn(
                  "space-y-6 transition-all duration-300 ease-in-out",
                  showFilters
                    ? "block max-h-[2000px] opacity-100"
                    : "hidden max-h-0 opacity-0 md:block md:max-h-none md:opacity-100", // Smooth transition
                  "md:block" // Always block on medium screens and up
                )}
              >
                {/* Apply Filters Button */}
                <Button
                  onClick={handleApplyFilters}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Apply Filters
                </Button>

                {/* Sort By */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold dark:text-white">
                        Sort by
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs dark:text-gray-400 hover:dark:text-white"
                        onClick={handleResetFilters}
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="sort-lowest"
                          className="text-sm dark:text-gray-300 cursor-pointer"
                        >
                          Lowest price
                        </label>
                        <Checkbox
                          id="sort-lowest"
                          checked={selectedSort === "lowest"}
                          onCheckedChange={() => handleSortChange("lowest")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="sort-highest"
                          className="text-sm dark:text-gray-300 cursor-pointer"
                        >
                          Highest price
                        </label>
                        <Checkbox
                          id="sort-highest"
                          checked={selectedSort === "highest"}
                          onCheckedChange={() => handleSortChange("highest")}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Price Filter */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold dark:text-white">
                        Price Range
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs dark:text-gray-400 hover:dark:text-white"
                        onClick={handleResetFilters}
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="py-2">
                      <Slider
                        min={0}
                        max={60000}
                        step={1000}
                        value={selectedPriceRange}
                        onValueChange={setSelectedPriceRange}
                        className="[&>span:first-child]:h-1 [&>span:first-child>span]:bg-primary" // Style slider track/thumb
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>₦{selectedPriceRange[0].toLocaleString()}</span>
                        <span>₦{selectedPriceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stops Filter */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold dark:text-white">
                        Stops
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs dark:text-gray-400 hover:dark:text-white"
                        onClick={handleResetFilters}
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="stops-direct"
                          className="text-sm dark:text-gray-300 cursor-pointer"
                        >
                          Direct
                        </label>
                        <Checkbox
                          id="stops-direct"
                          checked={selectedStopsFilter.includes(0)}
                          onCheckedChange={() => handleStopsChange(0)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="stops-1"
                          className="text-sm dark:text-gray-300 cursor-pointer"
                        >
                          1 Stop
                        </label>
                        <Checkbox
                          id="stops-1"
                          checked={selectedStopsFilter.includes(1)}
                          onCheckedChange={() => handleStopsChange(1)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="stops-2"
                          className="text-sm dark:text-gray-300 cursor-pointer"
                        >
                          2+ Stops
                        </label>
                        <Checkbox
                          id="stops-2"
                          checked={selectedStopsFilter.includes(2)}
                          onCheckedChange={() => handleStopsChange(2)} // Assuming '2' represents 2 or more stops in data/filter logic
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Removed Transit Point Filter as data doesn't support it well */}
              </div>
            </aside>

            <Suspense fallback={<Spinner size="md" />}>
              <section className="space-y-6">
                {showDateSelector && displayDates.length > 0 && (
                  <div className="bg-background dark:bg-gray-900 rounded-lg p-3 shadow-sm overflow-x-auto">
                    <div className="flex space-x-2 min-w-max">
                      {displayDates.map((dateItem, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-lg min-w-[90px] transition-colors duration-200 border border-transparent",
                            selectedDateIndex === index
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          )}
                          onClick={() => setSelectedDateIndex(index)}
                        >
                          <div className="text-sm font-medium">
                            {dateItem.day}, {dateItem.date}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results Header */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    Showing journeys{" "}
                    {fromCity && toCity
                      ? `from ${capitalizeText(fromCity)} to ${capitalizeText(
                          toCity
                        )}`
                      : "for selected criteria"}
                  </span>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                    <Spinner size="md" className="mb-4" />
                    <span>Loading available buses...</span>
                  </div>
                )}

                {/* Empty State */}
                {!isLoading &&
                  currentRoute &&
                  currentRoute?.buses.length <= 0 && (
                    <EmptyState onclick={handleResetFilters} title="buses" />
                  )}

                {/* Bus Route Results */}
                {!isLoading &&
                  currentRoute &&
                  currentRoute?.buses.length > 0 && (
                    <div className="space-y-4">
                      {currentRoute.buses.map((bus, index) => (
                        <BusCard
                          key={bus.busId}
                          bus={bus}
                          route={currentRoute}
                          onclick={handleRouteSelect}
                          index={index}
                        />
                      ))}
                    </div>
                  )}

                {/* Pagination (Placeholder/Example) */}
                {!isLoading && filteredAndSortedRoutes.length > 0 && (
                  <SearchPagination />
                )}
              </section>
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
