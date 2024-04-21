"use server";
import { GetUserByEmail } from "@/queries/user";
import { findEmailVerifyRecord } from "@/queries/emailVerification";
import { sendEmail } from "@/lib/lucia";
import { getEmailToken } from "../help/email";
import { IAuthAction } from "@/types/authActionType";

export const resendVerificationEmail = async (
  email: string
): Promise<IAuthAction> => {
  try {
    const existingUser = await GetUserByEmail(email);

    if (!existingUser) {
      return {
        success: false,
        error: "User not found",
        toast: { method: "Error", message: "User dose not exist in records" },
      };
    }

    if (existingUser.isEmailVerified === true) {
      return {
        success: false,
        error: "Email already verified",
        toast: { method: null },
      };
    }

    const exitedToken = await findEmailVerifyRecord(existingUser.id);

    if (!exitedToken) {
      return {
        success: false,
        error: "Token not found",
        toast: { method: null },
      };
    }

    const sentAt = new Date(exitedToken.sentAt);

    const isOneMinuteHasPassed =
      new Date().getTime() - sentAt.getTime() > 60000; // 1 minute

    if (!isOneMinuteHasPassed) {
      return {
        success: false,
        error: "Email already sent ",
        toast: {
          method: "Warning",
          message:
            "next email in " +
            (60 -
              Math.floor((new Date().getTime() - sentAt.getTime()) / 1000)) +
            " seconds",
        },
      };
    }

    const JWToken = await getEmailToken({
      email: existingUser.email,
      id: existingUser.id,
    });

    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${JWToken}`;

    const Html = `<a href="${URL}"> Verify your email </a>`;

    await sendEmail({
      to: existingUser.email,
      subject: "Account Verification Email",
      html: Html,
    });

    return {
      success: true,
      message: "Email already sent ",
      toast: {
        method: "Message",
        message: {
          title: "Email sent",
          description: "Please go to user inbox and verify your eamil",
        },
      },
    };
  } catch {
    return {
      success: false,
      error: "Something went wrong",
      toast: { method: null },
    };
  }
};
