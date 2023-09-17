import GetProduct from "../../application/usecase/GetProduct";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import GetProducts from "../../application/usecase/GetProducts";

export default class UseCaseFactory {
   
   constructor(readonly repositoryFactory: RepositoryFactory) {
   }
   
   createGetProducts() {
        return new GetProducts(this.repositoryFactory);
    }
    createGetProduct() {
        return new GetProduct(this.repositoryFactory);
    }
}