import CouponRespository from "../../application/repository/CouponRepository";
import CouponRepositoryDatabase from "../repository/CouponRepositoryDatabase";
import OrderRepository from "../../application/repository/OrderRepository";
import OrderRepositoryDatabase from "../database/OrderRepositoryDatabase";
import ProductRepository from "../../application/repository/ProductRepository";
import ProductRepositoryDatabase from "../database/ProductRepositoryDatabase";
import RepositoryFactory from "../../application/repository/RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
   createOrderRepository(): OrderRepository {
      return new OrderRepositoryDatabase();
   }
   createProductRepository(): ProductRepository {
      return new ProductRepositoryDatabase();
   }
   createCouponRepository(): CouponRespository {
      return new CouponRepositoryDatabase();
   }

}