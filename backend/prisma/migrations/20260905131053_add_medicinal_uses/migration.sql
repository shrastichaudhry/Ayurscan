/*
  Warnings:

  - You are about to drop the column `medicinalUses` on the `Plant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "medicinalUses";

-- CreateTable
CREATE TABLE "MedicinalUse" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "plantPart" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "traditionalUse" BOOLEAN NOT NULL DEFAULT true,
    "sourceName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicinalUse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MedicinalUse_plantId_idx" ON "MedicinalUse"("plantId");

-- AddForeignKey
ALTER TABLE "MedicinalUse" ADD CONSTRAINT "MedicinalUse_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
