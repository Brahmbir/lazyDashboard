import z from "zod";

// Form schemas for login page
export const SignInSchema = z.object({
  email: z.string().email({ message: "Invaild email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

// Form schemas for signup page

export const SignUpSchema = z
  .object({
    email: z.string().email({ message: "Invaild email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Form schemas for password reset require page
export const PasswordResetRequireSchema = z.object({
  email: z.string().email({ message: "Invaild email" }),
});

// Form schemas for reset page
export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
