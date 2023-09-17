import ProductRepository from "../../application/repository/ProductRepository";
import ProductRepositoryDatabase from "../repository/ProductRepositoryDatabase";
import RepositoryFactory from "../../application/factory/RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
   createProductRepository(): ProductRepository {
      return new ProductRepositoryDatabase();
   }
}