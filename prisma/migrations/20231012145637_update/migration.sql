/*
  Warnings:

  - Added the required column `serviceId` to the `feed-back` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feed-back" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "feed-back" ADD CONSTRAINT "feed-back_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
