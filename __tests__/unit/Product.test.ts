import Product from "../../src/domain/entity/Product";

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

test("Não deve criar produto com dimensões invalidas", () => {
   expect(() => new Product(1, "A", 1000, 0, -30, -10, 3)).toThrow(new Error("Invalid dimensions"));
});

test("Não deve criar produto com peso invalido", () => {
   expect(() => new Product(1, "A", 1000, 100, 30, 10, 0)).toThrow(new Error("Invalid weight"));
});