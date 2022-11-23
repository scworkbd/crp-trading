/*
  Warnings:

  - You are about to drop the `CryptoWithdraw` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CrytoDeposit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CryptoWithdraw" DROP CONSTRAINT "CryptoWithdraw_userId_fkey";

-- DropForeignKey
ALTER TABLE "CrytoDeposit" DROP CONSTRAINT "CrytoDeposit_userId_fkey";

-- DropTable
DROP TABLE "CryptoWithdraw";

-- DropTable
DROP TABLE "CrytoDeposit";
