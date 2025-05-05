/**
 * API client for making requests to the backend
 * Uses fetch API instead of axios as per user preference
 */

import { User } from "@/contexts/auth-context";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Types based on API documentation
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
export interface CreateBookingRequest {
  userId: string;
  busId: number;
  routeId: number;
  seatNumber: number;
}

export interface UpdateBookingRequest {
  userId?: string;
  busId?: number;
  routeId?: number;
  seatNumber?: number;
}
export interface CreateBusRequest {
  busNumber: string;
  busModel: string;
  capacity: number;
  routeId: string | number;
  departureTime: string; // ISO datetime string
  arrivalTime: string; // ISO datetime string
}

export interface UpdateBusRequest {
  busNumber?: string;
  capacity?: number;
  routeId?: number;
  departureTime?: string;
  arrivalTime?: string;
}

export interface BusInRoute {
  busNumber: string;
  busModel: string;
  capacity: number;
  departureTime: string; // ISO datetime string
  arrivalTime: string; // ISO datetime string
}

export interface CreateRouteRequest {
  origin: string;
  destination: string;
  price: number;
  duration: string;
  image: string;
  description: string;
  distance: string;
  buses: BusInRoute[];
}

export interface UpdateRouteRequest {
  origin?: string;
  destination?: string;
  price?: number;
  duration?: string;
  image?: string;
  description?: string;
  distance?: string;
  buses?: BusInRoute[];
}

export interface RouteSearchParams {
  origin?: string;
  destination?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    message: string;
    code?: string;
  };
}

// Helper function to handle API responses
const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  const data = await response.json();

  if (!response.ok || data.success === false) {
    return {
      success: false,
      data: null as any,
      error: {
        message: data.error?.message || "An error occurred",
        code: data.error?.code,
      },
    };
  }

  return {
    success: true,
    data: data.data || data,
  };
};

// Create headers with authentication token if available
const createHeaders = (token?: string, contentType = true) => {
  const headers: Record<string, string> = {};

  if (contentType) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// API client with all endpoints from the documentation
export const apiClient = {
  // Account endpoints
  account: {
    login: async (
      data: LoginRequest
    ): Promise<
      ApiResponse<{
        token: string;
        email: string;
        username: string;
        userId: string;
      }>
    > => {
      const response = await fetch(`${API_BASE_URL}/account/login`, {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    },

    register: async (data: RegisterRequest): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/account/register`, {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    },

    confirmAccount: async (
      userId: string,
      token: string
    ): Promise<ApiResponse<any>> => {
      const response = await fetch(
        `${API_BASE_URL}/account/confirm?UserId=${userId}&Token=${token}`,
        {
          method: "GET",
        }
      );

      return handleResponse(response);
    },

    testEmail: async (): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/account/test-email`, {
        method: "GET",
      });

      return handleResponse(response);
    },
  },
  //booking endpoints

  booking: {
    getById: async (id: string, token: string): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/booking/get/${id}`, {
        method: "GET",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },

    getAll: async (token: string): Promise<ApiResponse<any[]>> => {
      const response = await fetch(`${API_BASE_URL}/booking/getall`, {
        method: "GET",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },

    create: async (
      data: CreateBookingRequest,
      token: string
    ): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/booking/create`, {
        method: "POST",
        headers: createHeaders(token),
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    },

    update: async (
      id: string,
      data: UpdateBookingRequest,
      token: string
    ): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/booking/update/${id}`, {
        method: "PUT",
        headers: createHeaders(token),
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    },

    // Optional: Add a delete booking function if needed
    delete: async (id: string, token: string): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/booking/delete/${id}`, {
        method: "DELETE",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },

    // Optional: Add a function to get user's bookings
    getUserBookings: async (
      user: User,
      token: string
    ): Promise<ApiResponse<any[]>> => {
      // Get all bookings first
      const response = await fetch(`${API_BASE_URL}/booking/getall`, {
        method: "GET",
        headers: createHeaders(token, false),
      });

      const result = await handleResponse<any[]>(response);

      // If successful, filter bookings by userId
      if (result.success) {
        return {
          success: true,
          data: result.data.filter((booking) => booking.user === user),
        };
      }

      return result;
    },
  },
  // Bus endpoints
  bus: {
    getById: async (id: string, token: string): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/bus/${id}`, {
        method: "GET",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },

    getAll: async (token: string): Promise<ApiResponse<any[]>> => {
      const response = await fetch(`${API_BASE_URL}/bus/getAll`, {
        method: "GET",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },

    create: async (
      data: CreateBusRequest,
      token: string
    ): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/bus/create`, {
        method: "POST",
        headers: createHeaders(token),
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    },

    update: async (
      id: string,
      data: UpdateBusRequest,
      token: string
    ): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/bus/update/${id}`, {
        method: "PUT",
        headers: createHeaders(token),
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    },

    delete: async (id: string, token: string): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/bus/delete/${id}`, {
        method: "DELETE",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },
  },

  // Route endpoints
  route: {
    getById: async (id: string, token: string): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/route/${id}`, {
        method: "GET",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },

    getAll: async (token: string): Promise<ApiResponse<any[]>> => {
      const response = await fetch(`${API_BASE_URL}/route/getall`, {
        method: "GET",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },

    create: async (
      data: CreateRouteRequest,
      token: string
    ): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/route/create`, {
        method: "POST",
        headers: createHeaders(token),
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    },

    update: async (
      id: string,
      data: UpdateRouteRequest,
      token: string
    ): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/route/update/${id}`, {
        method: "PUT",
        headers: createHeaders(token),
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    },

    delete: async (id: string, token: string): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/route/delete/${id}`, {
        method: "DELETE",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },

    search: async (
      params: RouteSearchParams,
      token: string
    ): Promise<ApiResponse<any[]>> => {
      const queryParams = new URLSearchParams();
      if (params.origin) queryParams.append("origin", params.origin);
      if (params.destination)
        queryParams.append("destination", params.destination);

      const response = await fetch(
        `${API_BASE_URL}/route/search?${queryParams}`,
        {
          method: "GET",
          headers: createHeaders(token, false),
        }
      );

      return handleResponse(response);
    },
  },

  // User endpoints
  user: {
    delete: async (token: string): Promise<ApiResponse<any>> => {
      const response = await fetch(`${API_BASE_URL}/user/delete`, {
        method: "DELETE",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },
    fetchAll: async (token: string): Promise<ApiResponse<any[]>> => {
      const response = await fetch(`${API_BASE_URL}/user/all`, {
        method: "GET",
        headers: createHeaders(token, false),
      });

      return handleResponse(response);
    },
  },
};
