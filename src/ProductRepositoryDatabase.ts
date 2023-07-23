import { PrismaClient } from '@prisma/client';
import ProductRepository from './ProductRepository';
const prisma = new PrismaClient();

export default class ProductRepositoryDatabase implements ProductRepository {
   async get(id: number) {
      return await prisma.product.findUnique({
         where: {
            id_product: id
         }
      });
   }
}