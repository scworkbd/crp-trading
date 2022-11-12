/*
  Warnings:

  - A unique constraint covering the columns `[image_url]` on the table `CrytoDeposit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `CrytoDeposit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CrytoDeposit" ADD COLUMN     "amount" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CrytoDeposit_image_url_key" ON "CrytoDeposit"("image_url");
