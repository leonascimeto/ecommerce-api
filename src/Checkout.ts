import ProductRepository from "./ProductRepository";
import CouponRespository from "./CouponRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import FreightCalculator from "./FreightCalculator";
import Order from "./Order";
import RepositoryFactory from "./RepositoryFactory";

export default class Checkout {
   orderRepsoitory: OrderRepository;
   productRepository: ProductRepository;
   couponRepository: CouponRespository;
   
   constructor(
      RepositoryFactory: RepositoryFactory
   ) {
      this.orderRepsoitory = RepositoryFactory.createOrderRepository();
      this.productRepository = RepositoryFactory.createProductRepository();
      this.couponRepository = RepositoryFactory.createCouponRepository();
   }

   async execute(input: Input): Promise<Output>{
      const sequence = await this.orderRepsoitory.count() + 1;
      const order = new Order(input.idOrder, input.cpf, input.date, sequence);
      for(const item of input.items){
         const product = await this.productRepository.get(item.idProduct);
         order.addItem(product, item.quantity);
         if(input.from && input.to)
            order.freight += FreightCalculator.calculate(product) * item.quantity;
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