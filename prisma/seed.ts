import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
   const products = [
      { id_product: 1, description: "A", price: 1000 },
      { id_product: 2, description: "B", price: 5000 },
      { id_product: 3, description: "C", price: 30 }
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
            price: product.price
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
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

