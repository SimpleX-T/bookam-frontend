# BookAM Frontend Developer Guide

## Project Overview

BookAM is a Nigerian bus transport booking system built with Next.js. This guide provides information about the current implementation, architecture, and how to work with the codebase.

## Recent Updates

We've implemented a comprehensive authentication and data management system using React Context API and TanStack React Query. The implementation follows modern best practices and is designed to be easy to use and extend.

## Project Structure

### Core Components

- **Authentication System**: Implemented in [contexts/auth-context.tsx](cci:7://file:///home/devtochukwu/Documents/C.O.D.E/bookam-frontend/contexts/auth-context.tsx:0:0-0:0)
- **Application State**: Implemented in `contexts/app-context.tsx`
- **API Client**: Implemented in `lib/api-client.ts`
- **React Query Hooks**: Implemented in `hooks/use-api-queries.ts`
- **Context Providers**: Set up in `components/providers.tsx`
- **Example Page**: Available at `app/example/page.tsx`

### Key Files and Their Purposes

| File                                                                                                                              | Purpose                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [contexts/auth-context.tsx](cci:7://file:///home/devtochukwu/Documents/C.O.D.E/bookam-frontend/contexts/auth-context.tsx:0:0-0:0) | Authentication context provider with login, register, and logout functionality |
| `contexts/app-context.tsx`                                                                                                        | Application context for bus and route management                               |
| `lib/api-client.ts`                                                                                                               | API client using fetch (not axios) for all backend requests                    |
| `hooks/use-api-queries.ts`                                                                                                        | React Query hooks for data fetching and mutations                              |
| `components/providers.tsx`                                                                                                        | Component that wraps the app with all necessary context providers              |
| `components/query-provider.tsx`                                                                                                   | React Query provider setup                                                     |
| `app/layout.tsx`                                                                                                                  | Root layout with all providers properly nested                                 |
| `app/example/page.tsx`                                                                                                            | Example page demonstrating how to use the contexts and hooks                   |

## How to Use the Implemented Features

### Authentication

Use the [useAuth](cci:1://file:///home/devtochukwu/Documents/C.O.D.E/bookam-frontend/contexts/auth-context.tsx:180:0-189:2) hook to access authentication functionality:

```tsx
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const { user, isAuthenticated, login, logout, error } = useAuth();

  // Example login
  const handleLogin = async (username, password) => {
    await login({ username, password });
  };
}
```
