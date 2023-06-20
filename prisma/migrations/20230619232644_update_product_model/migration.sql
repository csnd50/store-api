/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");
