"use server";

import z from "zod";

import { PasswordResetSchema } from "@/schema/form/PasswordSchema";
import Jwt from "jsonwebtoken";

import { GetUserByEmail, updateUserPassword } from "@/queries/user";
import { deleteResetToken, findResetToken } from "@/queries/passwordReset";
import { Argon2id } from "oslo/password";
import { IAuthAction } from "@/types/authActionType";

export const SetNewPassword = async (
  values: z.infer<typeof PasswordResetSchema>,
  token: string | null
): Promise<IAuthAction> => {
  try {
    PasswordResetSchema.parse(values);
  } catch (error: any) {
    return {
      success: false,
      toast: { method: "Error", message: "Schema do not match at sever" },
      error: error.message,
    };
  }

  if (values.password !== values.confirmPassword) {
    return {
      success: false,
      error: "Password do not match at server side",
      toast: {
        method: "Error",
        message: "Password and comfirm password are not same, at server side",
      },
    };
  }
  if (!token) {
    //  not token found,
    return {
      success: false,
      error: "Not token found, please retry by sending reset email again",
      toast: { method: null },
    };
  } else {
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as {
        resetToken: string;
        email: string;
        userId: string;
      };

      console.log(decoded);

      const existToken = await findResetToken(decoded.email);
      console.log(existToken);
      if (!existToken) {
        return {
          success: false,
          error: "token does not exist",
          toast: {
            method: "Error",
            message: "Token for reseting your password does not exist",
          },
        };
      }
      if (decoded.resetToken !== existToken.resetToken) {
        return {
          success: false,
          error: "Token from server and client does not match",
          toast: {
            method: "Error",
            message: "Token from server and client does not match",
          },
        };
      }

      //  * set new password
      const existingUser = await GetUserByEmail(existToken.email);
      const isValidPassword = await new Argon2id().verify(
        existingUser!.hashedPass!,
        values.password
      );

      if (isValidPassword) {
        return {
          success: false,
          error: "Please use another password",
          toast: {
            method: "Error",
            message: "New password can not be same as old one",
          },
        };
      }

      await deleteResetToken(decoded.email);

      const hashedPassword = await new Argon2id().hash(values.password);
      await updateUserPassword(existingUser!.id, hashedPassword);

      // todo delete all session after reseting password

      return {
        success: true,
        message: "Password reset",
        toast: { method: "Success", message: "Your password has been reset" },
      };
    } catch {
      return {
        success: false,
        error: "token expire try again",
        toast: { method: null },
      };
    }
  }
};
