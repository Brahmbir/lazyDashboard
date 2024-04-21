/*
  Warnings:

  - A unique constraint covering the columns `[uniqueName]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,GroupId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueName` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "uniqueName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_uniqueName_key" ON "Group"("uniqueName");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_GroupId_key" ON "Member"("email", "GroupId");
