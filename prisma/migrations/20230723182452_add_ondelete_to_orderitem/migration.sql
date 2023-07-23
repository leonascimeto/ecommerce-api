-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItem" (
    "id_product" INTEGER NOT NULL,
    "id_order" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("id_product", "id_order"),
    CONSTRAINT "OrderItem_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product" ("id_product") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order" ("id_order") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("id_order", "id_product", "price", "quantity") SELECT "id_order", "id_product", "price", "quantity" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
