import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import RepositoryFactory from "./RepositoryFactory";

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