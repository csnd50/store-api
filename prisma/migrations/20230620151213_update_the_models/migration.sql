/*
  Warnings:

  - The values [Cancelled,Returned] on the enum `status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "status_new" AS ENUM ('Pending', 'Shipped', 'Delivered');
ALTER TABLE "order" ALTER COLUMN "orderStatus" DROP DEFAULT;
ALTER TABLE "order" ALTER COLUMN "orderStatus" TYPE "status_new" USING ("orderStatus"::text::"status_new");
ALTER TYPE "status" RENAME TO "status_old";
ALTER TYPE "status_new" RENAME TO "status";
DROP TYPE "status_old";
ALTER TABLE "order" ALTER COLUMN "orderStatus" SET DEFAULT 'Pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropTable
DROP TABLE "Review";
