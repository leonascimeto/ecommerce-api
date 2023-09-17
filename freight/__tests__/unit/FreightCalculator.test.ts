import FreightCalculator from "../../src/domain/entity/FreightCalculator";
import {test, expect} from "@jest/globals";

test("Deve calcula o frete", () => {
   const freight = FreightCalculator.calculate({
      distance: 1000,
      volume: 0.03,
      density: 100,
   });
   expect(freight).toBe(30);
})

test("deve calcular com frete minimo", () => {
   const freight = FreightCalculator.calculate({
      distance: 1000,
      volume: 0.01,
      density: 100,
   });
   expect(freight).toBe(10);
});