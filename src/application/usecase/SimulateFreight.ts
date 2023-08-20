import FreightCalculator from "../../domain/entity/FreightCalculator";
import ProductRepository from "../repository/ProductRepository";
import RepositoryFactory from "../repository/RepositoryFactory";

export default class SimulatFreight{
   productRepository: ProductRepository;
   
   constructor(repositotyFactory: RepositoryFactory){
      this.productRepository = repositotyFactory.createProductRepository();
   }

   async execute(input: Input): Promise<Output> {
      const output = {
         freight: 0,
      }
      for(const item of input.items) {
         if(input.from && input.to) {
            const product = await this.productRepository.get(item.idProduct);
            const freight = FreightCalculator.calculate(product);
            output.freight += freight * item.quantity;
         }
      }
      return output;
   }
}

export type Input = {
	items: { idProduct: number, quantity: number, price?: number }[], 
	from?: string, 
	to?: string,
}

export type Output = {
	freight: number,
}