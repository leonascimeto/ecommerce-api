import ProductRepository from "../repository/ProductRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

export default class GetProduct{
   productRepository: ProductRepository;
   
   constructor(repositotyFactory: RepositoryFactory){
      this.productRepository = repositotyFactory.createProductRepository();
   }

   async execute(idProduct: number): Promise<Output> {
      const product = await this.productRepository.get(idProduct);
      return Object.assign(product, {
         volume: product.getVolume(),
         density: product.getDensity(),
      });
   }
}

export type Output = {
	id: number,
   name: string,
   price: number,
   width: number,
   height: number,
   length: number,
   weight: number,
   volume: number,
   density: number,
}