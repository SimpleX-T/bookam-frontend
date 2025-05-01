"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { z } from "zod";
import { useRouter as useNextRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

// Define schemas for authentication
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Define types based on schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof signupSchema>;

// User type definition
export interface User {
  username: string;
  email: string;
  // Add other user properties as needed
}

// Define the auth context state
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Define the auth provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useNextRouter();

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.account.login(data);

      if (response.success) {
        // Extract token and user data from response
        const { token: authToken, user: userData } = response.data;

        // Save to state
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);

        // Save to localStorage
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(userData));

        // Navigate to dashboard
        router.push("/dashboard");
        
        // Show success toast
        toast.success("Login successful!");
      } else {
        const errorMessage = response.error?.message || "Login failed";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = "A network error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.account.register(data);

      if (response.success) {
        // Auto-login the user after registration
        await login({
          username: data.username,
          password: data.password,
        });

        // Navigate to a confirmation page or dashboard
        router.push("/registration-success");
        
        // Show success toast
        toast.success("Registration successful!");
      } else {
        const errorMessage = response.error?.message || "Registration failed";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = "A network error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    // Clear state
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Navigate to login page
    router.push("/login");
    
    // Show success toast
    toast.success("Logged out successfully");
  };

  // Clear error state
  const clearError = (): void => {
    setError(null);
  };

  // Create the context value
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
