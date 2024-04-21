// src/auth.ts
import { cookies } from "next/headers";
import { cache } from "react";
import { Lucia, TimeSpan } from "lucia";
import { Role } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import client from "@/lib/db";
// import HttpAdapter from "./httpAdapter";

const adapter = new PrismaAdapter(client.session, client.user); // your adapter
// const adapter = new HttpAdapter(); // your adapter

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "d"),
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  // getSessionAttributes: (attributes) => {
  // return {
  // ipCountry: attributes,
  // };
  // },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      fullName: attributes.name,
      avatarUrl: attributes.PictureUrl,
      role: attributes.role,
      email: attributes.email,
    };
  },
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId)
    return {
      user: null,
      session: null,
    };
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return { user, session };
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  name: string;
  PictureUrl: String;
  role: Role;
}
