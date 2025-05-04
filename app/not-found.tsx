import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center text-center">
      <div>
        <h3 className="text-4xl text-center font-bold text-red-400">OOPS!</h3>
        <p className="text-lg text-white">
          Seems like the page you're looking for does not exist.
        </p>
        <Link href="/" className="text-primary hover:underline">
          Let us take you back
        </Link>
      </div>
    </main>
  );
}
