import UseCaseFactory from "../factory/UseCaseFactory";
import HttpServer from "./HttpServer";

export default class HttpController {
   constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
      httpServer.on("post", "/simulateFreight", async (params: any, body: any) => {
         const simulateFreight  = useCaseFactory.createSimulateFreight();
         const output = await simulateFreight.execute(body);
         return output;
      });
   }
}