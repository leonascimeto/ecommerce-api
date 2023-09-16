import GatewaysFactory from "../../application/factory/GateWayFactory";
import CatalogGateway from "../../application/gateway/CatalogGateway";
import FreightCalculator from "../../application/gateway/FreightGateway";
import HttpClient from "../http/HttpClient";
import CatalogHttpGateway from "../gateway/CatalogHttpGateway";
import FreightHttpGateway from "../gateway/FreightHttpGateway";

export default class GatewayHttpFactory implements GatewaysFactory {

   constructor(readonly httpClient: HttpClient) {}

   createCatalogGateway(): CatalogGateway {
      return new CatalogHttpGateway(this.httpClient);
   }
   createFreightGateway(): FreightCalculator {
      return new FreightHttpGateway(this.httpClient);
   }
    
}