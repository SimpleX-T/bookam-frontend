"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useApp } from "@/contexts/app-context";
import { motion } from "motion/react"; // Using motion/react instead of framer-motion

const ExamplePage: React.FC = () => {
  const { user, isAuthenticated, login, logout, error: authError } = useAuth();
  const { buses, busesLoading, fetchBuses, busError } = useApp();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
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
    <div className="container mx-auto p-6">
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Example Page
      </motion.h1>

      {!isAuthenticated ? (
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          {authError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {authError}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <motion.button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.username}!</h2>
          <p className="mb-4">You are logged in.</p>
          <motion.button
            onClick={logout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mr-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
          <motion.button
            onClick={handleFetchBuses}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fetch Buses
          </motion.button>
        </motion.div>
      )}

      {isAuthenticated && (
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">Buses</h2>
          {busError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {busError}
            </div>
          )}
          {busesLoading ? (
            <p>Loading buses...</p>
          ) : buses.length > 0 ? (
            <ul className="divide-y">
              {buses.map((bus) => (
                <li key={bus.busId} className="py-3">
                  <p className="font-medium">{bus.name}</p>
                  <p className="text-gray-600">Capacity: {bus.capacity}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No buses available.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ExamplePage;
