import prisma from "@/lib/db";

export async function findResetToken(email: string) {
  return await prisma.passwordResetToken.findUnique({
    where: { email: email },
  });
}

interface IResetRecord {
  email: string;
  resetToken: string;
}

export async function createResetToken(data: IResetRecord) {
  return await prisma.passwordResetToken.create({
    data: {
      email: data.email,
      sentAt: new Date(),
      resetToken: data.resetToken,
    },
  });
}

export async function deleteResetToken(email: string) {
  return await prisma.passwordResetToken.delete({ where: { email } });
}

export async function renewResetToken(data: IResetRecord) {
  await prisma.passwordResetToken.update({
    data: {
      sentAt: new Date(),
      resetToken: data.resetToken,
    },
    where: { email: data.email },
  });
}
