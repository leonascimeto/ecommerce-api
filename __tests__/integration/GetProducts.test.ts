import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import GetProducts from "../../src/application/usecase/GetProducts";
test("deve listar todos os produtos", async () => {
   const repositoryFactory = new DatabaseRepositoryFactory();
   const getProducts = new GetProducts(repositoryFactory);
   const products = await getProducts.execute();
   expect(products).toHaveLength(3);
});