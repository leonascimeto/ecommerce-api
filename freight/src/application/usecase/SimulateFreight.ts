import FreightCalculator from "../../domain/entity/FreightCalculator";
import RepositoryFactory from "../factory/RepositoryFactory";

export default class SimulatFreight{
   
   constructor(repositotyFactory: RepositoryFactory){
   }

   async execute(input: Input): Promise<Output> {
      const output = {
         freight: 0,
      }
      for(const item of input.items) {
         if(input.from && input.to) {
            const freight = FreightCalculator.calculate(
               {
                  distance: 1000,
                  volume: item.volume,
                  density: item.density,
               }
            );
            output.freight += freight * item.quantity;
         }
      }
      return output;
   }
}

export type Input = {
	items: { volume: number, density: number, quantity: number }[], 
	from?: string, 
	to?: string,
}

export type Output = {
	freight: number,
}