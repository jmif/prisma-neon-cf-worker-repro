/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subscriptionId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionStatus` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserSubscriptionStatus" AS ENUM ('active', 'none');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "subscriptionId" TEXT NOT NULL,
ADD COLUMN     "subscriptionStatus" "UserSubscriptionStatus" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
