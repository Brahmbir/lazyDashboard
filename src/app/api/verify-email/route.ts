import { NextResponse, NextRequest } from "next/server";
import Jwt from "jsonwebtoken";
import { findEmailVerifyRecord } from "@/queries/emailVerification";
import { verifyUserEmail } from "@/queries/user";
import { lucia } from "@/lib/lucia/auth";
import { cookies } from "next/headers";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function GET(request: NextRequest) {
  let token = request.nextUrl.searchParams.get("token");

  if (token) {
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as {
        token: string;
        userId: string;
      };

      const emailToken = await findEmailVerifyRecord(decoded.userId);

      if (!emailToken) {
        return NextResponse.json({ error: "token does not exist" });
      }

      await verifyUserEmail(emailToken.userId);

      const session = await lucia.createSession(emailToken.userId, {});

      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl.origin)
      );
    } catch (error) {
      return NextResponse.json({ error: "token expired" });
    }
  }
  return NextResponse.json({ error: "token is undefined" });
}
