import { PrismaClient } from '@prisma/client';
import ProductRepository from '../../application/repository/ProductRepository';
import Product from '../../domain/entity/Product';
const prisma = new PrismaClient();

export default class ProductRepositoryDatabase implements ProductRepository {
   async list(): Promise<Product[]> {
      const products = prisma.product.findMany();
      return (await products).map(product => new Product(product.id_product, product.description, product.price, product.width, product.height, product.length, product.weight));
   }

   async get(id: number) {
      const product =  await prisma.product.findUnique({
         where: {
            id_product: id
         }
      });

      return new Product(product.id_product, product.description, product.price, product.width, product.height, product.length, product.weight);
   }
}