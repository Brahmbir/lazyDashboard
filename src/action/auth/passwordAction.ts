"use server";

import z from "zod";
import jwt from "jsonwebtoken";

import { PasswordEmailSchema } from "@/schema/form/PasswordSchema";

import { generateId } from "lucia";
import { sendEmail } from "@/lib/lucia";
import { GetUserByEmail } from "@/queries/user";
import {
  createResetToken,
  findResetToken,
  renewResetToken,
} from "@/queries/passwordReset";
import { IAuthAction } from "@/types/authActionType";

export const SendResetEmail = async (
  values: z.infer<typeof PasswordEmailSchema>
): Promise<IAuthAction> => {
  try {
    PasswordEmailSchema.parse(values);
  } catch (error: any) {
    return {
      success: false,
      error: error.message as string,
      toast: { method: "Error", message: error.message as string },
    };
  }
  const existingUser = await GetUserByEmail(values.email);

  if (!existingUser) {
    return {
      success: false,
      error: `User not found with ${values.email}`,
      toast: {
        method: "Error",
        message: `User account with this email <${values.email}> does not exist`,
      },
    };
  }

  if (existingUser.isEmailVerified === false) {
    return {
      success: false,
      error: "Please verify your email before any action on the account",
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

  //   create or update reset token

  const resetRecord = await findResetToken(existingUser.email);

  let resetToken = generateId(20);

  if (!resetRecord) {
    await createResetToken({ email: existingUser.email, resetToken });
  } else {
    const sentAt = new Date(resetRecord.sentAt);

    const isTenMinHasPassed =
      new Date().getTime() - sentAt.getTime() > 6_00_000; // 10 min

    if (isTenMinHasPassed) {
      await renewResetToken({ email: existingUser.email, resetToken });
    } else {
      resetToken = resetRecord.resetToken;
    }
  }

  const JWToken = jwt.sign(
    {
      userId: existingUser.id,
      email: existingUser.email,
      resetToken,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "9m",
    }
  );

  //   send email to user
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/login/password/reset?token=${JWToken}`;

  const Html = `<a href="${URL}"> change password </a>`;

  sendEmail({ to: existingUser.email, subject: "pass reset", html: Html });

  return {
    success: true,
    message: "Email sent",
    toast: {
      method: "Info",
      message: "A mail with link to change your password has been send",
    },
  };
};
