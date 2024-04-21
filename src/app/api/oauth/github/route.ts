import { github, lucia } from "@/lib/lucia";
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

    const savedState = cookies().get("state")?.value;

    cookies().set("state", "", {
      expires: new Date(0),
    });

    if (!savedState) {
      return Response.json(
        { error: "saved state is not exists" },
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

    const { accessToken } = await github.validateAuthorizationCode(code);

    const githubEamil = await (
      await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      })
    ).json();

    const githubDetails = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      })
    ).json();

    const githubData: OAuthUser = {
      id: githubDetails.id.toString(),
      email: githubEamil[0].email,
      verified_email: githubEamil[0].verified,
      given_name: githubDetails.login,
      locale: githubDetails.location,
      name: githubDetails.name,
      picture: githubDetails.avatar_url,
    };
    const githubTokens: OAuthTokens = {
      accessToken,
      accessTokenExpiresAt: null,
      refreshToken: null,
      idToken: null,
    };

    const result = await addAccount("Github", githubData, githubTokens);

    if (result.success) {
      const session = await lucia.createSession(githubData.id, {
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
