-- DropForeignKey
ALTER TABLE "buildings" DROP CONSTRAINT "buildings_estateId_fkey";

-- DropForeignKey
ALTER TABLE "rental_units" DROP CONSTRAINT "rental_units_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "rental_units" DROP CONSTRAINT "rental_units_estateId_fkey";

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_estateId_fkey" FOREIGN KEY ("estateId") REFERENCES "estates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_units" ADD CONSTRAINT "rental_units_estateId_fkey" FOREIGN KEY ("estateId") REFERENCES "estates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_units" ADD CONSTRAINT "rental_units_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
