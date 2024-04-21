/*
  Warnings:

  - The primary key for the `EmailVerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EmailVerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,token]` on the table `EmailVerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "EmailVerificationToken" DROP CONSTRAINT "EmailVerificationToken_userId_fkey";

-- AlterTable
ALTER TABLE "EmailVerificationToken" DROP CONSTRAINT "EmailVerificationToken_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashedPass" DROP NOT NULL;

-- CreateTable
CREATE TABLE "oauthAccount" (
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oauthAccount_pkey" PRIMARY KEY ("provider","providerUserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_userId_token_key" ON "EmailVerificationToken"("userId", "token");

-- AddForeignKey
ALTER TABLE "oauthAccount" ADD CONSTRAINT "oauthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailVerificationToken" ADD CONSTRAINT "EmailVerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
