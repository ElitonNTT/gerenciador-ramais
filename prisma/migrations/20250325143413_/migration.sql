/*
  Warnings:

  - You are about to drop the column `cardId` on the `Ramal` table. All the data in the column will be lost.
  - Added the required column `cardID` to the `Ramal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ramal" DROP CONSTRAINT "Ramal_cardId_fkey";

-- AlterTable
ALTER TABLE "Ramal" DROP COLUMN "cardId",
ADD COLUMN     "cardID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ramal" ADD CONSTRAINT "Ramal_cardID_fkey" FOREIGN KEY ("cardID") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
