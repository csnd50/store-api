/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "order_userId_key" ON "order"("userId");
