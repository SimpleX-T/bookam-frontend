import type React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { ToastProvider } from "@/components/toast-provider";
import { ProtectedRoute } from "@/components/protected-route";

// const inter = Inter({ subsets: ["latin"] });
const bricolage_grotesque = Bricolage_Grotesque({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
  title: "bookam | Enugu State Transport Management System",
  description: "Book bus tickets across Nigeria with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${bricolage_grotesque.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Providers>
              <ProtectedRoute>
                <ToastProvider />
                <div className="min-h-screen flex flex-col">
                  {/* <Header /> */}
                  {children}
                  {/* <Footer /> */}
                </div>
              </ProtectedRoute>
            </Providers>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
