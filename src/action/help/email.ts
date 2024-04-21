import jwt from "jsonwebtoken";

import {
  createVerificationToken,
  findEmailVerifyRecord,
  updateVerificationToken,
} from "@/queries/emailVerification";

interface User {
  email: string;
  id: string;
}

export async function getEmailToken(user: User) {
  const record = await findEmailVerifyRecord(user.id);

  const Token = Math.random().toString(36).substring(2, 12);

  if (record) {
    await updateVerificationToken({
      token: Token,
      userId: user.id,
    });
  } else {
    await createVerificationToken({ token: Token, userId: user.id });
  }

  const JWToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      Token,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30m",
    }
  );
  return JWToken;
}
