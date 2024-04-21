import prisma from "@/lib/db";

interface IUser {
  id: string;
  name: string;
  email: string;
  hashedPass: string;
}

export async function createUser(data: IUser) {
  return await prisma.user.create({
    data: data,
  });
}
export async function updateUserPassword(id: string, hashedPass: string) {
  return await prisma.user.update({ data: { hashedPass }, where: { id } });
}

export async function verifyUserEmail(
  userId: string,
  isEmailVerified: boolean = true
) {
  // ? delete all token of a user account
  await prisma.emailVerificationToken.deleteMany({ where: { userId: userId } });

  // ? set isEmailVerified to true
  return await prisma.user.update({
    where: { id: userId },
    data: {
      isEmailVerified: isEmailVerified,
    },
  });
}

export async function GetUserById(userId: string) {
  return await prisma.user.findUnique({ where: { id: userId } });
}
export async function GetUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email: email } });
}
