"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useApp } from "@/contexts/app-context";
import { useLoginMutation, useRegisterMutation } from "@/hooks/use-api-queries";
import { motion } from "motion/react"; // Using motion/react instead of framer-motion
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ExamplePage() {
  const { user, isAuthenticated, logout, error: authError } = useAuth();
  const { buses, busesLoading, fetchBuses, busError } = useApp();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Use the React Query mutations
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ username, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleFetchBuses = async () => {
    try {
      await fetchBuses();
    } catch (error) {
      console.error("Failed to fetch buses:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        BookAM Example Page
      </motion.h1>

      {!isAuthenticated ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to access the bus booking system</CardDescription>
            </CardHeader>
            <CardContent>
              {(authError || loginMutation.error) && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>
                    {authError || "Login failed. Please try again."}
                  </AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loginMutation.isPending}
                  className="w-full"
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {user?.username}!</CardTitle>
                <CardDescription>You are logged in to the BookAM system</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">You now have access to the bus booking features.</p>
                <div className="flex gap-4">
                  <Button onClick={logout} variant="destructive">
                    Logout
                  </Button>
                  <Button onClick={handleFetchBuses} variant="outline">
                    {busesLoading ? "Loading buses..." : "Fetch Buses"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Available Buses</CardTitle>
                <CardDescription>List of all available buses in the system</CardDescription>
              </CardHeader>
              <CardContent>
                {busError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{busError}</AlertDescription>
                  </Alert>
                )}
                {busesLoading ? (
                  <p>Loading buses...</p>
                ) : buses.length > 0 ? (
                  <ul className="divide-y">
                    {buses.map((bus) => (
                      <li key={bus.busId} className="py-3">
                        <p className="font-medium">{bus.busNumber}</p>
                        <p className="text-gray-600">Capacity: {bus.capacity}</p>
                        <div className="text-sm mt-1">
                          <span className="text-gray-500">Departure: </span>
                          {new Date(bus.departureTime).toLocaleString()}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Arrival: </span>
                          {new Date(bus.arrivalTime).toLocaleString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No buses available.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
