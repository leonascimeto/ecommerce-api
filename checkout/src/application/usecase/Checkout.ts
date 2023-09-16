import ProductRepository from "../repository/ProductRepository";
import CouponRespository from "../repository/CouponRepository";
import ProductRepositoryDatabase from "../../infra/database/ProductRepositoryDatabase";
import CouponRepositoryDatabase from "../../infra/repository/CouponRepositoryDatabase";
import OrderRepository from "../repository/OrderRepository";
import OrderRepositoryDatabase from "../../infra/database/OrderRepositoryDatabase";
import Order from "../../domain/entity/Order";
import RepositoryFactory from "../factory/RepositoryFactory";
import GateWayFactory from "../factory/GateWayFactory";
import CatalogGateway from "../gateway/CatalogGateway";
import FreightGateway from "../gateway/FreightGateway";

export default class Checkout {
   orderRepsoitory: OrderRepository;
   productRepository: ProductRepository;
   couponRepository: CouponRespository;
   catalogGateway: CatalogGateway;
   freightGateway: FreightGateway;
   
   constructor(
      RepositoryFactory: RepositoryFactory,
      gateWayFactory: GateWayFactory
   ) {
      this.orderRepsoitory = RepositoryFactory.createOrderRepository();
      this.productRepository = RepositoryFactory.createProductRepository();
      this.couponRepository = RepositoryFactory.createCouponRepository();
      this.catalogGateway = gateWayFactory.createCatalogGateway();
      this.freightGateway = gateWayFactory.createFreightGateway();
   }

   async execute(input: Input): Promise<Output>{
      const sequence = await this.orderRepsoitory.count() + 1;
      const order = new Order(input.idOrder, input.cpf, input.date, sequence);
      const inputFreight = {
         items: [],
         from: input.from,
         to: input.to,
      };
      for(const item of input.items){
         const product = await this.catalogGateway.getProduct(item.idProduct);
         order.addItem(product, item.quantity);
         inputFreight.items.push({
            volume: product.volume,
            density: product.density,
            quantity: item.quantity,
         });
      }
      if(input.from && input.to){
         const output = await this.freightGateway.simulateFreight(inputFreight);
         order.freight = output.freight;
      }
      if(input.coupon){
         const coupon = await this.couponRepository.get(input.coupon);
         if(coupon){
            order.addCoupon(coupon);
         }
      }
      await this.orderRepsoitory.save(order);
      return {
         total: order.getTotal(),
         freight: order.freight,
      };
   }
}

type Input = {
   idOrder?: string,
	cpf: string, 
	email?: string,
	items: { idProduct: number, quantity: number, price?: number }[], 
	coupon?: string, 
	from?: string, 
	to?: string,
   date?: Date
}

type Output = {
	freight: number,
	total: number
}