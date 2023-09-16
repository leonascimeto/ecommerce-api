import FreightGateway, {Input, Output} from "../../application/gateway/FreightGateway";
import HttpClient from "../http/HttpClient";

export default class FreightCalculator implements FreightGateway {
   constructor(readonly httpClient: HttpClient){
   }

   async simulateFreight(input: Input): Promise<Output> {
       const Output = await this.httpClient.post('http://localhost:3002/simulateFreight', input);
       return Output;
   }
}