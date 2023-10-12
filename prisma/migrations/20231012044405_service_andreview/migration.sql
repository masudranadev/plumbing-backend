/*
  Warnings:

  - You are about to drop the column `bookId` on the `review_and_ratings` table. All the data in the column will be lost.
  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `serviceId` to the `review_and_ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "review_and_ratings" DROP CONSTRAINT "review_and_ratings_bookId_fkey";

-- AlterTable
ALTER TABLE "review_and_ratings" DROP COLUMN "bookId",
ADD COLUMN     "serviceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "books";

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "review_and_ratings" ADD CONSTRAINT "review_and_ratings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
