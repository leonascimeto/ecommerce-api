import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
   const products = [
      { id_product: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3 },
      { id_product: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22 },
      { id_product: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9 },
      { id_product: 4, description: "D", price: 100, width: -10, height: -10, length: -10, weight: 1},
      { id_product: 5, description: "E", price: 100, width: 10, height: 10, length: 10, weight: -1}
   ]


   const coupons = [
      { code: "VALE20", percentage: 20, expire_date: new Date('2030-05-30T03:00:00') },
      { code: "VALE10", percentage: 10, expire_date: new Date('2021-05-30T03:00:00') }
   ]

   await prisma.product.deleteMany();
   await prisma.coupon.deleteMany();

   for (const product of products) {
      await prisma.product.create({
         data: {
            id_product: product.id_product,
            description: product.description,
            price: product.price,
            width: product.width,
            height: product.height,
            length: product.length,
            weight: product.weight
         }
      })
   }

   for (const coupon of coupons) {
      await prisma.coupon.create({
         data: {
            code: coupon.code,
            percentage: coupon.percentage,
            expire_date: coupon.expire_date
         }
      })
   }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Seed completed");
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

