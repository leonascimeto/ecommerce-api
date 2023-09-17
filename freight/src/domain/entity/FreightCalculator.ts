export default class FreightCalculator{
   static calculate(input: Input): number {
      const { distance, volume, density } = input;
      let freight = volume * distance * (density / 100);
      return Math.max(freight, 10);
   }
}

type Input = {
   distance: number,
   volume: number,
   density: number,
}