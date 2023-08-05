export default class Product{

   constructor(
      readonly id: number, 
      readonly name: string, 
      readonly price: number, 
      readonly width: number, 
      readonly height: number, 
      readonly length: number, 
      readonly weight: number
   ) {
      // TODO if(width <= 0 || height <= 0 || length <= 0) throw new Error("Invalid dimensions");
      // TODO if(weight <= 0) throw new Error("Invalid weight");
   }

   getVolume() {
      return (this.width / 100) * (this.height / 100) * (this.length / 100);
   }

   getDensity() {
      return this.weight / this.getVolume();
   }
}