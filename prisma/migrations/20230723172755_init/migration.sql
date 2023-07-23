-- CreateTable
CREATE TABLE "Product" (
    "id_product" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "length" INTEGER,
    "weight" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Coupon" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "percentage" REAL NOT NULL,
    "expire_date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id_order" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT,
    "cpf" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "freight" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id_product" INTEGER NOT NULL,
    "id_order" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("id_product", "id_order"),
    CONSTRAINT "OrderItem_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product" ("id_product") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order" ("id_order") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");
