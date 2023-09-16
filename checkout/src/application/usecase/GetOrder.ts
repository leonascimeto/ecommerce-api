import OrderRepository from "../repository/OrderRepository";
import OrderRepositoryDatabase from "../../infra/database/OrderRepositoryDatabase";
import RepositoryFactory from "../factory/RepositoryFactory";

export default class GetOrder {
   orderRepository: OrderRepository;
   constructor(repositotyFactory: RepositoryFactory){
      this.orderRepository = repositotyFactory.createOrderRepository();
   }

   async execute(idOrder: string): Promise<Output> {
      const orderData = await this.orderRepository.get(idOrder);
      return orderData
   }
}

type Output = {
   total: number,
   code: string,
}