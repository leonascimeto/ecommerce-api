import ProductRepository from "./ProductRepository";
import { validate } from "./validateCpf";
import CouponRespository from "./CouponRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import FreightCalculator from "./FreightCalculator";

export default class Checkout {
   constructor(
      readonly productRepository: ProductRepository = new ProductRepositoryDatabase(),
      readonly couponRepository: CouponRespository = new CouponRepositoryDatabase(),
      readonly orderRepsoitory: OrderRepository = new OrderRepositoryDatabase(),
   ) {}

   async execute(input: Input){
      if(!validate(input.cpf)) throw new Error("Invalid cpf");
         const output: Output = {
            subtotal: 0,
            total: 0,
            freight: 0
         }

         for(const item of input.items) {
            const product = await this.productRepository.get(item.idProduct);
            if(product.width <= 0 || product.height <= 0 || product.length <= 0) throw new Error("Invalid dimensions");
            if(product.weight <= 0) throw new Error("Invalid weight");
            if(input.items.filter((i: any) => i.idProduct === item.idProduct).length > 1) throw new Error("Duplicated item");
            if(item.quantity <= 0) throw new Error("Invalid quantity");
            output.subtotal += product.price * item.quantity;
            if(input.from && input.to) {
               const freight = FreightCalculator.calculate(product);
               output.freight += freight * item.quantity;
            }

            item.price = product.price;
         }
         output.total = output.subtotal;
         const today = input.date ?? new Date();
         if(input.coupon) {
            const couponData = await this.couponRepository.get(input.coupon);
            if(couponData && couponData.expire_date > input.date) 
               output.total -= (output.total * couponData.percentage) / 100;
         }
         output.total += output.freight;
         const sequence = await this.orderRepsoitory.count() + 1;
         const code = `${today.getFullYear()}${new String(sequence).padStart(8, '0')}`
         const order = {
            idOrder: input.idOrder,
            code,
            cpf: input.cpf,
            total: output.total,
            freight: output.freight,
            items: input.items,
         }
         await this.orderRepsoitory.save(order);
         return output;
      }
}

export type Input = {
   idOrder?: string,
	cpf: string, 
	email?: string,
	items: { idProduct: number, quantity: number, price?: number }[], 
	coupon?: string, 
	from?: string, 
	to?: string,
   date?: Date
}

export type Output = {
	subtotal: number,
	freight: number,
	total: number
}