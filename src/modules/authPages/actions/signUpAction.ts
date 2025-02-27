"use server";
import z from "zod";
import { SignUpSchema } from "../schema";
import { IAuthAction } from "./types";
import { auth } from "@/lib/auth/server";
import { getNameFromEmail, processedEmails } from "../utils";
import { sendWelcomeMail } from "@/lib/mailer";

export const EmailSignup = async (
  values: z.infer<typeof SignUpSchema>
): Promise<IAuthAction> => {
  const Result = SignUpSchema.safeParse(values);
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
      try {
        const userData = await auth.api.signUpEmail({
          body: {
            email: processedEmails(values.email),
            fullEmail: values.email,
            password: values.password,
            name: getNameFromEmail(values.email),
          },
        });
        if (userData.user) {
          console.log(userData.user);

          await sendWelcomeMail(
            { to: values.email, subject: "Welcome email" },
            { name: userData.user.name }
          );

          await auth.api.sendVerificationEmail({
            body: { email: values.email },
          });
        }
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
        switch (error.body.code) {
          case "USER_ALREADY_EXISTS": {
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
              error: error.body.message,
            };
          }
        }
      }
    }
  }
};
