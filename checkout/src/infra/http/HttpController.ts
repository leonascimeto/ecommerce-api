import UseCaseFactory from "../factory/UseCaseFactory";
import HttpServer from "./HttpServer";

export default class HttpController {
   constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
      httpServer.on("post", "/checkout", async (params: any, body: any) => {
         const checkout = useCaseFactory.createCheckout();
         const output = await checkout.execute(body);
         return output;
      });
   }
}