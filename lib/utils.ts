import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Function to generate JWT token
export function generateJWT(payload: any, expiresIn = 7) {
  const secret: Secret = process.env.JWT_SECRET || "your-secret-key";
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
}

// Function to verify JWT token
export async function verifyJWT(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
  } catch (error) {
    return null;
  }
}

// Function to handle API errors
export function handleApiError(error: any) {
  console.error("API Error:", error);

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      message: error.response.data.error || "An error occurred",
      status: error.response.status,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: "No response from server. Please check your connection.",
      status: 500,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message || "An unknown error occurred",
      status: 500,
    };
  }
}
