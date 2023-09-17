import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import GetProduct from "../../src/application/usecase/GetProduct";
import {test, expect} from "@jest/globals";

test("deve retirnar um produto", async () => {
   const repositoryFactory = new DatabaseRepositoryFactory();
   const getProduct = new GetProduct(repositoryFactory);
   const product1 = await getProduct.execute(1);
   expect(product1.id).toBe(1);
   expect(product1.price).toBe(1000);
   expect(product1.width).toBe(100);
   expect(product1.height).toBe(30);
   expect(product1.length).toBe(10);
   expect(product1.weight).toBe(3);
   expect(product1.volume).toBe(0.03);
   expect(product1.density).toBe(100);
});