import Product from "./Product"

export default class FreightCalculator{
   static calculate(product: Product): number {
      let freight = Math.max(product.getVolume() * (product.getDensity()/100) * 1000, 10);
      return Math.max(freight, 10);
   }
}