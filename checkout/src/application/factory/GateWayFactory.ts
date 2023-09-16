import CatalogGateway from "../gateway/CatalogGateway";
import FreightGateway from "../gateway/FreightGateway";

export default interface GateWayFactory {
   createCatalogGateway(): CatalogGateway;
   createFreightGateway(): FreightGateway;
}