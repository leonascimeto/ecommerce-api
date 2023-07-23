import ProductRepository from "./ProductRepository";
import { validate } from "./validateCpf";
import CouponRespository from "./CouponRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";

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
            const productData = await this.productRepository.get(item.idProduct);
            if(productData.width <= 0 || productData.height <= 0 || productData.length <= 0) throw new Error("Invalid dimensions");
            if(productData.weight <= 0) throw new Error("Invalid weight");
            if(input.items.filter((i: any) => i.idProduct === item.idProduct).length > 1) throw new Error("Duplicated item");
            if(item.quantity <= 0) throw new Error("Invalid quantity");
            output.subtotal += productData.price * item.quantity;
            if(input.from && input.to) {
               const volume = (productData.width / 100) * (productData.height / 100) * (productData.length / 100);
               const density = productData.weight / volume;
               let freight = Math.max(volume * (density/100) * 1000, 10);
               output.freight += freight * item.quantity;
            }

            item.price = productData.price;
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