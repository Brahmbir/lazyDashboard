/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Offline', 'Active', 'Manager', 'Owner');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Group" (
    "groupId" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,
    "PictureUrl" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "Member" (
    "memberId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "PictureUrl" TEXT,
    "email" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "GroupId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdBy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberId" TEXT NOT NULL,
    "GroupId" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "Group"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;
