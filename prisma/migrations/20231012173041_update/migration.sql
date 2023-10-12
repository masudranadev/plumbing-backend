-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "published" DROP NOT NULL,
ALTER COLUMN "published" SET DEFAULT true;
