import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-nigeria-green"
                >
                  <path d="M9 6l6 6-6 6" />
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                </svg>
              </div>
              <span className="text-xl font-bold text-nigeria-green">
                bookAM
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[220px]"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">About us</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    How to book
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Help center
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Journey</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/booking"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Booking easily
                  </Link>
                </li>
                <li>
                  <Link
                    href="/promotions"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Promotions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Contact us</h3>
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 bookAM, Inc. • Privacy • Terms</p>
        </div>
      </div>
    </footer>
  );
}
