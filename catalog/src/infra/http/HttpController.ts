import UseCaseFactory from "../factory/UseCaseFactory";
import HttpServer from "./HttpServer";

export default class HttpController {
   constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
      httpServer.on("get", "/products", async (params: any, body: any) => {
         const getProducts  = useCaseFactory.createGetProducts();
         const output = await getProducts.execute();
         return output;
      });

      httpServer.on("get", "/products/:idProduct", async (params: any, body: any) => {
         console.info("[start] HttpController - httpServer.on - get - /products/:idProduct");
         const getProduct  = useCaseFactory.createGetProduct();
         const output = await getProduct.execute(params.idProduct);
         console.log({output})
         console.info("[end] HttpController - httpServer.on - get - /products/:idProduct");
         return output;
      });
   }
}