-- CreateTable
CREATE TABLE "PasswordResteToken" (
    "email" TEXT NOT NULL,
    "resetToken" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResteToken_email_key" ON "PasswordResteToken"("email");

-- AddForeignKey
ALTER TABLE "PasswordResteToken" ADD CONSTRAINT "PasswordResteToken_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
