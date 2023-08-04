import { PrismaClient } from '@prisma/client';
import ProductRepository from './ProductRepository';
import Product from './Product';
const prisma = new PrismaClient();

export default class ProductRepositoryDatabase implements ProductRepository {
   async get(id: number) {
      const product =  await prisma.product.findUnique({
         where: {
            id_product: id
         }
      });

      return new Product(product.id_product, product.description, product.price, product.width, product.height, product.length, product.weight);
   }
}