/*
  Warnings:

  - You are about to drop the `PasswordResteToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PasswordResteToken" DROP CONSTRAINT "PasswordResteToken_email_fkey";

-- DropTable
DROP TABLE "PasswordResteToken";

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "email" TEXT NOT NULL,
    "resetToken" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_key" ON "PasswordResetToken"("email");

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
