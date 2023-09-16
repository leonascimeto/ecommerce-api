import Checkout from "../../application/usecase/Checkout";
import GateWayFactory from "../../application/factory/GateWayFactory";
import RepositoryFactory from "../../application/factory/RepositoryFactory";

export default class UseCaseFactory {
   constructor(readonly repositoryFactory: RepositoryFactory, readonly gateWay: GateWayFactory) {}

   createCheckout(){
      return new Checkout(this.repositoryFactory, this.gateWay);
   }
}