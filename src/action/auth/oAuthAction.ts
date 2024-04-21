"use server";
import { google, github } from "@/lib/lucia";
import { IAuthAction } from "@/types/authActionType";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export const createGoogleAuthorizationURL = async (): Promise<IAuthAction> => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
    });

    cookies().set("state", state, {
      httpOnly: true,
    });

    const authorizationURL = await google.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      }
    );
    return {
      toast: { method: null },
      success: true,
      message: authorizationURL.href,
    };
  } catch (error: any) {
    return {
      toast: { method: null },
      success: false,
      error: error?.message,
    };
  }
};

export const createGithubAuthorizationURL = async (): Promise<IAuthAction> => {
  try {
    const state = generateState(); // generate a random string 6 characters long
    cookies().set("state", state, {
      httpOnly: true,
    });
    const authorizationURL = await github.createAuthorizationURL(state, {
      scopes: ["user:email"],
    });
    return {
      success: true,
      toast: { method: null },
      message: authorizationURL.href,
    };
  } catch (error: any) {
    return {
      success: false,
      toast: { method: null },
      error: error?.message,
    };
  }
};
