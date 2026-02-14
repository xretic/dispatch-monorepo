/*
  Warnings:

  - You are about to drop the column `ack` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Site` table. All the data in the column will be lost.
  - The `status` column on the `Site` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ERROR', 'WARNING', 'DDOS', 'STABLE');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "ack",
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "city",
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'STABLE';

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "avatarUrl" TEXT NOT NULL DEFAULT '',
    "username" TEXT NOT NULL,
    "githubId" TEXT,
    "googleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Event_siteId_idx" ON "Event"("siteId");

-- CreateIndex
CREATE INDEX "Event_userId_idx" ON "Event"("userId");

-- CreateIndex
CREATE INDEX "Site_userId_idx" ON "Site"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
