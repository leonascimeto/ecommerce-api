import ProductRepository from "../repository/ProductRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

export default class GetProducts{
   productRepository: ProductRepository;
   
   constructor(repositotyFactory: RepositoryFactory){
      this.productRepository = repositotyFactory.createProductRepository();
   }

   async execute(): Promise<Output[]> {
      const products = await this.productRepository.list();
      const output = products.map(product => {
         return {
            idProduct: product.id,
            description: product.name,
            price: product.price,
         }
      });
      return output;
   }
}

export type Output = {
	idProduct: number,
   description: string,
   price: number,
}