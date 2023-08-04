import Product from "../src/Product";
import FreightCalculator from "../src/FreightCalculator";

test("Deve calcula o frete", () => {
   const product = new Product(1, "A", 1000, 100, 30, 10, 3);
   const freight = FreightCalculator.calculate(product);
   expect(freight).toBe(30);
})

test("deve calcular com frete minimo", () => {
   const product = new Product(1, "A", 1000, 10, 10, 10, 0.9);
   const freight = FreightCalculator.calculate(product);
   expect(freight).toBe(10);
});