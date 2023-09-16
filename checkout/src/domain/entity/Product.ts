export default class Product{
   
   constructor(
      readonly id: number, 
      readonly name: string, 
      readonly price: number, 
      readonly width: number, 
      readonly height: number, 
      readonly length: number, 
      readonly weight: number,
      readonly density: number = 0,
      readonly volume: number = 0
   ) {
      if(width <= 0 || height <= 0 || length <= 0) throw new Error("Invalid dimensions");
      if(weight <= 0) throw new Error("Invalid weight");
   }
}