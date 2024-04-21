"use server";

import z from "zod";
import { RegisterSchema } from "@/schema/form/registerSchema";
import { generateId } from "lucia";

import { Argon2id } from "oslo/password";
import { createUser } from "@/queries/user";
import { sendEmail } from "@/lib/lucia";
import { getEmailToken } from "../help/email";
import { IAuthAction } from "@/types/authActionType";
import { TestEmail } from "@/email";

function GetNameFromEmail(email: string) {
  return email.split("@")[0].split("+")[0].replaceAll(".", "");
}

export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<IAuthAction> => {
  const Result = RegisterSchema.safeParse(values);
  if (!Result.success) {
    return {
      success: false,
      error: Result.error.message,
      toast: { method: "Error", message: "Schema do not match at sever" },
    };
  } else {
    const Account = Result.data;

    if (Account.password !== Account.confirmPassword) {
      return {
        success: false,
        toast: { method: "Warning", message: "Confirm Password should match" },
        error: "Password do not match at server side",
      };
    } else {
      const hashedPassword = await new Argon2id().hash(values.password);
      const userId = generateId(15);

      //* new user created in user table(relation)
      //*       ⇒ with isEmailVerified = Falsa

      try {
        await createUser({
          id: userId,
          name: GetNameFromEmail(Account.email),
          email: Account.email,
          hashedPass: hashedPassword,
        });

        // * generate Email Token

        const JWToken = await getEmailToken({
          email: Account.email,
          id: userId,
        });

        const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${JWToken}`;

        // const Html = `<a href="${URL}"> Verify your email </a>`;
        const Html = await TestEmail(URL);

        await sendEmail({
          to: Account.email,
          subject: "Account Verification Email",
          html: Html,
        });

        return {
          success: true,
          message: "Account created 👋",
          toast: {
            method: "Message",
            message: {
              title: "Email sent",
              description:
                "Email is sent to your email address for verification",
            },
          },
        };
      } catch (error: any) {
        switch (error.code) {
          case "P2002": {
            return {
              success: false,
              toast: {
                method: "Info",
                message: "This account already exist in records. please login",
              },
              error: "This account already exist.",
            };
          }
          default: {
            return {
              success: false,
              toast: {
                method: null,
              },
              error: error?.message,
            };
          }
        }
      }
    }
  }
};
