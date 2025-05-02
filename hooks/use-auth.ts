import * as z from "zod";
import { useAuth as useAuthContext, LoginFormData, RegisterFormData } from "../contexts/auth-context";

// This hook is a wrapper around the main auth context
// It provides the same validation schemas as before but uses the main auth context for functionality
export const useAuth = () => {
  // Get the main auth context
  const authContext = useAuthContext();
  
  // Define validation schemas
  const loginSchema = z.object({
    username: z.string({ message: "Please enter a valid username" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    rememberMe: z.boolean().optional(),
  });

  const signupSchema = z
    .object({
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" }),
      email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        })
        .regex(/[^A-Za-z0-9]/, {
          message: "Password must contain at least one special character",
        }),
      confirmPassword: z.string(),
      terms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type LoginFormValues = z.infer<typeof loginSchema>;
  type SignupFormValues = z.infer<typeof signupSchema>;

  // Login function that adapts the form values to the auth context
  const login = async (data: LoginFormValues): Promise<void> => {
    if (!data.username || !data.password) {
      throw new Error("Username and password are required");
    }

    try {
      // Call the main auth context login function with the correct type
      const loginData: LoginFormData = {
        username: data.username,
        password: data.password,
      };
      
      await authContext.login(loginData);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Signup function that adapts the form values to the auth context
  const signup = async (data: SignupFormValues): Promise<void> => {
    try {
      // Call the main auth context register function with the correct type
      const registerData: RegisterFormData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      
      await authContext.register(registerData);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  return {
    // Return the validation schemas
    loginSchema,
    signupSchema,
    
    // Return the login and signup functions
    login,
    signup,
    
    // Also expose the main auth context properties
    ...authContext
  };
};

// Export the types separately
export type LoginFormValues = z.infer<
  ReturnType<typeof useAuth>["loginSchema"]
>;
export type SignupFormValues = z.infer<
  ReturnType<typeof useAuth>["signupSchema"]
>;
