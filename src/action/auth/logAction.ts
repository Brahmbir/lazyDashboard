"use server";

import z from "zod";
import { LoginSchema } from "@/schema/form/loginSchema";

import { lucia, validateRequest } from "@/lib/lucia/auth";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import { GetUserByEmail } from "@/queries/user";
import { redirect } from "next/navigation";
import { IAuthAction } from "@/types/authActionType";

export const logIn = async (
  values: z.infer<typeof LoginSchema>
): Promise<IAuthAction> => {
  try {
    LoginSchema.parse(values);
  } catch (error: any) {
    return {
      success: false,
      toast: { method: "Error", message: "Schema do not match at sever" },
      error: error.message,
    };
  }
  const existingUser = await GetUserByEmail(values.email);

  if (!existingUser) {
    return {
      success: false,
      error: "User not found",
      toast: { method: "Error", message: "User does not esixt in records" },
    };
  }

  if (!existingUser.hashedPass) {
    return {
      success: false,
      error: "This account use a OAuth provider",
      toast: {
        method: "Message",
        message: {
          title: "Account already exist",
          description: "This account use a OAuth provider",
        },
      },
    };
  }

  const isValidPassword = await new Argon2id().verify(
    existingUser.hashedPass,
    values.password
  );

  if (!isValidPassword) {
    return {
      success: false,
      error: "Incorrect username or password",
      toast: { method: null },
    };
  }

  if (existingUser.isEmailVerified === false) {
    return {
      success: false,
      error: "Email is not verified",
      toast: {
        method: "Action",
        message: {
          title: "Email is not verified",
          description:
            "To verify your Account, do you want us to send you a verification mail?",

          actionData: { email: existingUser.email },
        },
      },
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: true,
    message: "Logged in successfully",
    toast: {
      method: "Success",
      message: "Welcome " + existingUser.name,
    },
  };
};

export const logOut = async (): Promise<IAuthAction> => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
        toast: { method: null },
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    return {
      success: false,
      error: error?.message,
      toast: { method: null },
    };
  } finally {
    return redirect("/");
  }
};
