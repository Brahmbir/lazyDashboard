import { lucia } from "@/lib/lucia";
import { google } from "@/lib/lucia/";
import { OAuthTokens, OAuthUser, addAccount } from "@/queries/account";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      return Response.json(
        { error: "Invalid request" },
        {
          status: 400,
        }
      );
    }

    const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;

    cookies().set("state", "", {
      expires: new Date(0),
    });
    cookies().set("codeVerifier", "", {
      expires: new Date(0),
    });

    if (!codeVerifier || !savedState) {
      return Response.json(
        { error: "Code verifier or saved state is not exists" },
        {
          status: 400,
        }
      );
    }

    if (savedState !== state) {
      return Response.json(
        {
          error: "State does not match",
        },
        {
          status: 400,
        }
      );
    }

    const googleTokens = (await google.validateAuthorizationCode(
      code,
      codeVerifier
    )) as OAuthTokens;

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${googleTokens.accessToken}`,
        },
        method: "GET",
      }
    );

    const googleData = (await googleRes.json()) as OAuthUser;

    const result = await addAccount("Google", googleData, googleTokens);
    console.log(result);

    if (result.success) {
      const session = await lucia.createSession(googleData.id, {
        //   expiresIn: 60 * 60 * 24 * 30,
      });
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    } else if (!result.success && result.provider) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}/login?error=OAuthAccountNotLinked&provider=${result.provider}`,
        { status: 302 }
      );
    }

    return NextResponse.redirect(
      `${request.nextUrl.origin}${DEFAULT_LOGIN_REDIRECT}`,
      { status: 302 }
    );
  } catch (error: any) {
    return Response.json(
      { ...error },
      {
        status: 500,
      }
    );
  }
};
