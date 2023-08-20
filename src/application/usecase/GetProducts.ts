import FreightCalculator from "../../domain/entity/FreightCalculator";
import ProductRepository from "../repository/ProductRepository";
import RepositoryFactory from "../repository/RepositoryFactory";

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

      console.log(output);
      return output;
   }
}

export type Output = {
	idProduct: number,
   description: string,
   price: number,
}