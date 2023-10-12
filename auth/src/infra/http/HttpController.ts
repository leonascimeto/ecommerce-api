import UseCaseFactory from "../factory/UseCaseFactory";
import HttpServer from "./HttpServer";

export default class HttpController {
   constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
      httpServer.on("get", "/verify", async (params: any, body: any) => {
         const verify  = useCaseFactory.createVerify();
         const output = await verify.execute(body.token);
         return output;
      });
   }
     
}