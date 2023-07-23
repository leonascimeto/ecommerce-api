import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import SimulatFreight from "../src/SimulateFreight";

test("Deve simular o frete", async function () {
   const input = {
      items: [
         { idProduct: 1, quantity: 1},
         { idProduct: 2, quantity: 1},
         { idProduct: 3, quantity: 3},
      ],
      from: "88015600",
      to: "22030060",
   }
   const productRepository = new ProductRepositoryDatabase();
   const simulatFreight = new SimulatFreight(productRepository);
   const output = await simulatFreight.execute(input);
   expect(output.freight).toBe(280);
});