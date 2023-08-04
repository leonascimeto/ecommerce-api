import Product from "../src/Product";

test("deve calcular densidade", () => {
   const product = new Product(1, "A", 1000, 100, 30, 10, 3);
   const density = product.getDensity();
   expect(density).toBe(100);
});

test("deve calcular volume", () => {
   const product = new Product(1, "A", 1000, 100, 30, 10, 3);
   const volume = product.getVolume();
   expect(volume).toBe(0.03);
});