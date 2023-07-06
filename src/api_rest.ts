import express, { Request, Response } from 'express';
import { validate } from './validateCpf';
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const calcFrete = (width: number, height: number, length: number, weight: number, distance: number) => {
   const volume = (width / 100) * (height / 100)* (length / 100);
   const density = weight / volume;
   const freight = distance * volume * (density/100);
   return freight < 10 ? 10 : freight;
}

app.post('/checkout', async (req: Request, res: Response) => {
   try {
      const payload = req.body;
      console.log({payload});
      if(!validate(payload.cpf)) return res.json({ message: "Invalid cpf" });
         const output = {
            subtotal: 0,
            total: 0,
            freight: 0
         }
         if(!payload.items) throw new Error("No items");
         for(const item of payload.items) {
            const productData = await prisma.product.findUnique({
               where: {
                  id_product: item.idProduct
               }
            });
            if(productData.width <= 0 || productData.height <= 0 || productData.length <= 0) throw new Error("Invalid dimensions");
            if(productData.weight <= 0) throw new Error("Invalid weight");
            if(req.body.items.filter((i: any) => i.idProduct === item.idProduct).length > 1) throw new Error("Duplicated item");
            if(item.quantity <= 0) throw new Error("Invalid quantity");
            output.subtotal += productData.price * item.quantity;
            if(req.body.from && req.body.to) {
               const volume = (productData.width / 100) * (productData.height / 100) * (productData.length / 100);
               const density = productData.weight / volume;
               let freight = Math.max(volume * (density/100) * 1000, 10);
               output.freight += freight * item.quantity;
            }
         }
         output.total = output.subtotal;
         if(payload.coupon) {
            const couponData = await prisma.coupon.findUnique({
               where: {
                  code: payload.coupon
               }
            });  
            if(couponData && couponData.expire_date > new Date()) 
               output.total -= (output.total * couponData.percentage) / 100;
         }
         output.total += output.freight;
         res.json(output);
   } catch (error) {
      console.error(error);
      res.status(422).json({ message: error.message });
   }
});

app.get('/', async (req: Request, res: Response) => {
   res.json({ message: "App is Running" });
})

app.listen(3000, () => console.log('Server is running'));