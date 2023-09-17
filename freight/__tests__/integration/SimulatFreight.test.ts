import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import SimulatFreight from "../../src/application/usecase/SimulateFreight";
import {test, expect} from "@jest/globals";

test("Deve simular o frete", async function () {
   const input = {
      items: [
         {volume: 0.03, density: 100, quantity: 1},
      ],
      from: "88015600",
      to: "22030060",
   }
   const repositotyFactory = new DatabaseRepositoryFactory();
   const simulatFreight = new SimulatFreight(repositotyFactory);
   const output = await simulatFreight.execute(input);
   expect(output.freight).toBe(30);
});