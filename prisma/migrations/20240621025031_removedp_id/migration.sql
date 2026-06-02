/*
  Warnings:

  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropIndex
DROP INDEX "Order_productId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "orderId" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
