/*
  Warnings:

  - You are about to alter the column `percentage` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coupon" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "percentage" REAL NOT NULL,
    "expire_date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Coupon" ("code", "createdAt", "expire_date", "percentage", "updatedAt") SELECT "code", "createdAt", "expire_date", "percentage", "updatedAt" FROM "Coupon";
DROP TABLE "Coupon";
ALTER TABLE "new_Coupon" RENAME TO "Coupon";
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
