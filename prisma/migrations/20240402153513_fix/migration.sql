/*
  Warnings:

  - You are about to drop the `oauthAccount` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "oauthAccount" DROP CONSTRAINT "oauthAccount_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "PictureUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "oauthAccount";

-- CreateTable
CREATE TABLE "OAuthAccount" (
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "OAuthAccount_pkey" PRIMARY KEY ("provider","providerUserId")
);

-- AddForeignKey
ALTER TABLE "OAuthAccount" ADD CONSTRAINT "OAuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
