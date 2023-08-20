import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import SimulatFreight from "../../src/application/usecase/SimulateFreight";

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
   const repositotyFactory = new DatabaseRepositoryFactory();
   const simulatFreight = new SimulatFreight(repositotyFactory);
   const output = await simulatFreight.execute(input);
   expect(output.freight).toBe(280);
});