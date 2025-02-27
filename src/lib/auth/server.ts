import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { headers } from "next/headers";
import { prisma } from "@/lib/database";

import socialProviders from "./socialProviders";
import { sendWelcomeMail } from "../mailer";
import { cache } from "react";

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      fullEmail: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  advanced: {
    cookiePrefix: "Pict",
  },
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendWelcomeMail(
        { to: (user as User).fullEmail, subject: "Reset your password" },
        { name: "" }
      );
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: false,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendWelcomeMail(
        { to: (user as User).fullEmail, subject: " Verify your email address" },
        { name: "" }
      );
    },
  },
  socialProviders: socialProviders,
});

type Session = typeof auth.$Infer.Session;
type User = typeof auth.$Infer.Session.user;
