/*
  Warnings:

  - Made the column `setor` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtitle` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mensagem` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unidade` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "setor" SET NOT NULL,
ALTER COLUMN "subtitle" SET NOT NULL,
ALTER COLUMN "mensagem" SET NOT NULL,
ALTER COLUMN "unidade" SET NOT NULL;
