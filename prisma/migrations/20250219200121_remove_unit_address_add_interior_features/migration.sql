/*
  Warnings:

  - You are about to drop the column `address` on the `rental_units` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `rental_units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rental_units" DROP COLUMN "address",
DROP COLUMN "city",
ADD COLUMN     "interiorFeatures" TEXT[];
