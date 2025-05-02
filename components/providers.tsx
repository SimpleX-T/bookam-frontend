"use client";

import React, { ReactNode } from "react";
import { AuthProvider } from "@/contexts/auth-context";
import { AppProvider } from "@/contexts/app-context";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Providers component that wraps the application with all necessary context providers
 * The order matters - AppProvider depends on AuthProvider, so AuthProvider must be the outer wrapper
 * 
 * Note: This component doesn't include QueryProvider since that's handled at the root layout level
 */
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </AuthProvider>
  );
};

export default Providers;
