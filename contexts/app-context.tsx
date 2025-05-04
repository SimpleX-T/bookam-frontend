"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./auth-context";
import { Bus, Route, RouteSearchParams } from "@/types";
import {
  useBuses,
  useBusById,
  useCreateBusMutation,
  useUpdateBusMutation,
  useDeleteBusMutation,
  useRoutes,
  useRouteById,
  useSearchRoutes,
  useCreateRouteMutation,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
} from "@/hooks/use-api-queries";
import {
  CreateBusRequest,
  CreateRouteRequest,
  UpdateBusRequest,
  UpdateRouteRequest,
} from "@/lib/api-client";

// Define the app context state
interface AppContextType {
  // Bus state and operations
  buses: Bus[];
  selectedBus: Bus | null;
  busesLoading: boolean;
  busError: string | null;
  fetchBuses: () => Promise<void>;
  fetchBusById: (id: string) => Promise<void>;
  createBus: (bus: CreateBusRequest) => Promise<void>;
  updateBus: (id: string, bus: UpdateBusRequest) => Promise<void>;
  deleteBus: (id: string) => Promise<void>;

  // Route state and operations
  routes: Route[];
  selectedRoute: Route | null;
  routesLoading: boolean;
  routeError: string | null;
  fetchRoutes: () => Promise<void>;
  fetchRouteById: (id: string) => Promise<void>;
  searchRoutes: (params: RouteSearchParams) => Promise<void>;
  createRoute: (route: CreateRouteRequest) => Promise<void>;
  updateRoute: (id: string, route: UpdateRouteRequest) => Promise<void>;
  deleteRoute: (id: string) => Promise<void>;

  // Common operations
  clearErrors: () => void;
}

// Create the app context
const AppContext = createContext<AppContextType | undefined>(undefined);

// App provider props
interface AppProviderProps {
  children: ReactNode;
}

// Define the app provider
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Get auth context
  const { isAuthenticated } = useAuth();

  // Bus state
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [busError, setBusError] = useState<string | null>(null);

  // Route state
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);

  // React Query hooks
  const busesQuery = useBuses();
  const routesQuery = useRoutes();
  const createBusMutation = useCreateBusMutation();
  const updateBusMutation = useUpdateBusMutation(
    selectedBus?.busId ? selectedBus.busId : ""
  );
  const deleteBusMutation = useDeleteBusMutation();
  const createRouteMutation = useCreateRouteMutation();
  const updateRouteMutation = useUpdateRouteMutation(
    selectedRoute?.routeId ? selectedRoute.routeId : ""
  );
  const deleteRouteMutation = useDeleteRouteMutation();

  // Clear errors
  const clearErrors = (): void => {
    setBusError(null);
    setRouteError(null);
  };

  // Bus operations
  const fetchBuses = async (): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      await busesQuery.refetch();
    } catch (err: any) {
      setBusError(err.message || "Failed to fetch buses");
      console.error("Fetch buses error:", err);
    }
  };

  const fetchBusById = async (id: string): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const busQuery = useBusById(id);
      const result = await busQuery.refetch();
      if (result.data) {
        setSelectedBus(result.data);
      }
    } catch (err: any) {
      setBusError(err.message || "Failed to fetch bus");
      console.error("Fetch bus by ID error:", err);
    }
  };

  const createBus = async (bus: CreateBusRequest): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const result = await createBusMutation.mutateAsync(bus);
      if (!result.success) {
        setBusError(result.error?.message || "Failed to create bus");
      }
    } catch (err: any) {
      setBusError(err.message || "Failed to create bus");
      console.error("Create bus error:", err);
    }
  };

  const updateBus = async (
    id: string,
    bus: UpdateBusRequest
  ): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const result = await updateBusMutation.mutateAsync(bus);
      if (!result.success) {
        setBusError(result.error?.message || "Failed to update bus");
      }
    } catch (err: any) {
      setBusError(err.message || "Failed to update bus");
      console.error("Update bus error:", err);
    }
  };

  const deleteBus = async (id: string): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const result = await deleteBusMutation.mutateAsync(id);
      if (!result.success) {
        setBusError(result.error?.message || "Failed to delete bus");
      } else {
        // If the deleted bus was selected, clear the selection
        if (selectedBus?.busId === id) {
          setSelectedBus(null);
        }
      }
    } catch (err: any) {
      setBusError(err.message || "Failed to delete bus");
      console.error("Delete bus error:", err);
    }
  };

  // Route operations
  const fetchRoutes = async (): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      await routesQuery.refetch();
    } catch (err: any) {
      setRouteError(err.message || "Failed to fetch routes");
      console.error("Fetch routes error:", err);
    }
  };

  const fetchRouteById = async (id: string): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const routeQuery = useRouteById(id);
      const result = await routeQuery.refetch();
      if (result.data) {
        setSelectedRoute(result.data);
      }
    } catch (err: any) {
      setRouteError(err.message || "Failed to fetch route");
      console.error("Fetch route by ID error:", err);
    }
  };

  const searchRoutes = async (params: RouteSearchParams): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const searchQuery = useSearchRoutes(params);
      await searchQuery.refetch();
    } catch (err: any) {
      setRouteError(err.message || "Failed to search routes");
      console.error("Search routes error:", err);
    }
  };

  const createRoute = async (route: CreateRouteRequest): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const result = await createRouteMutation.mutateAsync(route);
      if (!result.success) {
        setRouteError(result.error?.message || "Failed to create route");
      }
    } catch (err: any) {
      setRouteError(err.message || "Failed to create route");
      console.error("Create route error:", err);
    }
  };

  const updateRoute = async (
    routeid: string,
    route: UpdateRouteRequest
  ): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const result = await updateRouteMutation.mutateAsync(route);
      if (!result.success) {
        setRouteError(result.error?.message || "Failed to update route");
      }
    } catch (err: any) {
      setRouteError(err.message || "Failed to update route");
      console.error("Update route error:", err);
    }
  };

  const deleteRoute = async (id: string): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const result = await deleteRouteMutation.mutateAsync(id);
      if (!result.success) {
        setRouteError(result.error?.message || "Failed to delete route");
      } else {
        // If the deleted route was selected, clear the selection
        if (selectedRoute?.routeId === id) {
          setSelectedRoute(null);
        }
      }
    } catch (err: any) {
      setRouteError(err.message || "Failed to delete route");
      console.error("Delete route error:", err);
    }
  };

  const contextValue: AppContextType = {
    // Bus state and operations
    buses: busesQuery.data || [],
    selectedBus,
    busesLoading: busesQuery.isLoading,
    busError,
    fetchBuses,
    fetchBusById,
    createBus,
    updateBus,
    deleteBus,

    // Route state and operations
    routes: routesQuery.data || [],
    selectedRoute,
    routesLoading: routesQuery.isLoading,
    routeError,
    fetchRoutes,
    fetchRouteById,
    searchRoutes,
    createRoute,
    updateRoute,
    deleteRoute,

    // Common operations
    clearErrors,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
};
