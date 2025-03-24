/*
  Warnings:

  - Made the column `cardId` on table `Ramal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Ramal" DROP CONSTRAINT "Ramal_cardId_fkey";

-- AlterTable
ALTER TABLE "Ramal" ALTER COLUMN "cardId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Ramal" ADD CONSTRAINT "Ramal_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
