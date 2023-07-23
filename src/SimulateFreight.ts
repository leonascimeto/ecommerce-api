import ProductRepository from "./ProductRepository";

export default class SimulatFreight{
   constructor(readonly productRepository: ProductRepository){}

   async execute(input: Input): Promise<Output> {
      const output = {
         freight: 0,
      }
      for(const item of input.items) {
         if(input.from && input.to) {
            const productData = await this.productRepository.get(item.idProduct);
            const volume = (productData.width / 100) * (productData.height / 100) * (productData.length / 100);
            const density = productData.weight / volume;
            let freight = Math.max(volume * (density/100) * 1000, 10);
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