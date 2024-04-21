import prisma from "@/lib/db";

interface ITokenRecord {
  userId: string;
  token: string;
}
export async function createVerificationToken(data: ITokenRecord) {
  return await prisma.emailVerificationToken.create({
    data: {
      userId: data.userId,
      token: data.token,
      sentAt: new Date(),
    },
  });
}
export async function findEmailVerifyRecord(userId: string) {
  return await prisma.emailVerificationToken.findUnique({
    where: {
      userId: userId,
    },
  });
}
export async function updateVerificationToken(data: ITokenRecord) {
  return await prisma.emailVerificationToken.update({
    data: { token: data.token, sentAt: new Date() },
    where: {
      userId: data.userId,
    },
  });
}
