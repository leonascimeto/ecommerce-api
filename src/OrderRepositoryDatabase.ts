import { PrismaClient } from "@prisma/client";
import OrderRepository from "./OrderRepository";

const prisma = new PrismaClient();

export default class OrderRepositoryDatabase implements OrderRepository {

   async get(idOrder: string): Promise<any> {
        return await prisma.order.findUnique({
            where: {
               id_order: idOrder
            }
        })
    }

   async save(order: any): Promise<void> {
      await prisma.order.create({
         data: {
            id_order: order.idOrder,
            total: order.total,
            cpf: order.cpf,
            freight: order.freight,
            code: order.code || null,
            items: {
               create: order.items.map((item) => ({
                 product: { connect: { id_product: item.idProduct } },
                 price: item.price,
                 quantity: item.quantity,
               })),
             },
         },
         include: {
            items: true,
         }
      })
   }

   async clear() : Promise<void> {
      await prisma.order.deleteMany({});
   }

   async count() : Promise<number> {
      return await prisma.order.count();
   }
}
