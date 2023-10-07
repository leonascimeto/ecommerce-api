import UseCaseFactory from "../factory/UseCaseFactory";
import HttpServer from "./HttpServer";

export default class HttpController {
   constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
      // httpServer.on("get", "/products", async (params: any, body: any) => {
      //    const getProducts  = useCaseFactory.createGetProducts();
      //    const output = await getProducts.execute();
      //    return output;
      // });
   }
     
}