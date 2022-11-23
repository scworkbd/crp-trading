/*
  Warnings:

  - You are about to drop the column `cryptoAddress` on the `Settings` table. All the data in the column will be lost.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "cryptoAddress";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;
