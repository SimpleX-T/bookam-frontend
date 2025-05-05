"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/routes",
  "/login",
  "/signup",
  "/forgot-password",
];

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const checkAuth = () => {
      // First check if user exists
      if (!user && !PUBLIC_ROUTES.includes(pathname)) {
        router.push("/login");
        return;
      }

      // Check if current path is a public route
      const isPublicRoute = PUBLIC_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
      );

      // Handle dashboard routes
      if (pathname.startsWith("/dashboard")) {
        if (!isAuthenticated || !user) {
          router.push("/login");
          return;
        }
        if (
          user?.username !== "bookam-admin" ||
          user.email !== "admin@bookam.com"
        ) {
          router.push("/");
          return;
        }
      }
      // Handle protected routes (non-public routes)
      else if (!isPublicRoute && !isAuthenticated) {
        router.push("/login");
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router, isAuthenticated, user]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
