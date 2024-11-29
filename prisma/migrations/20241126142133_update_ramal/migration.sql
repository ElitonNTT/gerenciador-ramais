/*
  Warnings:

  - Made the column `nome` on table `Ramal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numero` on table `Ramal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `funcao` on table `Ramal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ramal" ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "numero" SET NOT NULL,
ALTER COLUMN "funcao" SET NOT NULL;
