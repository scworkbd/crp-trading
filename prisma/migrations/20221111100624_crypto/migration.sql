-- CreateTable
CREATE TABLE "CrytoDeposit" (
    "id" TEXT NOT NULL,
    "tnx_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pending" BOOLEAN NOT NULL DEFAULT true,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CrytoDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CrytoDeposit_tnx_id_key" ON "CrytoDeposit"("tnx_id");

-- AddForeignKey
ALTER TABLE "CrytoDeposit" ADD CONSTRAINT "CrytoDeposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
